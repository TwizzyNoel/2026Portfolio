import React, { useState } from "react";
import { View, TextInput, Text, Pressable, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";
import MessageBox from "../components/messageBox";

const ResetPassword = ({ route, navigation }) => {
    const { colors } = useTheme();
    const [hasError, setHasError] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('info');
    const { email } = route.params;

    const ResetPasswordHandler = async () => {
        if (!newPassword || !confirmPassword) {
            setHasError(true);
            setMessage("Täytä molemmat kentät");
            setMessageType("error");
            return;
        }

        if (newPassword !== confirmPassword) {
            setMessage("Salasanat eivät täsmää");
            setMessageType("error");
            return;
        }

        try {
            const response = await fetch("http://localhost:3001/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, newPassword })
            });
            const data = await response.json();

            if (data.success) {
                setMessage("Salasana vaihdettu!");
                setMessageType("info");
                setHasError(false);
                setTimeout(() => navigation.navigate("Login"), 1000);
            } else {
                setMessage(data.error);
                setMessageType("error");
                setHasError(true);
            }
        } catch (err) {
            setMessage("Verkkovirhe: " + err.message);
            setMessageType("error");
            setHasError(true);
        }

        setTimeout(() => {
            setMessage('');
            setMessageType('info');
            setHasError(false);
        }, 3000);
    }

    return (
        <View style={styles.container}>
            <Text style={[styles.title, { color: colors.text }]}>Vaihda salasanasi</Text>
            <View style={{ minHeight: 50 }}>
                <MessageBox message={message} type={messageType} />
            </View>
            <Text style={[styles.label, { color: colors.text }]}>Uusi salasana</Text>
            <TextInput
                style={[
                    styles.input,
                    { color: colors.text },
                    hasError && styles.inputError,
                    passwordFocused && styles.inputFocused,
                ]}
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder="Uusi salasana"
                placeholderTextColor="#888"
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                secureTextEntry={true}
                keyboardType="default"
                autoCapitalize="none"
            />
            <Text style={[styles.label, { color: colors.text }]}>Vahvista uusi salasana</Text>
            <TextInput
                style={[
                    styles.input,
                    { color: colors.text },
                    hasError && styles.inputError,
                    passwordFocused && styles.inputFocused,
                ]}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Vahvista salasana"
                placeholderTextColor="#888"
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                secureTextEntry={true}
                keyboardType="default"
                autoCapitalize="none"
            />
            <Pressable
                style={[styles.button, { backgroundColor: colors.buttonBackground }]}
                onPress={ResetPasswordHandler}
            >
                <Text style={styles.buttonText}>Vaihda salasana</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
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
});

export default ResetPassword;
