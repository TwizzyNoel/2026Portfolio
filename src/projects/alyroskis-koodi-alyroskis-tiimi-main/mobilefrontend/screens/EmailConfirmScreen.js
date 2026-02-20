import React, { useState } from "react";
import { View, TextInput, Text, Pressable, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";
import MessageBox from "../components/messageBox";

const EmailConfirm = ({ route, navigation }) => {
    const { email } = route.params;
    const { colors } = useTheme();
    const [hasError, setHasError] = useState(false);
    const [code, setCode] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('info');

    const ConfirmResetCode = async () => {
        if (!code) { setHasError(true); setMessage("Lisää koodi"); setMessageType("error"); return; }

        try {
            const response = await fetch("http://localhost:3001/verify-code", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, code })
            });
            
            const data = await response.json();

            if (data.success) {
                navigation.navigate("ResetPassword", { email });
            } else {
                setMessage("Koodi ei kelpaa");
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
    };

    return (
        <View style={styles.container}>
            <Text style={[styles.title, { color: colors.text }]}>Vahvista koodi</Text>
            <View style={{ minHeight: 50 }}>
                <MessageBox message={message} type={messageType} />
            </View>
            <Text style={[styles.label, { color: colors.text }]}>
                Sähköpostiisi on lähetetty vahvistuskoodi, joka vanhenee 10 minuutissa. Jos et löydä viestiä, tarkista myös roskaposti.
            </Text>
            <TextInput
                style={[
                    styles.input,
                    { color: colors.text },
                    hasError && styles.inputError,
                ]}
                value={code}
                onChangeText={setCode}
                placeholder="Lisää koodi"
                placeholderTextColor="#888"
                keyboardType="numeric"
                autoCapitalize="none"
            />
            <Pressable
                style={[styles.button, { backgroundColor: colors.buttonBackground }]}
                onPress={ConfirmResetCode}
            >
                <Text style={styles.buttonText}>Vahvista koodi</Text>
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

export default EmailConfirm;
