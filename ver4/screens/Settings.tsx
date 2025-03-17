"use client"

import { useState } from "react"
import { View, Text, StyleSheet, Switch, TouchableOpacity, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { ScrollView } from "react-native-gesture-handler"
import { Settings as SettingsIcon, Shield, Wifi, Lock, Power, Download, Trash2 } from "lucide-react-native"

export default function Settings() {
  const [autoConnect, setAutoConnect] = useState(false)
  const [killSwitch, setKillSwitch] = useState(true)
  const [dnsProtection, setDnsProtection] = useState(true)
  const [dataCompression, setDataCompression] = useState(false)
  const [blockTrackers, setBlockTrackers] = useState(true)

  const handleReset = () => {
    Alert.alert("Reset Settings", "Are you sure you want to reset all settings to default?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Reset",
        style: "destructive",
        onPress: () => {
          setAutoConnect(false)
          setKillSwitch(true)
          setDnsProtection(true)
          setDataCompression(false)
          setBlockTrackers(true)
          Alert.alert("Settings Reset", "All settings have been reset to default values.")
        },
      },
    ])
  }

  return (
    <SafeAreaView edges={["bottom"]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <SettingsIcon width={24} height={24} color="#3b82f6" />
          <Text style={styles.headerTitle}>App Settings</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Connection</Text>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <View style={styles.settingIconContainer}>
                <Wifi width={18} height={18} color="#3b82f6" />
              </View>
              <View>
                <Text style={styles.settingTitle}>Auto-Connect</Text>
                <Text style={styles.settingDescription}>
                  Automatically connect to VPN when using untrusted WiFi networks
                </Text>
              </View>
            </View>
            <Switch
              value={autoConnect}
              onValueChange={setAutoConnect}
              trackColor={{ false: "#334155", true: "#10b981" }}
              thumbColor="#f8fafc"
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <View style={styles.settingIconContainer}>
                <Power width={18} height={18} color="#ef4444" />
              </View>
              <View>
                <Text style={styles.settingTitle}>Kill Switch</Text>
                <Text style={styles.settingDescription}>Block all internet traffic if VPN connection drops</Text>
              </View>
            </View>
            <Switch
              value={killSwitch}
              onValueChange={setKillSwitch}
              trackColor={{ false: "#334155", true: "#10b981" }}
              thumbColor="#f8fafc"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy & Security</Text>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <View style={styles.settingIconContainer}>
                <Lock width={18} height={18} color="#f59e0b" />
              </View>
              <View>
                <Text style={styles.settingTitle}>DNS Protection</Text>
                <Text style={styles.settingDescription}>Encrypt DNS requests to prevent leaks</Text>
              </View>
            </View>
            <Switch
              value={dnsProtection}
              onValueChange={setDnsProtection}
              trackColor={{ false: "#334155", true: "#10b981" }}
              thumbColor="#f8fafc"
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <View style={styles.settingIconContainer}>
                <Shield width={18} height={18} color="#10b981" />
              </View>
              <View>
                <Text style={styles.settingTitle}>Block Trackers</Text>
                <Text style={styles.settingDescription}>Block known tracking and advertising domains</Text>
              </View>
            </View>
            <Switch
              value={blockTrackers}
              onValueChange={setBlockTrackers}
              trackColor={{ false: "#334155", true: "#10b981" }}
              thumbColor="#f8fafc"
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <View style={styles.settingIconContainer}>
                <Download width={18} height={18} color="#3b82f6" />
              </View>
              <View>
                <Text style={styles.settingTitle}>Data Compression</Text>
                <Text style={styles.settingDescription}>Compress data to reduce bandwidth usage</Text>
              </View>
            </View>
            <Switch
              value={dataCompression}
              onValueChange={setDataCompression}
              trackColor={{ false: "#334155", true: "#10b981" }}
              thumbColor="#f8fafc"
            />
          </View>
        </View>

        <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
          <Trash2 width={18} height={18} color="#f8fafc" />
          <Text style={styles.resetButtonText}>Reset All Settings</Text>
        </TouchableOpacity>

        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>SecureVPN v1.0.0</Text>
          <Text style={styles.copyrightText}>© 2023 SecureVPN Inc.</Text>
        </View>
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
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#f8fafc",
    marginLeft: 8,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#e2e8f0",
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#1e293b",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  settingInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 16,
  },
  settingIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(15, 23, 42, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#f8fafc",
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 12,
    color: "#94a3b8",
    lineHeight: 16,
  },
  resetButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ef4444",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#f8fafc",
    marginLeft: 8,
  },
  versionContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  versionText: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 4,
  },
  copyrightText: {
    fontSize: 12,
    color: "#475569",
  },
})

