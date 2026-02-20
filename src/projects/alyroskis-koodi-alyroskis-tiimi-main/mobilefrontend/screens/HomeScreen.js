import { useState, useEffect } from "react";
import { View, ScrollView, Text, StyleSheet, Pressable } from "react-native";
import Navbar from "../components/Navbar";
import PointsList from "../components/PointsList";
import Footer from "../components/Footer";
import ModalMessage from "../components/ModalMessage";
import MessageArea from "../components/MessageArea";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import Constants from "expo-constants";

import Feather from "@expo/vector-icons/Feather";
import { useTheme } from "@react-navigation/native";

export default function HomeScreen({ navigation }) {
  const API_BASE = Constants.expoConfig?.extra?.API_BASE;
  const { user, token } = useContext(AuthContext);
  const [selectedBuilding, setSelectedBuilding] = useState("");
  const [buildings, setBuildings] = useState([]);
  const [trashPoints, setTrashPoints] = useState([]);
  const { colors } = useTheme();
  // empty and full filter
  const [showModal, setShowModal] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const [lastAction, setLastAction] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(null);
  const [messageModal, setMessageModal] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [showCheckBox, setShowCheckBox] = useState(false);
  const [selectedPoints, setSelectedPoints] = useState([]);

  const actionLabels = {
    empty: "tyhjäksi",
    full: "täydeksi",
  };

  const actionStatements = {
    empty: "tyhjä",
    full: "täynnä",
  }

  // get buildings and trash points
  useEffect(() => {
    if (token && user?.campusID) {
      axios
        .get(`${API_BASE}/buildings/${user?.campusID}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setBuildings(response.data);
          if (response.data.length > 0 && !selectedBuilding) {
            setSelectedBuilding(response.data[0].name);
          }
        })
        .catch((error) => {
          console.error("Error fetching buildings:", error);
        });

      axios
        .get(`${API_BASE}/smart_trash/${user?.campusID}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setTrashPoints(response.data);
        })
        .catch((error) => {
          console.error("Error fetching trash points:", error);
        });
    }
  }, [user, token]);

  // Filter points for the selected building
  const filteredPoints =
    selectedBuilding === "all"
      ? trashPoints
      : trashPoints.filter((p) => p.buildingName === selectedBuilding);

  // mark the trashPoint as empty or full
  const editTrashPoint = async (ids, action) => {
    if (!token || !ids || ids.length === 0) return;

    try {
      const auth = { headers: { Authorization: `Bearer ${token}` } };

      const endpoint =
        action === "empty"
          ? `${API_BASE}/smart_trash/empty`
          : `${API_BASE}/smart_trash/full`;

          const body = { ids };

      await axios.put(endpoint, body, auth);

      // refresh data
      const refreshed = await axios.get(
        `${API_BASE}/smart_trash/${user?.campusID}`,
        auth
      );
      setTrashPoints(refreshed.data);
    } catch (error) {
      console.error(`Error editing smart_trash Trash ${action}:`, error);
    }
  };

  // check the trashPoint
  const isAlreadyInState = (point, action) => {
    if (!point) return false;
    if (action === "full") {
      return point.alarm_treshold >= 80;
    }

    if (action === "empty") {
      return point.alarm_treshold < 50;
    }
    return false;
  }
  // user presses buton "Täynnä" or "Tyhjä"
  const handleActionPress = (action) => {
    if (!selectedPoints || selectedPoints.length === 0) return;

    const alreadyDonePoints = selectedPoints.filter((id) => {
      const point = trashPoints.find((p) => p.trashID === id);
      return isAlreadyInState(point, action);
    });

    if (alreadyDonePoints.length > 0) {
      setMessage(
        alreadyDonePoints.length === 1
        ? `Roskapiste #${alreadyDonePoints[0]} on jo ${actionStatements[action]}`
        : `${alreadyDonePoints.length} roskapistettä on jo ${actionStatements[action]}`
      );
        setMessageType(action);
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 4000);
        return;
    }

    setPendingAction(action);
    
    setMessageModal(
      selectedPoints.length === 1
        ? `Haluatko merkitä tämä roskapiste ${actionLabels[action]}?`
        : `Haluatko merkitä nämä ${selectedPoints.length} roskapistettä ${actionLabels[action]}?`
    )
    setShowModal(true);
  };
  // user presses "Vahvista" (makes choice in the Modal)
  const handleConfirm = async () => {
    if (!pendingAction || selectedPoints.length === 0) return;

    try {
        setLastAction(pendingAction);
         await editTrashPoint(selectedPoints, pendingAction);
         setMessage(
          selectedPoints.length === 1
            ? `Roskapiste oli merkitty ${actionLabels[pendingAction]}`
            : `${selectedPoints.length} roskapistettä merkitty ${actionLabels[pendingAction]}`
          );
          setMessageType(pendingAction);

      // reset UI
      setShowModal(false);
      setShowCheckBox(false);
      setShowMessage(true);
      setPendingAction(null);
      setSelectedPoints([]);

      setTimeout(() => {
        setShowMessage(false);
        setLastAction(null);
        setMessageType(null);
      }, 5000);
    } catch (error) {
      console.error("Multi edit error", error);
    }
  };
  // user presses "Peruuta"
  const handleCancel = () => {
    // reset UI
    setShowModal(false);
    setShowCheckBox(false);
    setPendingAction(null);
    setSelectedPoints([]);
  };

  return (
    <Pressable 
      style={{ flex: 1 }}
      onPress={() => {
        if (showCheckBox) {
          setShowCheckBox(false);
          setSelectedPoints([]);
        }
      }}
    >
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Navbar navigation={navigation} />

      {showModal && (
        <ModalMessage
          messageModal={messageModal}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
      <View>
        {showMessage && (
            <MessageArea message={message} type={messageType} showMessage={showMessage} />
        )}
      </View>

      <ScrollView>
        <Text style={[styles.title, { color: colors.text }]}>Roskikset</Text>

        <View style={styles.filterButtons}>
          <Pressable
            onPress={() => {
              if (selectedPoints.length > 0) {
                handleActionPress("full");
              }
            }}
            style={[styles.fullButton, { borderColor: colors.green }]}
          >
            <Text style={[styles.buttonText, { color: colors.primary }]}>
              Täynnä
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              if (selectedPoints.length > 0) {
                handleActionPress("empty");
              }
            }}
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
          <View style={[styles.picker, { borderColor: colors.green }]}>
            <Picker
              selectedValue={selectedBuilding}
              onValueChange={setSelectedBuilding}
              mode="dropdown"
              dropdownIconColor={colors.text}
            >
              <Picker.Item
                label="Kaikki rakennukset"
                value={"all"}
                style={{
                  backgroundColor: colors.background,
                  color: colors.text,
                  fontSize: 16,
                }}
              />
              {buildings.map((building) => (
                <Picker.Item
                  key={building.buildingID}
                  label={building.name}
                  value={building.name}
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

        <PointsList
          trashPoints={filteredPoints}
          navigation={navigation}
          showCheckBox={showCheckBox}
          setShowCheckBox={setShowCheckBox}
          selectedPoints={selectedPoints}
          setSelectedPoints={setSelectedPoints}
        />
      </ScrollView>
      <Footer navigation={navigation} />
    </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: "700",
    paddingBottom: 20,
    paddingHorizontal: 10,
    marginTop: 20,
  },
  filterButtons: {
    flexDirection: "row",
    columnGap: 5,
    alignItems: "center",
    marginHorizontal: 10,
  },
  fullButton: {
    borderWidth: 2,
    borderRadius: 8,
    width: 80,
    height: 40,
    paddingVertical: 5,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  emptyButton: {
    borderRadius: 8,
    width: 80,
    height: 40,
    paddingVertical: 5,
    paddingHorizontal: 10,
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonText: {
    fontSize: 16,
  },
  picker: {
    flex: 1,
    marginLeft: 5,
    borderWidth: 3,
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  messageWrapper: {
    paddingHorizontal: 20,
    marginHorizontal: 10,
    borderRadius: 15,
  },
});
