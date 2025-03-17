import { SafeAreaProvider } from "react-native-safe-area-context"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { StatusBar } from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"

import Dashboard from "./screens/Dashboard"
import ServerSelection from "./screens/ServerSelection"
import Settings from "./screens/Settings"
import EncryptionDetails from "./screens/EncryptionDetails"
import OjasInfo from "./screens/OjasInfo"

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar barStyle="light-content" />
          <Stack.Navigator
            initialRouteName="Dashboard"
            screenOptions={{
              headerStyle: {
                backgroundColor: "#0f172a",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "600",
              },
              contentStyle: {
                backgroundColor: "#0f172a",
              },
            }}
          >
            <Stack.Screen name="Dashboard" component={Dashboard} options={{ title: "SecureVPN" }} />
            <Stack.Screen name="ServerSelection" component={ServerSelection} options={{ title: "Select Server" }} />
            <Stack.Screen name="Settings" component={Settings} options={{ title: "Settings" }} />
            <Stack.Screen
              name="EncryptionDetails"
              component={EncryptionDetails}
              options={{ title: "Encryption Layers" }}
            />
            <Stack.Screen name="OjasInfo" component={OjasInfo} options={{ title: "OJAS Encryption" }} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}

