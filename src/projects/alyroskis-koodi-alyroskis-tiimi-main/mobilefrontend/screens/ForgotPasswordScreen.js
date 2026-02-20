import React, { useState } from "react";
import { View, TextInput, Text, Pressable, StyleSheet, Alert } from "react-native";
import { useTheme } from "@react-navigation/native";

const ForgotPassword = ({ navigation }) => {
    const { colors } = useTheme();
    const [hasError, setHasError] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [email, setEmail] = useState('');

    const sendVerificationCode = async () => {
        if (!email) {
            setHasError(true);
            return;
        }
    
        try {
            console.log('Sending request...');
            const response = await fetch("http://localhost:3001/send-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ to: email })
            });

            console.log('Response received');
            const data = await response.json();
            console.log('Data:', data);
            if (data.success) {
                Alert.alert('Onnistui', 'Vahvistuskoodi lähetetty sähköpostiisi!');
                setHasError(false);
            } else {
                Alert.alert('Virhe', 'Sähköpostin lähetyksessä tapahtui virhe: ' + data.error);
            }
        } catch (err) {
            console.log('Fetch error:', err);
            Alert.alert('Verkkovirhe', err.message);
        }
    };    

    return (
        <View style={styles.container}>
            <Text style={[styles.title, { color: colors.text }]}>Unohditko salasanasi?</Text>
            <Text style={[styles.label, { color: colors.text }]}>Sähköposti</Text>
            <TextInput
                style={[
                    styles.input,
                    { color: colors.text },
                    hasError && styles.inputError,
                    passwordFocused && styles.inputFocused,
                ]}
                value={email}
                onChangeText={setEmail}
                placeholder="Sähköpostisi"
                placeholderTextColor="#888"
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <Pressable
                style={[styles.button, { backgroundColor: colors.buttonBackground }]}
                onPress={sendVerificationCode}
            >
                <Text style={styles.buttonText}>Lähetä vahvistuskoodi</Text>
            </Pressable>
        </View>
    );
};

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

export default ForgotPassword;
