import React, { useState, useEffect, useContext } from "react";
import Constants from "expo-constants";
import axios from "axios";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MoonIcon from "../components/MoonIcon";
import MessageBox from "../components/messageBox";
import { AuthContext } from "../context/AuthContext";

import { useTheme } from "@react-navigation/native";

const Login = ({ navigation }) => {
  const API_BASE = Constants.expoConfig?.extra?.API_BASE;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info");
  const [hasError, setHasError] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const { colors } = useTheme();

  console.log("API", API_BASE);

  const handleLogin = async () => {
    if (!email || !password) {
      setMessage("Tarkista tiedot");
      setMessageType("error");
      setHasError(true);
      return;
    }
    try {
      const response = await axios.post(`${API_BASE}/login`, {
        email: email,
        password: password,
      });
      console.log("Response:", response.data);
      console.log("API", API_BASE);
      const { token, userForToken } = response.data;

      if (token && userForToken) {
        login(token, userForToken);

        setMessage("Login successful");
        setMessageType("info");
        setHasError(false);

      } else if (response.data.error) {
        setMessage(response.data.error);
        setMessageType("error");
        setHasError(true);
      } else {
        setMessage("Tarkista tiedot");
        setMessageType("error");
        setHasError(true);
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("Network error, please try again.");
      setMessageType("error");
      setHasError(true);
    }

    setTimeout(() => {
      setMessage("");
      setMessageType("info");
      setHasError(false);
    }, 3000);
  };

  useEffect(() => {
    const loadToken = async () => {
      try {
        const savedToken = await AsyncStorage.getItem("token");
        const savedUser = await AsyncStorage.getItem("user");
        if (savedToken && savedUser) {
          let parsedUser = null;
          try {
            parsedUser = JSON.parse(savedUser);
          } catch (e) {
            console.warn("Invalid stored user, clearing it.", e);
            await AsyncStorage.removeItem("user");
          }
          if (parsedUser) {
            await login(savedToken, parsedUser);
            
          }
        }
      } catch (err) {
        console.error("Failed to load token/user", err);
      }
    };
    loadToken();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.iconWrap}>
        <MoonIcon />
      </View>
      <Text style={[styles.title, { color: colors.text }]}>Kirjautuminen</Text>
      <View style={{ minHeight: 50 }}>
        <MessageBox message={message} type={messageType} />
      </View>
      <Text style={[styles.label, { color: colors.text }]}>Sähköposti</Text>
      <TextInput
        style={[
          styles.input,
          { color: colors.text },
          hasError && styles.inputError,
          emailFocused && styles.inputFocused,
        ]}
        value={email}
        onChangeText={setEmail}
        underlineColorAndroid="transparent"
        onFocus={() => {
          setHasError(false);
          setEmailFocused(true);
        }}
        onBlur={() => setEmailFocused(false)}
      />
      <Text style={[styles.label, { color: colors.text }]}>Salasana</Text>
      <TextInput
        style={[
          styles.input,
          { color: colors.text },
          hasError && styles.inputError,
          passwordFocused && styles.inputFocused,
        ]}
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        underlineColorAndroid="transparent"
        onFocus={() => {
          setHasError(false);
          setPasswordFocused(true);
        }}
        onBlur={() => setPasswordFocused(false)}
      />
      <Pressable onPress={() => navigation.navigate("ForgotPassword")}>
        <Text style={styles.resetPass}>Unohditko salasanasi?</Text>
      </Pressable>

      <Pressable
        onPress={handleLogin}
        style={[styles.button, { backgroundColor: colors.buttonBackground }]}
      >
        <Text style={styles.buttonText}>Kirjaudu</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 50,
  },
  iconWrap: {
    width: "100%",
    padding: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  title: {
    fontSize: 36,
    fontFamily: "RopaSans",
    textAlign: "center",
    marginVertical: 10,
  },
  label: {
    fontSize: 20,
    marginBottom: 8,
    fontFamily: "RopaSans",
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#CAC4D0",
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 8,
    fontFamily: "RopaSans",
    marginBottom: 30,
  },
  inputError: {
    backgroundColor: "#FF4B4B",
    borderColor: "transparent",
  },
  inputFocused: {
    borderColor: "transparent",
    backgroundColor: "#F0FFF4",
  },
  resetPass: {
    fontSize: 12,
    color: "#60ACFF",
    textAlign: "center",
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontFamily: "RopaSans",
  },
  text: {
    fontSize: 16,
  },
});

export default Login;
