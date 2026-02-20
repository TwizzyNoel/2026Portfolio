import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import Constants from "expo-constants";

export async function registerForPushNotificationsAsync() {
  let token;

  if (Constants.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      alert("Failed to get push token!");
      return;
    }

    if (
      !Constants.executionEnvironment ||
      Constants.executionEnvironment === "standalone"
    ) {
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log("Push token:", token);
    } else {
      console.log("Push tokens are not supported in Expo Go");
    }
  } else {
    alert("Must use physical device for Notifications");
  }

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}