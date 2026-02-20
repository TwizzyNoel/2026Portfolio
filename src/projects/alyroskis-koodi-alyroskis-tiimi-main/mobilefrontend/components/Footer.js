import { useRoute } from "@react-navigation/native";
import { View, Text, Pressable, StyleSheet } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from "@expo/vector-icons/Feather";
import { useTheme } from "@react-navigation/native";

const Footer = ({ navigation }) => {
  const route = useRoute(); // get the current screen
  const { colors } = useTheme();

  return (
    <View style={[styles.footer, { backgroundColor: colors.green }]}>
      <View>
        <Pressable
          onPress={() => navigation.navigate("Home")}
          style={styles.button}
        >
          <View
            style={
              route.name === "Home" && [
                styles.screenSelected,
                { backgroundColor: colors.primary },
              ]
            }
          >
            <MaterialCommunityIcons
              name="star-circle-outline"
              size={40}
              color={colors.primary}
              style={route.name === "Home" && { color: colors.green }}
            />
          </View>
          <Text style={{ color: colors.primary }}>Koti</Text>
        </Pressable>
      </View>

      <View>
        <Pressable
          onPress={() => navigation.navigate("Map")}
          style={styles.button}
        >
          <View
            style={
              route.name === "Map" && [
                styles.screenSelected,
                { backgroundColor: colors.primary },
              ]
            }
          >
            <Feather
              name="map"
              size={40}
              color={colors.primary}
              style={route.name === "Map" && { color: colors.green }}
            />
          </View>
          <Text style={{ color: colors.primary }}>Kartta</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    // position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    zIndex: 10,
    paddingVertical: 15,
    height: 100,
  },
  button: {
    alignItems: "center",
    width: 80,
  },
  screenSelected: {
    borderRadius: 50,
    alignItems: "center",
    width: 80,
  },
});

export default Footer;
