import { View, Text, StyleSheet, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Shield, Lock, RefreshCw } from "lucide-react-native"

export default function EncryptionDetails() {
  const encryptionLayers = [
    {
      id: "wireguard",
      name: "WireGuard",
      description: "Modern VPN protocol with state-of-the-art cryptography",
      details:
        "Uses ChaCha20 for symmetric encryption, Poly1305 for authentication, Curve25519 for ECDH, and BLAKE2s for hashing.",
    },
    {
      id: "chacha20",
      name: "ChaCha20",
      description: "Stream cipher for symmetric encryption",
      details:
        "Designed to provide high security while maintaining high performance on mobile devices without hardware acceleration.",
    },
    {
      id: "poly1305",
      name: "Poly1305",
      description: "Message authentication code",
      details: "Ensures data integrity and authenticity, preventing tampering with encrypted data.",
    },
    {
      id: "ojas",
      name: "OJAS",
      description: "Adaptive multi-layer encryption system",
      details:
        "Proprietary technology that detects intrusion attempts and dynamically adds encryption layers in response to threats.",
    },
  ]

  return (
    <SafeAreaView edges={["bottom"]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Shield width={24} height={24} color="#10b981" />
          <Text style={styles.headerTitle}>Multi-Layer Encryption</Text>
        </View>

        <Text style={styles.description}>
          SecureVPN uses multiple layers of encryption to protect your data. The base layers provide industry-standard
          protection, while the OJAS system adds adaptive security that responds to threats in real-time.
        </Text>

        <View style={styles.layersContainer}>
          {encryptionLayers.map((layer) => (
            <View key={layer.id} style={styles.layerCard}>
              <View style={styles.layerHeader}>
                <Lock width={18} height={18} color={layer.id === "ojas" ? "#f59e0b" : "#10b981"} />
                <Text style={[styles.layerName, layer.id === "ojas" && styles.ojasLayerName]}>{layer.name}</Text>
              </View>

              <Text style={styles.layerDescription}>{layer.description}</Text>

              <Text style={styles.layerDetails}>{layer.details}</Text>
            </View>
          ))}
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <RefreshCw width={18} height={18} color="#3b82f6" />
            <Text style={styles.infoTitle}>How It Works Together</Text>
          </View>

          <Text style={styles.infoText}>
            When you connect to SecureVPN, your data is first encrypted using the WireGuard protocol, which includes
            ChaCha20 encryption and Poly1305 authentication. Then, the OJAS system monitors your connection for
            potential threats.
          </Text>

          <Text style={styles.infoText}>
            If an attack is detected, OJAS automatically adds up to 7 additional layers of encryption, each stronger
            than the last, creating a virtually impenetrable shield for your data.
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
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#f8fafc",
    marginLeft: 8,
  },
  description: {
    fontSize: 14,
    color: "#94a3b8",
    marginBottom: 24,
    lineHeight: 20,
  },
  layersContainer: {
    gap: 16,
    marginBottom: 24,
  },
  layerCard: {
    backgroundColor: "#1e293b",
    borderRadius: 12,
    padding: 16,
  },
  layerHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  layerName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#f8fafc",
    marginLeft: 8,
  },
  ojasLayerName: {
    color: "#f59e0b",
  },
  layerDescription: {
    fontSize: 14,
    color: "#e2e8f0",
    marginBottom: 8,
  },
  layerDetails: {
    fontSize: 13,
    color: "#94a3b8",
    lineHeight: 18,
  },
  infoCard: {
    backgroundColor: "#1e293b",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  infoHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#f8fafc",
    marginLeft: 8,
  },
  infoText: {
    fontSize: 14,
    color: "#94a3b8",
    marginBottom: 12,
    lineHeight: 20,
  },
})

