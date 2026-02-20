import { View, Text, StyleSheet, Animated, Pressable } from "react-native";
import { useNotification } from "../context/NotificationContext";
import { useTheme } from "../utils/ThemeContext";
import { navigate } from "../RootNavigation";

export default function NotificationOverlay() {
  const { colors } = useTheme();

  const { popupNotifications, clearPopupNotifications } = useNotification();

  const visible = popupNotifications.length > 0;

  if (!visible) return null;

  const handlePress = () => {
    clearPopupNotifications(); // to close the push-notification when user presses on it
    navigate("NotificationsList"); // to show the list of notifications when user presse on the push-notification
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={handlePress}>
        <Animated.View
          style={[styles.notification, { backgroundColor: colors.green }]}
        >
          <Text style={[styles.info, { color: colors.white }]}>
            Uusi ilmoitus
          </Text>
        </Animated.View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 60,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 9999,
  },
  notification: {
    padding: 12,
    marginVertical: 5,
    borderRadius: 8,
    elevation: 5,
    paddingHorizontal: 20,
    width: "300",
    alignItems: "center",
  },
  info: {
    fontWeight: "500",
    fontSize: 18,
  },
});
