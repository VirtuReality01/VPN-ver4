import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from "react-native"

interface ConnectionButtonProps {
  connected: boolean
  connecting: boolean
  onPress: () => void
}

export default function ConnectionButton({ connected, connecting, onPress }: ConnectionButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        connected ? styles.disconnectButton : styles.connectButton,
        connecting && styles.connectingButton,
      ]}
      onPress={onPress}
      disabled={connecting}
    >
      {connecting ? (
        <ActivityIndicator color="#fff" size="small" />
      ) : (
        <Text style={styles.buttonText}>{connected ? "Disconnect" : "Connect"}</Text>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  connectButton: {
    backgroundColor: "#10b981",
  },
  disconnectButton: {
    backgroundColor: "#ef4444",
  },
  connectingButton: {
    backgroundColor: "#6b7280",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
})

