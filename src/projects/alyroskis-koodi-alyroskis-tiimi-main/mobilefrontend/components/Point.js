import { useEffect, useState } from "react";
import { View, Image, Text, StyleSheet, Pressable } from "react-native";
import { useTheme } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const Point = ({
  number,
  fullness,
  navigation,
  showCheckBox,
  setShowCheckBox,
  selectedPoints,
  setSelectedPoints,
}) => {
  const { colors } = useTheme();
  const [pointColor, setPointColor] = useState(null);
  // change colors according to the fullness
  useEffect(() => {
    if (fullness >= 90 && fullness <= 100) {
      setPointColor(colors.red);
    } else if (fullness >= 70 && fullness <= 90) {
      setPointColor(colors.orange);
    } else if (fullness >= 50 && fullness < 70) {
      setPointColor(colors.yellow);
    } else if (fullness < 50) {
      setPointColor(colors.green);
    }
  }, [fullness]);

  // check if this point is selected

  const isChecked = selectedPoints.includes(number);

  const toggleCheck = () => {
    if (isChecked) {
      setSelectedPoints((prev) => prev.filter((id) => id !== number));
    } else {
      setSelectedPoints((prev) => [...prev, number]);
    }
  };

  return (
    <Pressable
      onPress={() => {
        if (showCheckBox) {
          toggleCheck();
        } else {
          navigation.navigate("TrashPoint", { number });
        }
      }}
      onLongPress={() =>{
        if (!showCheckBox) {
          setShowCheckBox(true);
          setSelectedPoints([number]);
        }
        }
      }
    >
      <View style={styles.pointWrap}>
        <View style={[styles.imageWrap, { backgroundColor: pointColor }]}>
          {showCheckBox && (
            <View
              style={{
                width: 24,
                height: 24,
                borderWidth: 2,
                borderColor: "#fff",
                marginRight: 10,
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                top: 10,
                left: 10,
                alignContent: "center",
                zIndex: 100,
                borderRadius: 5,
              }}
            >
              {isChecked && (
                <MaterialIcons name="done" size={16} color="#fff" />
              )}
            </View>
          )}
          <Image
            source={require("../assets/images/piste.png")}
            style={styles.pointImage}
            resizeMode="contain"
          />
          <View
            style={[styles.overlay, { backgroundColor: pointColor }]}
          ></View>
        </View>
        <Text style={{ color: colors.text }}>Roskis #{number}</Text>
        <Text style={{ color: colors.grey }}>{fullness}% täynnä</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pointWrap: {
    width: "100%",
  },
  imageWrap: {
    width: "100%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "#ffffff",
    overflow: "hidden",
    marginVertical: 10,
  },
  pointImage: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // fills the parent
    opacity: 0.5,
    borderRadius: 15,
  },
});

export default Point;
