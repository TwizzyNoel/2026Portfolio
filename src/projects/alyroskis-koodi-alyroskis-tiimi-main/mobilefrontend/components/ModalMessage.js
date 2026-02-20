import { Modal, View, Text, StyleSheet, Pressable } from "react-native";
import { useTheme } from "@react-navigation/native";

const ModalMessage = ({ messageModal, onConfirm, onCancel }) => {
    const { colors } = useTheme();

    return (
        <Modal transparent animationType='fade'>
            <View style={styles.overlay}>
                <View style={[styles.container, {backgroundColor: colors.green}]}>
                    <Text style={styles.modalText}>{messageModal}</Text>
                    <View style={{ flexDirection: 'row', columnGap: 30 }}>
                        <Pressable onPress={onConfirm} style={[styles.confirmButton, {backgroundColor: colors.white}]}>
                            <Text style={{ fontSize: 18 }}>Vahvista</Text>
                        </Pressable>

                        <Pressable onPress={onCancel} style={[styles.cancelButton, { backgroundColor: colors.red }]}>
                            <Text style={{ fontSize: 16, color: colors.white }}>Peruuta</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    )
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',      
        height: '100%',     
      },
      container: {
        width: "80%",       
        paddingVertical: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff', 
        padding: 25,
      },
    modalText: {
        color: '#fff',
        fontSize: 20,
        paddingBottom: 20,
        textAlign: 'center',
    },
    confirmButton: {
        borderRadius: 8,
        width: 120,
        height: 40,
        paddingVertical: 5,
        paddingHorizontal: 10,
        justifyContent: "center",
        alignItems: 'center',
    },
    cancelButton: {
        borderRadius: 8,
        width: 120,
        height: 40,
        paddingVertical: 5,
        paddingHorizontal: 10,
        justifyContent: "center",
        alignItems: 'center',
    },
})

export default ModalMessage;