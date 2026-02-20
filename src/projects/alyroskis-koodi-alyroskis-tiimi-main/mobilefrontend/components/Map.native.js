import { useRef, useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Entypo from "@expo/vector-icons/Entypo";
import { useTheme } from "../utils/ThemeContext";
import Constants from "expo-constants";
import { darkMapStyle, lightMapStyle } from "../utils/MapStyles";

const Map = () => {
  const API_BASE = Constants.expoConfig?.extra?.API_BASE;
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const { user, token } = useContext(AuthContext);
  const [popupPosition, setPopupPosition] = useState(null);
  const mapRef = useRef(null);

  const { isDark, colors } = useTheme();

  useEffect(() => {
    if (!user?.campusID || !token) return;
    fetch(`${API_BASE}/smart_trash/${user.campusID}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        const parsedData = data.map((marker) => ({
          ...marker,
          latitude: Number(marker.latitude),
          longitude: Number(marker.longitude),
        }));
        setMarkers(parsedData);
      })
      .catch((err) => {
        console.error("Error fetching trash points:", err);
      });
  }, [user, token]);

  const getMarkerColor = (alarm_treshold) => {
    if (alarm_treshold >= 90) return colors.red;
    if (alarm_treshold >= 70) return colors.orange;
    if (alarm_treshold >= 50) return colors.yellow;
    return colors.green;
  };
  const onMarkerPress = async (marker) => {
    setSelectedMarker(marker);
    if (mapRef.current) {
      try {
        const point = await mapRef.current.pointForCoordinate({
          latitude: marker.latitude,
          longitude: marker.longitude,
        });
        setPopupPosition(point);
      } catch (e) {
        console.log("Error getting point", e);
      }
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        style={styles.map}
        customMapStyle={isDark ? darkMapStyle : lightMapStyle}
        initialRegion={{
          latitude: 61.457182, // Tampere latitude
          longitude: 23.85478, // Tampere longitude
          latitudeDelta: 0.0009,
          longitudeDelta: 0.0019,
        }}
        zoomEnabled={true} // allow pinch zoom
        scrollEnabled={true} // allow drag/move
        pitchEnabled={true} // allow tilt
        rotateEnabled={true} // allow rotation
      >
        {markers.map((marker) => (
          <Marker
            key={marker.trashID}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            onPress={() => onMarkerPress(marker)}
          >
            {selectedMarker?.trashID === marker.trashID ? (
              <Entypo
                name="location-pin"
                size={40}
                color={getMarkerColor(marker.alarm_treshold)}
              />
            ) : (
              <EvilIcons
                name="location"
                size={40}
                color={getMarkerColor(marker.alarm_treshold)}
              />
            )}
          </Marker>
        ))}
      </MapView>

      {selectedMarker && popupPosition && (
        <View
          style={{
            position: "absolute",
            top: popupPosition.y - 140, // above marker
            left: popupPosition.x - 125, // half width
            width: 250,
            padding: 20,
            elevation: 5,
            backgroundColor: getMarkerColor(selectedMarker.alarm_treshold),
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={styles.info}>Roskis #{selectedMarker.trashID}</Text>
            <Text style={styles.info}>
              {selectedMarker.alarm_treshold}% Täynnä
            </Text>
          </View>
          <EvilIcons
            onPress={() => setSelectedMarker(null)}
            name="close-o"
            size={30}
            color="black"
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  info: {
    fontSize: 18,
    lineHeight: 23,
  },
});

export default Map;
