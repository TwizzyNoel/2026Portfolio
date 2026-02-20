import { useTheme } from "@react-navigation/native";
import { Text, View, StyleSheet } from 'react-native';
import { messageColors } from '../utils/themes';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const MessageBox = ({ message, type }) => {
    const { colors } = useTheme();
    const bgColor = messageColors.background[type] || 'transparent';
    const textColor = messageColors.text[type] || 'transparent';

    if (!message) {
        return (
            <View style={[styles.container, { backgroundColor: 'transparent' }]}>
                <Text style={[styles.text, { color: 'transparent' }]}></Text>
            </View>
        );
    }
    return (
        <View style={[styles.container, { backgroundColor: message ? bgColor : 'transparent' }]}>
            <Text style={[styles.text, { color: message ? textColor : 'transparent' }]}>
                {message || 'placeholder'}
            </Text>
            {type === 'error' && (
                <FontAwesome6 name="circle-exclamation" size={24} color={colors.white} style={styles.icon} />
            )}
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        borderRadius: 15,
        flexDirection: 'row',   
        alignItems: 'center',
        marginHorizontal: 10,
    },
    text: {
        fontSize: 20,
        color: '#fff',
        paddingHorizontal: 10,
        fontFamily: 'RopaSans',
    },
    icon: {
        marginLeft: 'auto',
    },
});

export default MessageBox;