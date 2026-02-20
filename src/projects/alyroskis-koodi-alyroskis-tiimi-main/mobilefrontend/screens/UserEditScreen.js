import axios from "axios";
import { Picker } from '@react-native-picker/picker';
import { useContext, useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet, TextInput} from "react-native";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Constants from "expo-constants";

const API_BASE = Constants.expoConfig.extra.API_BASE;
const UserEditScreen = ({ route, navigation }) => {
  const { user, token } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    user_type: "",
    building: "",
    campus: "",
  });

  const [campuses, setCampuses] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [selectedCampus, setSelectedCampus] = useState("");
  const [selectedBuilding, setSelectedBuilding] = useState("");

  useEffect(() => {
    if (token && user?.user_type === 2) {
      axios
        .get(`${API_BASE}/userEdit?user_type=2`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          const data = response.data;
          let arr = [];
        
          if (Array.isArray(data)) {
            arr = data;
          } else if (data && typeof data === "object") {
            arr = [data];
          }
        
          setUsers(arr);
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
        });
    }
  }, [user, token]);

  useEffect(() => {
    if (token) {
      axios.get(`${API_BASE}/userEdit/campuses`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => setCampuses(res.data))
      .catch(err => console.error("Error fetching campuses:", err));
    }
  }, [token]);
  
  useEffect(() => {
    if (selectedCampus) {
      axios
        .get(`${API_BASE}/userEdit/campuses/buildings/${selectedCampus}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(res => {
          const buildingsData = res.data || [];
          setBuildings(buildingsData);
  
          if (buildingsData.length > 0) {
            setSelectedBuilding(buildingsData[0].buildingID);
          } else {
            setSelectedBuilding("");
          }
        })
        .catch(err => console.error("Error fetching buildings:", err));
    } else {
      setBuildings([]);
      setSelectedBuilding("");
    }
  }, [selectedCampus]);

  const openModal = (user) => {
    setSelectedUser(user);
  
    if (token && user?.user_type === 1) {
      axios
        .get(`${API_BASE}/userEdit/${user.userID}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          const data = Array.isArray(response.data) ? response.data[0] : response.data;
  
          if (data) {
            setSelectedCampus(data.campusID || "");
            setFormData({
              fullname: user.fullname || "",
              email: user.email || "",
              phone: user.phone || "",
              user_type: user.user_type?.toString() || "",
            });
  
            if (data.campusID) {
              axios
                .get(`${API_BASE}/userEdit/campuses/buildings/${data.campusID}`, {
                  headers: { Authorization: `Bearer ${token}` },
                })
                .then((res) => {
                  setBuildings(res.data || []);
                  setSelectedBuilding(data.buildingID || "");
                })
                .catch(err => console.error("Error fetching buildings:", err));
            }
          }
        })
        .catch((error) => {
          console.error("Error fetching user details:", error);
        });
    }
  
    setIsModalOpen(true);
  };

  const saveChanges = async () => {
if (
    !formData.fullname.trim() ||
    !formData.email.trim() ||
    !formData.phone.trim() ||
    !selectedCampus ||
    !selectedBuilding
  ) {
    setErrorMessage("Täytä kaikki kentät ennen tallentamista.");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    setErrorMessage("Syötä kelvollinen sähköpostiosoite.");
    return;
  }

  const phoneRegex = /^\d+$/;
  if (!phoneRegex.test(formData.phone)) {
    setErrorMessage("Puhelinnumeron tulee sisältää vain numeroita.");
    return;
  }

  setErrorMessage("");
  
    const payload = {
      fullname: formData.fullname.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      user_type: formData.user_type,
      campusID: selectedCampus,
      buildingID: selectedBuilding,
    };
    
    try {
      const response = await axios.put(
        `${API_BASE}/userEdit/${selectedUser.userID}`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Saved successfully:", response.data);
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error saving user:", err);
    }
  };


  return (
    <View style={{ flex: 1 }}>
      <Navbar navigation={navigation} />
      <View style={styles.container}>
        {users.map((u) => (
          <View key={u.userID} style={styles.userContainer}>
            <Text>
            koko nimi: {u.fullname}{"\n"}
            sähköposti: {u.email}
            </Text>
            <Pressable style={styles.userEditButton} onPress={() => openModal(u)}>
                <Text style={styles.text}>Muokkaa</Text>
            </Pressable>
          </View>
        ))}
      </View>

      {isModalOpen && selectedUser && (
  <View style={styles.container1}>
    <View style={styles.container2}>
      
    {errorMessage ? (
      <Text style={{ color: "red", marginBottom: 10 }}>{errorMessage}</Text>
    ) : null}

      <Text>Full Name:</Text>
      <TextInput
        style={styles.input}
        value={formData.fullname}
        onChangeText={(text) =>
          setFormData((prev) => ({ ...prev, fullname: text }))
        }
      />

      <Text>Email:</Text>
      <TextInput
        style={styles.input}
        value={formData.email}
        onChangeText={(text) =>
          setFormData((prev) => ({ ...prev, email: text }))
        }
        keyboardType="email-address"
      />

      <Text>Phone:</Text>
      <TextInput
        style={styles.input}
        value={formData.phone}
        onChangeText={(text) =>
          setFormData((prev) => ({ ...prev, phone: text }))
        }
        keyboardType="phone-pad"
      />

      <Text>Campus:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedCampus}
          style={styles.picker}
          onValueChange={(value) => {
            setSelectedCampus(value);
            setSelectedBuilding("");
          }}
        >
          {campuses.map((c) => (
            <Picker.Item key={c.campusID} label={c.name} value={c.campusID} />
          ))}
        </Picker>
      </View>

      <Text>Building:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedBuilding}
          style={styles.picker}
          onValueChange={(value) => setSelectedBuilding(value)}
        >
          {buildings.map((b) => (
            <Picker.Item key={b.buildingID} label={b.name} value={b.buildingID} />
          ))}
        </Picker>
      </View>

      <Text>User Type:</Text>
      <TextInput
        style={styles.input}
        value={formData.user_type?.toString()}
        onChangeText={(text) =>
          setSelectedUser((prev) => ({ ...prev, user_type: text }))
        }
      />

      <Pressable
        style={styles.saveButton}
        onPress={() => {
          saveChanges();
        }}
      >
        <Text style={{ color: "white" }}>Save</Text>
      </Pressable>

      <Pressable
        style={{ marginTop: 10, alignItems: "center" }}
        onPress={() => setIsModalOpen(false)}
      >
        <Text style={styles.closeButton}>Close</Text>
      </Pressable>
    </View>
  </View>
)}
    </View>
  );
};

const styles = StyleSheet.create({
  userContainer: {
    width: 240,
    height: 120,
    padding: 5,
    display: "flex",
    flexDirection: "column",
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 2,
    borderRadius: 15,
    backgroundColor: "lightgreen"
  },
  container: {
    paddingTop: 50,
    display: "flex",
    alignItems: "center"
  },
  userEditButton: {
    width: 70,
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 2,
    borderRadius: 15,
    backgroundColor: "white"
  },
  text: {
    textAlign: "center",
  }, 
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 8,
    marginTop: 5,
    marginBottom: 10,
    width: "100%",
    backgroundColor: "white"
  },
  container1: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  container2: {
    width: 300,
    padding: 20,
    backgroundColor: "lightgreen",
    borderRadius: 15,
  },
  saveButton: {
    backgroundColor: "#2e7d32",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  closeButton: {
    marginTop: 8,
    alignItems: "center",
    backgroundColor: "#c62828",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 10,
    marginBottom: 5,
    backgroundColor: "white",
  },
  dropdownItem: {
    padding: 8,
    backgroundColor: "#f0f0f0",
    borderBottomWidth: 1,
    borderBottomColor: "black"
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#f9f9f9",
    marginBottom: 12,
    justifyContent: "center",
    height: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },

  picker: {
    height: "100%",
    width: "100%",
    color: "#333",
  },

});

export default UserEditScreen;
