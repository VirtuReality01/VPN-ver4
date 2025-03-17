"use client"

import React from "react"
import { View, Text, StyleSheet } from "react-native"
import Animated, {
  useAnimatedStyle,
  withSequence,
  withTiming,
  useSharedValue,
  withRepeat,
} from "react-native-reanimated"

interface OjasStatusIndicatorProps {
  active: boolean
  layers: number
  attackDetected: boolean
}

export default function OjasStatusIndicator({ active, layers, attackDetected }: OjasStatusIndicatorProps) {
  const pulseValue = useSharedValue(1)

  React.useEffect(() => {
    if (attackDetected) {
      pulseValue.value = withRepeat(
        withSequence(withTiming(1.1, { duration: 300 }), withTiming(1, { duration: 300 })),
        -1,
        true,
      )
    } else {
      pulseValue.value = withTiming(1)
    }
  }, [attackDetected])

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: pulseValue.value }],
    }
  })

  return (
    <View style={styles.container}>
      <View style={styles.statusRow}>
        <Text style={styles.statusText}>Status:</Text>
        <View style={[styles.statusIndicator, active ? styles.activeIndicator : styles.inactiveIndicator]}>
          <Text style={styles.statusIndicatorText}>{active ? "ACTIVE" : "INACTIVE"}</Text>
        </View>
      </View>

      {active && (
        <>
          <View style={styles.layersRow}>
            <Text style={styles.statusText}>Active Layers:</Text>
            <Text style={styles.layersCount}>{layers}</Text>
          </View>

          <Animated.View style={[styles.layersVisual, animatedStyle]}>
            {Array.from({ length: 7 }).map((_, index) => (
              <View
                key={index}
                style={[
                  styles.layerIndicator,
                  index < layers ? styles.activeLayer : styles.inactiveLayer,
                  attackDetected && index === layers - 1 && styles.pulsingLayer,
                ]}
              />
            ))}
          </Animated.View>

          {attackDetected && (
            <View style={styles.alertContainer}>
              <Text style={styles.alertText}>Attack detected! Adding layers...</Text>
            </View>
          )}
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  statusText: {
    fontSize: 14,
    color: "#94a3b8",
  },
  statusIndicator: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  activeIndicator: {
    backgroundColor: "rgba(16, 185, 129, 0.2)",
  },
  inactiveIndicator: {
    backgroundColor: "rgba(100, 116, 139, 0.2)",
  },
  statusIndicatorText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#10b981",
  },
  layersRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  layersCount: {
    fontSize: 14,
    fontWeight: "600",
    color: "#f8fafc",
  },
  layersVisual: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  layerIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  activeLayer: {
    backgroundColor: "#10b981",
  },
  inactiveLayer: {
    backgroundColor: "#334155",
  },
  pulsingLayer: {
    backgroundColor: "#f59e0b",
  },
  alertContainer: {
    backgroundColor: "rgba(245, 158, 11, 0.1)",
    borderRadius: 4,
    padding: 8,
    marginTop: 8,
  },
  alertText: {
    color: "#f59e0b",
    fontSize: 12,
    fontWeight: "500",
    textAlign: "center",
  },
})

