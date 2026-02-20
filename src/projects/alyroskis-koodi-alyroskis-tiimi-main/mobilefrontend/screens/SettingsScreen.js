import { View, Text, Pressable, Animated, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MessageBox from "../components/messageBox";
import { useTheme } from "@react-navigation/native";
import { useState, useRef, useEffect } from "react";
import { usePushNotifications } from "../utils/usePushNotifications";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const SettingsScreen = () => {
  const navigation = useNavigation();
  const { token } = useContext(AuthContext);
  const { pushEnabled, registerPushToken, unregisterPushToken } =
    usePushNotifications(token);
  const [toggleOn, setToggleOn] = useState(pushEnabled);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(null);
  const offset = useRef(new Animated.Value(pushEnabled ? 30 : 0)).current;
  const { colors } = useTheme();

  useEffect(() => {
    setToggleOn(pushEnabled);
    Animated.timing(offset, {
      toValue: pushEnabled ? 30 : 0,
      duration: 0,
      useNativeDriver: false,
    }).start();
  }, [pushEnabled]);

  const toggle = async () => {
    const newToggleState = !toggleOn;
    setToggleOn(newToggleState);

    setMessage(
      newToggleState
        ? "Push-ilmoitukset ovat päällä"
        : "Push-ilmoitukset pois päältä"
    );
    setMessageType("info");

    Animated.timing(offset, {
      toValue: newToggleState ? 30 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();

    if (newToggleState) {
      await registerPushToken();
    } else {
      unregisterPushToken();
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Navbar stays on top */}
      <Navbar navigation={navigation} />

      {/* Middle content */}
      <View style={{ flex: 1, padding: 16, justifyContent: "space-between" }}>
        <View>
          <Text style={[styles.title, { color: colors.text }]}>Asetukset</Text>
          <MessageBox message={message} type={messageType} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{ color: colors.green, fontWeight: 600, fontSize: 18 }}
            >
              Push-ilmoitukset
            </Text>
            <Pressable
              style={{
                width: 80,
                height: 50,
                backgroundColor: toggleOn ? colors.green : colors.grey,
                borderRadius: 50,
                flexDirection: "row",
                padding: 5,
              }}
              onPress={toggle}
            >
              <Animated.View
                style={{
                  height: 40,
                  width: 40,
                  borderRadius: 20,
                  backgroundColor: colors.white,
                  marginLeft: offset,
                }}
              />
            </Pressable>
          </View>
        </View>

        <View>
          <Text style={{ color: colors.grey, textAlign: "center" }}>
            Versio 1.0 Beta
          </Text>
          <Text style={{ color: colors.grey, textAlign: "center" }}>
            Tekijät: Bruno, Noel, Iryna, Elias
          </Text>
        </View>
      </View>

      {/* Footer stays at bottom */}
      <Footer navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    lineHeight: 28,
    fontWeight: 600,
    textAlign: "center",
    marginVertical: 15,
  },
});

export default SettingsScreen;
