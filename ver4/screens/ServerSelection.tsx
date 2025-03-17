"use client"

import { useState } from "react"
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation, useRoute } from "@react-navigation/native"
import { Check, ChevronRight } from "lucide-react-native"

const servers = [
  { id: "us1", name: "United States", location: "New York", flag: "🇺🇸" },
  { id: "nl1", name: "Netherlands", location: "Amsterdam", flag: "🇳🇱" },
  { id: "jp1", name: "Japan", location: "Tokyo", flag: "🇯🇵" },
  { id: "sg1", name: "Singapore", location: "Singapore", flag: "🇸🇬" },
  { id: "uk1", name: "United Kingdom", location: "London", flag: "🇬🇧" },
  { id: "de1", name: "Germany", location: "Frankfurt", flag: "🇩🇪" },
  { id: "ca1", name: "Canada", location: "Toronto", flag: "🇨🇦" },
  { id: "au1", name: "Australia", location: "Sydney", flag: "🇦🇺" },
]

export default function ServerSelection() {
  const navigation = useNavigation()
  const route = useRoute()
  const { currentServer, onSelect } = route.params || {}
  const [selectedServer, setSelectedServer] = useState(currentServer || "us1")

  const handleServerSelect = (serverId) => {
    setSelectedServer(serverId)
    const server = servers.find((s) => s.id === serverId)
    if (server && onSelect) {
      onSelect(server)
      navigation.goBack()
    }
  }

  const renderServerItem = ({ item }) => {
    const isSelected = selectedServer === item.id

    return (
      <TouchableOpacity
        style={[styles.serverItem, isSelected && styles.selectedServerItem]}
        onPress={() => handleServerSelect(item.id)}
      >
        <View style={styles.serverInfo}>
          <Text style={styles.serverFlag}>{item.flag}</Text>
          <View>
            <Text style={styles.serverName}>{item.name}</Text>
            <Text style={styles.serverLocation}>{item.location}</Text>
          </View>
        </View>

        {isSelected ? (
          <Check width={20} height={20} color="#10b981" />
        ) : (
          <ChevronRight width={20} height={20} color="#64748b" />
        )}
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView edges={["bottom"]} style={styles.container}>
      <Text style={styles.headerText}>Select a server location to connect to</Text>

      <FlatList
        data={servers}
        renderItem={renderServerItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
  },
  headerText: {
    fontSize: 14,
    color: "#94a3b8",
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  listContent: {
    padding: 16,
  },
  serverItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#1e293b",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  selectedServerItem: {
    borderColor: "#10b981",
    borderWidth: 1,
  },
  serverInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  serverFlag: {
    fontSize: 24,
    marginRight: 12,
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
})

