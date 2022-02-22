import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";

export default function TimeAndroid({ date, setDate }) {
  const [fecha, setFecha] = useState(new Date(date));
  const [showA, setShowA] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    let dt = new Date();
    let h = dt.getHours(),
      m = dt.getMinutes();
    let _time = h > 12 ? h - 12 + ":" + m + " p.m" : h + ":" + m + " a.m";
    setText(_time);
  }, []);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || fecha;
    setShowA(Platform.OS === "ios");
    setDate(currentDate);
    setFecha(currentDate);
  };

  return (
    <View style={styles.container}>
      {showA ? (
        <DateTimePicker
          value={fecha}
          mode={"time"}
          is24Hour={false}
          onChange={onChange}
          style={styles.dateTimeS}
        />
      ) : (
        <TouchableOpacity
          style={styles.horaContainer}
          onPress={() => setShowA(true)}
        >
          <Text style={styles.horaText}> {moment(fecha).format("LT")}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
  },
  horaContainer: {
    backgroundColor: "#00000010",
    width: 110,
    borderRadius: 7,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  horaText: {
    fontSize: 17,
  },
});
