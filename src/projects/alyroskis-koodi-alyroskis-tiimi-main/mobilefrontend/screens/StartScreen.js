import { useContext } from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MoonIcon from "../components/MoonIcon";
import { AuthContext } from "../context/AuthContext";

export default function StartScreen({ navigation }) {
  const { user } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <View style={styles.iconWrap}>
        <MoonIcon />
      </View>
      <Image
        source={require("../assets/images/main-title.png")}
        style={styles.mainTitle}
        resizeMode="contain"
      />
      <View style={styles.wrap}>
        <Text style={styles.title}>Terve!</Text>
        <Text style={styles.text}>
          Tämä on Tredun Ohjelmistokehitäjien tekemä smart-roskis sovellus!
        </Text>
      </View>

      {!user && (
        <Pressable onPress={() => navigation.navigate("Login")}>
          <FontAwesome5 name="arrow-circle-right" style={styles.arrow} />
        </Pressable>
      )}

      {user && (
        <Pressable onPress={() => navigation.navigate("Home")}>
          <FontAwesome5 name="arrow-circle-right" style={styles.arrow} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  iconWrap: {
    width: "100%",
    padding: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  wrap: {
    minWidth: 280,
    maxWidth: 560,
    color: "#fff",
    backgroundColor: "#12EB90",
    borderRadius: 28,
    display: "flex",
    alignItems: "center",
    marginVertical: 20,
    paddingVertical: 20,
  },
  mainTitle: {
    width: "100%",
    height: 200,
    alignSelf: "center",
  },
  title: {
    fontSize: 40,
    color: "#fff",
    fontFamily: "Urbanist",
    fontSize: 40,
    fontWeight: "700",
  },
  text: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "Urbanist",
    fontSize: 25,
    lineHeight: 30,
    fontWeight: "400",
  },
  arrow: {
    color: "#34C759",
    fontSize: 48,
  },
});
