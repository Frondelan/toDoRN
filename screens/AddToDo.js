import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Switch,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import TimeAndroid from "../components/TimeAndroid";
import { useDispatch, useSelector } from "react-redux";
import { addTodoReducer } from "../redux/todosSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function AddToDo() {
  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date());
  const [isToday, setIsToday] = useState(false);
  const listTodos = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const userPhone = Platform.OS === "ios" ? "IOS" : "ANDROID";

  //CAMBIAR FORMA DE ID
  const addTodo = async () => {
    const newTodo = {
      id: Math.floor(Math.random() * 1000000),
      text: name,
      hour: date.toString(),
      isToday: isToday,
      isCompleted: false,
    };
    try {
      await AsyncStorage.setItem(
        "@Todos",
        JSON.stringify([...listTodos, newTodo])
      );
      dispatch(addTodoReducer(newTodo));
      // console.log("Todo saved");
      navigation.goBack();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Task</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Name</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Task"
          placeholderTextColor="#00000030"
          onChangeText={(text) => {
            setName(text);
          }}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Hour</Text>
        {userPhone == "IOS" ? (
          <DateTimePicker
            value={date}
            mode={"time"}
            is24Hour={false}
            onChange={(event, selectedDate) => setDate(selectedDate)}
            style={styles.dateTimeS}
          />
        ) : (
          <TimeAndroid date={date} setDate={setDate} isToday={isToday} />
        )}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Today</Text>
        <Switch
          value={isToday}
          onValueChange={(value) => {
            setIsToday(value);
          }}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={addTodo}>
        <Text style={styles.textButton}>Done</Text>
      </TouchableOpacity>
      <Text style={styles.lastLabel}>
        If you disable today, the task will be considered as tomorrow.
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8FA",
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 35,
  },
  inputContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingBottom: 30,
  },
  inputTitle: {
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 24,
  },
  textInput: {
    borderBottomColor: "#00000030",
    borderBottomWidth: 1,
    width: "80%",
  },
  dateTimeS: {
    width: "80%",
  },
  // horaContainer: {
  //   backgroundColor: "#00000010",
  //   width: "32%",
  //   borderRadius: 7,
  //   height: 35,
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  // horaText: {
  //   fontSize: 17,
  // },
  button: {
    marginTop: 30,
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000000",
    height: 46,
    borderRadius: 11,
  },
  textButton: {
    color: "#fff",
  },
  lastLabel: {
    color: "#00000060",
  },
});
