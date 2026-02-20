import { useState, useContext, useEffect } from "react";
import { View, ScrollView, Text, Image, Pressable, StyleSheet, TextInput } from "react-native";
import Navbar from "../components/Navbar";
import MessageBox from "../components/messageBox";
import Footer from "../components/Footer";
import { AuthContext } from "../context/AuthContext";
import { useTheme } from "@react-navigation/native";
import axios from "axios";
import Constants from "expo-constants";
import { Picker } from "@react-native-picker/picker";

const UserScreen = ({ navigation }) => {
  const API_BASE = Constants.expoConfig?.extra?.API_BASE;
  const { user, token, logout } = useContext(AuthContext);
  const { colors } = useTheme();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(null);

  const [selectedCampus, setSelectedCampus] = useState("");
  const [campuses, setCampuses] = useState([]);

  const passwordsFilled = newPassword.length > 0 && confirmPassword.length > 0;
  const passwordsMatch = newPassword === confirmPassword;
  const passwordTooShort = newPassword.length > 0 && newPassword.length < 8;
  const hasError = passwordsFilled && (!passwordsMatch || passwordTooShort);

  const handleChangePassword = async () => {
    if (!newPassword || !confirmPassword) {
      setShowMessage(true);
      setMessage("Täytä molemmat kentät");
      setMessageType("error");
      setTimeout(() => {
        setShowMessage(false);
        setMessageType(null);
      }, 4000);
      return;
    }

    if (newPassword !== confirmPassword) {
      setShowMessage(true);
      setMessage("Salasanat eivät täsmää");
      setMessageType("error");
      setTimeout(() => {
        setShowMessage(false);
        setMessageType(null);
      }, 4000);
      return;
    }

    if (newPassword.length < 8) {
      setShowMessage(true);
      setMessage("Salasanan tulee olla vähintään 8 merkkiä pitkä");
      setMessageType("error");
      setTimeout(() => {
        setShowMessage(false);
        setMessageType(null);
      }, 4000);
      return;
    }

    try {
      await axios.put(`${API_BASE}/userEdit/password/${user.userID}`, {
        password: newPassword,
      }, 
      {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
         },
        });
        setShowMessage(true);
        setMessage("Salasana vaihdettu. Kirjaudu uudelleen.");
        setMessageType("success");

        setTimeout(async () => {
          await logout();
          navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
        });
          setShowMessage(false);
          setMessageType
        }, 4000);       
        
        setNewPassword("");
        setConfirmPassword("");        
    }  catch (error) { 
      console.error("Error updating password:", error);
    }
     }; 

     useEffect(() => {
      if (token && user?.campusID) {
        axios
          .get(`${API_BASE}/userEdit/campuses`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            setCampuses(response.data);
            if (response.data.length > 0 && !selectedCampus) {
              setSelectedCampus(response.data[0].name);
            }
          })
          .catch((error) => {
            console.error("Error fetching campus:", error);
          });
      }
    }, [user, token]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Navbar navigation={navigation} />
      <ScrollView style={{flex: 1 }}>

      {showMessage && <MessageBox message={message} type={messageType} />}
      
      <Text style={[styles.title, { color: colors.text }]}>{user.fullname}</Text>
      
      <View style={{ 
        alignSelf: "center", 
        marginBottom: 40, 
        width: 150, 
        height: 150, 
        overflow: "hidden",
        borderRadius: 100
      }}>
        <Image source={require('../assets/images/user-icon.png')} style={{ width: '100%', height: '100%' }}/>
      </View>

      <View style={{ flex: 1 }}>
        <View style={{ width: "60%", alignSelf: "center" }}>
          <Text style={[styles.label, {color: colors.text}]}>Vaihda salasana</Text>
          <TextInput 
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="newPassword"
            style={[styles.input, { borderColor: colors.grey, color: colors.text }]}
          />

          <Text style={[styles.label, {color: colors.text}]}>Vahvista salasana</Text>
          <TextInput 
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="password"
            style={[
              styles.input, 
              { borderColor: hasError ? colors.red : colors.grey,
                color: colors.text
               }]}
          />
        </View>

        <View style={[styles.picker, { borderColor: colors.green }]}>
          <Picker
            selectedValue={selectedCampus}
            onValueChange={setSelectedCampus}
            mode="dropdown"
            dropdownIconColor={colors.text}
          >
            {campuses.map((campus) => (
              <Picker.Item
                key={campus.campusID}
                label={campus.name}
                value={campus.campusID}
                style={{
                  color: colors.text,
                  backgroundColor: colors.background,
                  fontSize: 16,
                }}
              />
            ))}
          </Picker>
        </View>
      </View>

      <Pressable onPress={() => navigation.navigate("UserEditScreen")}>
        <Text style={{ color: colors.text }}>Edit user</Text>
      </Pressable>
      
      <View style={styles.buttonsWrapper}>
          <Pressable
            style={[styles.button, {backgroundColor: colors.green}]}
              onPress={async () => {
                await logout();
                navigation.reset({
                  index: 0,
                  routes: [{ name: "Login" }],
                });
              }}
          >
            <Text style={{ fontSize: 16, color: colors.primary }}>Kirjaudu ulos</Text>
          </Pressable>
          
          <Pressable
            style={[
              styles.button, 
              {backgroundColor: colors.green, opacity: hasError ? 0.5 : 1}]}
            onPress={handleChangePassword}
          >
            <Text style={{ fontSize: 16, color: hasError ? colors.white : colors.primary }}>Tallena</Text>
          </Pressable>
      </View>
      </ScrollView>

      <Footer navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    lineHeight: 28,
    fontWeight: 600,
    textAlign: "center",
    marginVertical: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 2, 
    borderRadius: 8,
    marginBottom: 30,
  },
  picker: {
    width: "60%",
    alignSelf: "center",
    borderWidth: 3,
    paddingHorizontal: 5,
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 50,
  },
  buttonsWrapper: { 
    flexDirection: "row", 
    justifyContent: "center", 
    columnGap: 20, 
    marginBottom: 30   
  },
  button: {
    padding: 10,
    width: 180,
    alignItems: "center",
    borderRadius: 20,
  }
});

export default UserScreen;
