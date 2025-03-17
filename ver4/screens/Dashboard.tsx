"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withRepeat } from "react-native-reanimated"
import { Shield, Settings, Server, Lock, Info } from "lucide-react-native"

import ConnectionButton from "../components/ConnectionButton"
import StatusCard from "../components/StatusCard"
import OjasStatusIndicator from "../components/OjasStatusIndicator"
import { simulateVpnConnection, getPublicIp } from "../utils/vpnService"

export default function Dashboard() {
  const navigation = useNavigation()
  const [connected, setConnected] = useState(false)
  const [connecting, setConnecting] = useState(false)
  const [publicIp, setPublicIp] = useState("")
  const [vpnIp, setVpnIp] = useState("")
  const [selectedServer, setSelectedServer] = useState({
    id: "us1",
    name: "United States",
    location: "New York",
    flag: "🇺🇸",
  })
  const [ojasLayers, setOjasLayers] = useState(1)
  const [attackDetected, setAttackDetected] = useState(false)

  // Animation for the shield pulse
  const pulseAnim = useSharedValue(1)

  useEffect(() => {
    fetchPublicIp()
  }, [])

  useEffect(() => {
    if (attackDetected) {
      pulseAnim.value = withRepeat(withTiming(1.2, { duration: 1000 }), -1, true)

      // Simulate OJAS responding to attack by adding layers
      const interval = setInterval(() => {
        if (ojasLayers < 7) {
          setOjasLayers((prev) => prev + 1)
        } else {
          clearInterval(interval)
          setTimeout(() => {
            setAttackDetected(false)
            pulseAnim.value = 1
          }, 2000)
        }
      }, 800)

      return () => clearInterval(interval)
    }
  }, [attackDetected, ojasLayers])

  const animatedShieldStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: pulseAnim.value }],
    }
  })

  const fetchPublicIp = async () => {
    try {
      const ip = await getPublicIp()
      setPublicIp(ip)
    } catch (error) {
      console.error("Failed to fetch IP:", error)
      setPublicIp("Unable to fetch")
    }
  }

  const toggleConnection = async () => {
    if (connected) {
      // Disconnect logic
      setConnected(false)
      setVpnIp("")
      setOjasLayers(1)
    } else {
      // Connect logic
      setConnecting(true)

      try {
        const result = await simulateVpnConnection(selectedServer.id)
        setConnecting(false)
        setConnected(true)
        setVpnIp(result.vpnIp)

        // Simulate random attack detection after connection
        if (connected) {
          setTimeout(
            () => {
              simulateAttackDetection()
            },
            10000 + Math.random() * 20000,
          )
        }
      } catch (error) {
        setConnecting(false)
        Alert.alert("Connection Error", "Failed to establish VPN connection")
      }
    }
  }

  const simulateAttackDetection = () => {
    if (Math.random() > 0.7 && connected) {
      setAttackDetected(true)
      Alert.alert(
        "Attack Detected",
        "OJAS has detected a potential attack and is adding additional encryption layers for protection.",
        [{ text: "OK" }],
      )
    }
  }

  const navigateToServerSelection = () => {
    navigation.navigate("ServerSelection", {
      currentServer: selectedServer.id,
      onSelect: (server) => setSelectedServer(server),
    })
  }

  return (
    <SafeAreaView edges={["bottom"]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Animated.View style={[styles.shieldContainer, animatedShieldStyle]}>
            <Shield width={40} height={40} color={connected ? "#10b981" : "#64748b"} strokeWidth={1.5} />
          </Animated.View>

          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>
              {connecting ? "Connecting..." : connected ? "Protected" : "Not Protected"}
            </Text>
            <Text style={styles.headerSubtitle}>
              {connected ? `Connected to ${selectedServer.name}` : "Your connection is not secure"}
            </Text>
          </View>
        </View>

        <ConnectionButton connected={connected} connecting={connecting} onPress={toggleConnection} />

        <View style={styles.cardsContainer}>
          <StatusCard
            title="Connection Details"
            icon={<Server width={18} height={18} color="#3b82f6" />}
            onPress={navigateToServerSelection}
            disabled={connected}
          >
            <View style={styles.serverInfo}>
              <Text style={styles.serverName}>
                {selectedServer.flag} {selectedServer.name}
              </Text>
              <Text style={styles.serverLocation}>{selectedServer.location}</Text>
            </View>

            <View style={styles.ipContainer}>
              <View style={styles.ipRow}>
                <Text style={styles.ipLabel}>Public IP:</Text>
                <Text style={styles.ipValue}>{publicIp || "Loading..."}</Text>
              </View>

              <View style={styles.ipRow}>
                <Text style={styles.ipLabel}>VPN IP:</Text>
                <Text style={styles.ipValue}>{connected ? vpnIp : "Not connected"}</Text>
              </View>
            </View>
          </StatusCard>

          <StatusCard
            title="OJAS Encryption"
            icon={<Lock width={18} height={18} color="#10b981" />}
            onPress={() => navigation.navigate("EncryptionDetails")}
            rightIcon={<Info width={16} height={16} color="#64748b" />}
            onRightIconPress={() => navigation.navigate("OjasInfo")}
          >
            <OjasStatusIndicator active={connected} layers={ojasLayers} attackDetected={attackDetected} />
          </StatusCard>
        </View>

        <TouchableOpacity style={styles.settingsButton} onPress={() => navigation.navigate("Settings")}>
          <Settings width={20} height={20} color="#f8fafc" />
          <Text style={styles.settingsText}>Settings</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  shieldContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(15, 23, 42, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#f8fafc",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#94a3b8",
  },
  cardsContainer: {
    marginTop: 24,
    gap: 16,
  },
  serverInfo: {
    marginBottom: 16,
  },
  serverName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#f8fafc",
    marginBottom: 2,
  },
  serverLocation: {
    fontSize: 14,
    color: "#94a3b8",
  },
  ipContainer: {
    gap: 8,
  },
  ipRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ipLabel: {
    fontSize: 14,
    color: "#94a3b8",
  },
  ipValue: {
    fontSize: 14,
    color: "#f8fafc",
    fontFamily: "Courier",
    backgroundColor: "#1e293b",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  settingsButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 32,
    padding: 12,
    backgroundColor: "#1e293b",
    borderRadius: 8,
  },
  settingsText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "500",
    color: "#f8fafc",
  },
})

