"use client"

import { useRef, useEffect } from "react"
import { View, Text, StyleSheet, ScrollView, Animated } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Shield, Lock, AlertTriangle, CheckCircle } from "lucide-react-native"

export default function OjasInfo() {
  // Animation for the layers visualization
  const animationValue = useRef(new Animated.Value(0)).current

  useEffect(() => {
    // Start the animation sequence when the component mounts
    Animated.loop(
      Animated.sequence([
        Animated.timing(animationValue, {
          toValue: 7,
          duration: 5000,
          useNativeDriver: false,
        }),
        Animated.timing(animationValue, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: false,
        }),
      ]),
    ).start()
  }, [])

  // Interpolate animation value to determine active layers
  const activeLayers = animationValue.interpolate({
    inputRange: [0, 7],
    outputRange: [1, 7],
    extrapolate: "clamp",
  })

  return (
    <SafeAreaView edges={["bottom"]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Shield width={32} height={32} color="#f59e0b" />
          <Text style={styles.headerTitle}>OJAS Encryption</Text>
        </View>

        <Text style={styles.subtitle}>Adaptive Multi-Layer Protection</Text>

        <Text style={styles.description}>
          OJAS (Omnidirectional Juxtaposed Adaptive Security) is our proprietary encryption technology that provides
          unparalleled protection for your data on public WiFi networks.
        </Text>

        <View style={styles.visualizationContainer}>
          <Text style={styles.visualizationTitle}>Dynamic Layer Protection</Text>

          <View style={styles.layersVisualization}>
            {Array.from({ length: 7 }).map((_, index) => {
              // Calculate opacity based on animation value
              const layerOpacity = animationValue.interpolate({
                inputRange: [index, index + 1],
                outputRange: [1, 0.3],
                extrapolate: "clamp",
              })

              return (
                <Animated.View
                  key={index}
                  style={[
                    styles.layerCircle,
                    {
                      opacity: layerOpacity,
                      transform: [{ scale: 1 + index * 0.15 }],
                      zIndex: 7 - index,
                    },
                  ]}
                />
              )
            })}
            <View style={styles.deviceIcon}>
              <Lock width={24} height={24} color="#fff" />
            </View>
          </View>

          <View style={styles.layerCountContainer}>
            <Text style={styles.layerCountLabel}>Active Layers:</Text>
            <Animated.Text style={styles.layerCount}>
              {activeLayers.interpolate({
                inputRange: [1, 2, 3, 4, 5, 6, 7],
                outputRange: ["1", "2", "3", "4", "5", "6", "7"],
              })}
            </Animated.Text>
          </View>
        </View>

        <View style={styles.featuresContainer}>
          <Text style={styles.sectionTitle}>Key Features</Text>

          <View style={styles.featureCard}>
            <View style={styles.featureHeader}>
              <AlertTriangle width={20} height={20} color="#f59e0b" />
              <Text style={styles.featureTitle}>Threat Detection</Text>
            </View>
            <Text style={styles.featureDescription}>
              OJAS continuously monitors your connection for suspicious activities and potential attacks. When a threat
              is detected, it immediately responds by adding additional encryption layers.
            </Text>
          </View>

          <View style={styles.featureCard}>
            <View style={styles.featureHeader}>
              <Shield width={20} height={20} color="#f59e0b" />
              <Text style={styles.featureTitle}>Adaptive Response</Text>
            </View>
            <Text style={styles.featureDescription}>
              Like a magnet attracting protection, OJAS responds to attacks by adding up to 7 additional encryption
              layers, each more sophisticated than the last, creating a virtually impenetrable shield.
            </Text>
          </View>

          <View style={styles.featureCard}>
            <View style={styles.featureHeader}>
              <CheckCircle width={20} height={20} color="#f59e0b" />
              <Text style={styles.featureTitle}>Self-Reinforcing</Text>
            </View>
            <Text style={styles.featureDescription}>
              The more an attacker tries to breach your connection, the stronger OJAS becomes. Each attack attempt is
              analyzed and used to strengthen future protection, making your VPN smarter over time.
            </Text>
          </View>
        </View>

        <View style={styles.technicalContainer}>
          <Text style={styles.sectionTitle}>Technical Details</Text>

          <Text style={styles.technicalText}>
            OJAS uses a combination of symmetric and asymmetric encryption algorithms, arranged in a proprietary layered
            structure. Each layer employs different cryptographic primitives, ensuring that even if one layer is
            compromised, the others remain secure.
          </Text>

          <Text style={styles.technicalText}>
            The system employs advanced heuristics to detect potential attacks, including pattern recognition, anomaly
            detection, and behavioral analysis. When an attack is detected, OJAS dynamically generates new encryption
            keys and adds additional encryption layers.
          </Text>

          <Text style={styles.technicalText}>
            All of this happens automatically and transparently, ensuring your data remains protected without any action
            required on your part.
          </Text>
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
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#f59e0b",
    marginLeft: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "#e2e8f0",
    marginBottom: 16,
  },
  description: {
    fontSize: 14,
    color: "#94a3b8",
    marginBottom: 24,
    lineHeight: 20,
  },
  visualizationContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  visualizationTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#f8fafc",
    marginBottom: 16,
    textAlign: "center",
  },
  layersVisualization: {
    width: 200,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  layerCircle: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#f59e0b",
  },
  deviceIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#0f172a",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  layerCountContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  layerCountLabel: {
    fontSize: 14,
    color: "#e2e8f0",
    marginRight: 8,
  },
  layerCount: {
    fontSize: 18,
    fontWeight: "700",
    color: "#f59e0b",
  },
  featuresContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#f8fafc",
    marginBottom: 16,
  },
  featureCard: {
    backgroundColor: "#1e293b",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  featureHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#f8fafc",
    marginLeft: 8,
  },
  featureDescription: {
    fontSize: 14,
    color: "#94a3b8",
    lineHeight: 20,
  },
  technicalContainer: {
    backgroundColor: "#1e293b",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  technicalText: {
    fontSize: 14,
    color: "#94a3b8",
    marginBottom: 12,
    lineHeight: 20,
  },
})

