import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "./utils/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { NotificationProvider } from "./context/NotificationContext";
import AppNavigator from "./AppNavigator";
import NotificationHandler from "./utils/NotificationHandler";
import NotificationOverlay from "./components/NotificationOverlay";

export default function App() {
  return (
    <NotificationProvider>
      <ThemeProvider>
        <AuthProvider>
          <SafeAreaProvider style={{ flex: 1 }}>
            <NotificationHandler />
            <NotificationOverlay />
            <AppNavigator />
          </SafeAreaProvider>
        </AuthProvider>
      </ThemeProvider>
    </NotificationProvider>
  );
}
