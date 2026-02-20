import { useContext } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import MoonIcon from "../components/MoonIcon";
import Octicons from "@expo/vector-icons/Octicons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { useTheme } from "@react-navigation/native";
import { NotificationContext } from "../context/NotificationContext";

const Navbar = ({ navigation }) => {
  const { colors } = useTheme();
  const { notifications } = useContext(NotificationContext);
  const unseenCount = notifications.length;

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.navigate("User")}>
        <Ionicons
          name="person-circle-outline"
          style={[styles.icon, { color: colors.iconColor }]}
        />
      </Pressable>
      <View style={styles.iconWrap}>
        <MoonIcon />
        <Pressable
          onPress={() => {
            navigation.navigate("NotificationsList");
          }}
        >
          <Octicons
            name="bell"
            style={[styles.icon, { color: colors.iconColor }]}
          />
          {unseenCount > 0 && (
            <View
              style={[styles.counterWrapper, { backgroundColor: colors.red }]}
            >
              <Text style={styles.counter}>{unseenCount}</Text>
            </View>
          )}
        </Pressable>
        <Pressable onPress={() => navigation.navigate("Settings")}>
          <SimpleLineIcons
            name="settings"
            style={[styles.icon, { color: colors.iconColor }]}
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    padding: 10,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: "red",
  },
  iconWrap: {
    flexDirection: "row",
    columnGap: 10,
  },
  icon: {
    fontSize: 26,
  },
  counterWrapper: {
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    height: 18,
    width: 18,
    position: "absolute",
    top: -5,
    left: 10,
  },
  counter: {
    fontSize: 12,
    color: "#fff",
  },
});

export default Navbar;
