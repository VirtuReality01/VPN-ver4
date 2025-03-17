import type { ReactNode } from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"

interface StatusCardProps {
  title: string
  icon: ReactNode
  children: ReactNode
  onPress?: () => void
  rightIcon?: ReactNode
  onRightIconPress?: () => void
  disabled?: boolean
}

export default function StatusCard({
  title,
  icon,
  children,
  onPress,
  rightIcon,
  onRightIconPress,
  disabled = false,
}: StatusCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          {icon}
          <Text style={styles.title}>{title}</Text>
        </View>

        {rightIcon && (
          <TouchableOpacity onPress={onRightIconPress} disabled={disabled} style={styles.rightIconButton}>
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.content}>{children}</View>

      {onPress && (
        <TouchableOpacity
          style={[styles.cardButton, disabled && styles.disabledButton]}
          onPress={onPress}
          disabled={disabled}
        >
          <Text style={[styles.cardButtonText, disabled && styles.disabledButtonText]}>
            {title === "Connection Details" ? "Change Server" : "View Details"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1e293b",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#f8fafc",
    marginLeft: 8,
  },
  rightIconButton: {
    padding: 4,
  },
  content: {
    marginBottom: 16,
  },
  cardButton: {
    backgroundColor: "#334155",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: "center",
  },
  cardButtonText: {
    color: "#f8fafc",
    fontSize: 14,
    fontWeight: "500",
  },
  disabledButton: {
    backgroundColor: "#475569",
    opacity: 0.6,
  },
  disabledButtonText: {
    color: "#94a3b8",
  },
})

