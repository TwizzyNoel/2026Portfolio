import axios from "axios";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Constants from "expo-constants";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Feather from "@expo/vector-icons/Feather";
import ModalMessage from "../components/ModalMessage";
import MessageArea from "../components/MessageArea";
import { useTheme } from "@react-navigation/native";

const TrashPointScreen = ({ route, navigation }) => {
  const API_BASE = Constants.expoConfig?.extra?.API_BASE;
  const { number } = route.params;
  const { user, token } = useContext(AuthContext);
  const [trashPoints, setTrashPoints] = useState([]);
  const [pointColor, setPointColor] = useState(null);
  const [threshold, setThreshold] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [pendingAction, setPendingAtion] = useState(null);
  const [lastAction, setLastAction] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const { colors } = useTheme();

  useEffect(() => {
    if (token && user?.campusID) {
      axios
        .get(`${API_BASE}/smart_trash/${user?.campusID}/${number}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setTrashPoints(response.data);
        })
        .catch((error) => {
          console.error("Error fetching buildings:", error);
        });
    }
  }, [user, token]);

  const item = trashPoints[0];

  useEffect(() => {
    if (!item) return;

    if (item.alarm_treshold >= 90 && item.alarm_treshold <= 100) {
      setPointColor("#FF4D4D");
    } else if (item.alarm_treshold >= 70 && item.alarm_treshold <= 90) {
      setPointColor("#FF8000");
    } else if (item.alarm_treshold >= 50 && item.alarm_treshold < 70) {
      setPointColor("#FFAE00");
    } else if (item.alarm_treshold < 50) {
      setPointColor("#049A5B");
    }
  }, [item]);

  if (!item) { return null; }

  const editTrashPoint = async (action) => {
    if (!token || !item) return;    
      
    try {
      const auth = { headers: { Authorization: `Bearer ${token}` } };

      const endpoint =
        action === "empty"
          ? `${API_BASE}/smart_trash/empty`
          : `${API_BASE}/smart_trash/full`;

          const body = { ids: [item.trashID] };

      await axios.put(endpoint, body, auth);

      // refresh data
      const refreshed = await axios.get(
        `${API_BASE}/smart_trash/${user?.campusID}/${item.trashID}`,
        auth
      );
      setTrashPoints(refreshed.data);
      } catch (error) {
        console.error(`Error editing smart_trash Trash ${action}:`, error);
      }
  };

  const handleActionPress = (action) => {
    if (action === "full" && item.alarm_treshold >= 80 ) {
      setMessage(`Roskapiste on jo täynnä`);
      setMessageType(action);
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 4000);
      return;
    } 
    if (action === "empty" && item.alarm_treshold < 50) {
      setMessage(`Roskapiste on jo tyhjä`);
      setMessageType(action);
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 4000);
      return;
    } 
    setPendingAtion(action);
    setShowModal(true);
  }

  const handleConfirm = async () => {
    if (!pendingAction) return;

    setLastAction(pendingAction);
    await editTrashPoint(pendingAction);

    setPendingAtion(null);
    setShowModal(false);

    setMessage(`Roskapiste oli merkitty ${actionLabels[pendingAction]}`);
    setMessageType(pendingAction);
    setShowMessage(true);

    setTimeout(() => {
      setShowMessage(false);
      setLastAction(null);
    }, 5000);
  }

  const handleCancel = () => {
    setPendingAtion(false);
    setShowModal(null);
  }

  const actionLabels = {
    empty: "tyhjäksi",
    full: "täydeksi",
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Navbar navigation={navigation} />
      <View style={styles.container}>
        <View style={{ flexDirection: "row", columnGap: 20 }}>
          <View style={[styles.icon, { backgroundColor: colors.green }]}>
            <Text style={[styles.iconTitle, { color: colors.primary }]}>
              {item.buildingName.slice(-1)}
            </Text>
          </View>
          <View>
            <Text style={[styles.title, { color: colors.text }]}>
              {item.campusName}
            </Text>
            <Text style={{ color: colors.text }}>{item.buildingName}</Text>
          </View>
        </View>

        <View style={[styles.imageWrap, { backgroundColor: pointColor }]}>
          <Image
            source={require("../assets/images/piste.png")}
            style={styles.pointImage}
            resizeMode="contain"
          />
          <View
            style={[styles.overlay, { backgroundColor: pointColor }]}
          ></View>
        </View>
        <Text style={[styles.subtitle, { color: colors.text }]}>
          Roskakori #{item.trashID}
        </Text>
        <Text style={{ paddingBottom: 15, color: colors.text }}>
          {item.alarm_treshold}% Täynnä
        </Text>
        <Text style={{ color: colors.text }}>Tyyppi: {item.typeName}</Text>

        <Text style={{ color: colors.text }}>
          Viimeksi tyhjennetty: {item.formattedDate}
        </Text>

        <View style={styles.buttonWrapper}>
          <Pressable
            onPress={() => handleActionPress("full")}
            style={[styles.fullButton, { borderColor: colors.green }]}>
              <Text style={[styles.buttonText, { color: colors.primary }]}>
                Täynnä
              </Text>
          </Pressable>

          <Pressable
            onPress={() => handleActionPress("empty")}
            style={[
              styles.emptyButton,
              {
                borderColor: colors.green,
                backgroundColor: colors.green,
                alignItems: "center",
              },
            ]}
          >
            <Feather name="check" size={20} color={colors.primary} />
            <Text style={[styles.buttonText, { color: colors.primary }]}>
              Tyhjä
            </Text>
          </Pressable>
      </View>
      {showModal && (
        <ModalMessage 
          messageModal={`Haluatko merkitä tämän roskapiste ${actionLabels[pendingAction]}?`}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
      {showMessage && (
          <MessageArea message={message} type={messageType} showMessage={showMessage} />
      )}
      </View>

      <Footer navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  icon: {
    height: 60,
    width: 60,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  iconTitle: {
    fontSize: 25,
    textTransform: "uppercase",
  },
  title: {
    fontWeight: "600",
    fontSize: 22,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "500",
  },
  imageWrap: {
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    backgroundColor: "#ffffff",
    marginVertical: 15,
    borderRadius: 15,
    overflow: "hidden",
  },
  pointImage: {
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // fills the parent
    opacity: 0.5,
    borderRadius: 15,
  },
  buttonWrapper: {
    flexDirection: 'row',
    paddingVertical: 20,
    width: "100%",
    columnGap: 10,
    justifyContent: 'space-between',
  },
  fullButton: {
    borderWidth: 2,
    borderRadius: 8,
    width: 100,
    height: 40,
    paddingVertical: 5,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: 'center',
    flex: 1,
  },
  emptyButton: {
    flex: 1,
    borderRadius: 8,
    width: 100,
    height: 40,
    paddingVertical: 5,
    paddingHorizontal: 10,
    justifyContent: "center",
    flexDirection: "row",
  },
  messageWrapper: {
    paddingHorizontal: 20,
  }
});

export default TrashPointScreen;
