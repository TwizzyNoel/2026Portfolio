import { View } from "react-native";
import Map from "../components/Map";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useTheme } from "@react-navigation/native";

const MapScreen = ({ navigation }) => {
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Navbar navigation={navigation} />

      <View style={{ flex: 1 }}>
        <Map />
      </View>

      <Footer navigation={navigation} />
    </View>
  );
};

export default MapScreen;
