import { View, StyleSheet } from "react-native";
import Point from "./Point";

const PointsList = ({
  trashPoints,
  navigation,
  showCheckBox,
  setShowCheckBox,
  selectedPoints,
  setSelectedPoints,
}) => {
  return (
    <View style={styles.container}>
      {trashPoints.map((item) => (
        <View key={item.trashID} style={styles.item}>
          <Point
            number={item.trashID}
            fullness={item.alarm_treshold}
            navigation={navigation}
            showCheckBox={showCheckBox}
            setShowCheckBox={setShowCheckBox}
            selectedPoints={selectedPoints}
            setSelectedPoints={setSelectedPoints}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  item: {
    width: "33.33%",
    padding: 10,
  },
});

export default PointsList;
