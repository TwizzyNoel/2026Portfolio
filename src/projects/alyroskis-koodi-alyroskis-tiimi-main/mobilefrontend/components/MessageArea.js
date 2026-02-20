import { Animated } from "react-native";
import { useRef, useEffect } from "react";
import MessageBox from "./messageBox";

const MessageArea = ({ message, type , showMessage }) => {
    const slideAnim = useRef(new Animated.Value(-60)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(slideAnim, {
                toValue: showMessage ? 0 : -60, // slide down/up
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(fadeAnim, {
                toValue: showMessage ? 1 : 0, // fade in/out
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start();
    }, [showMessage]);

    return(
        <Animated.View
            style={{
                transform: [{ translateY: slideAnim }],
                opacity: fadeAnim,
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 10,
            }}
        >
            <MessageBox message={message} type={type} />
        </Animated.View>
    );
};

export default MessageArea;