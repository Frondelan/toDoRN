import React, { useEffect, useState } from "react";
import { TouchableOpacity, StyleSheet, Image, View, Text } from "react-native";
import TodoList from "../components/TodoList";
import { todosData } from "../data/todos";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { hideCompletedReducer, setTodosReducer } from "../redux/todosSlice";

export default function Home() {
  const navigation = useNavigation();
  const todos = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    const getTodos = async () => {
      try {
        const todos = await AsyncStorage.getItem("@Todos");
        if (todos !== null) {
          dispatch(setTodosReducer(JSON.parse(todos)));
        }
      } catch (e) {
        console.log(e);
      }
    };
    getTodos();
  }, []);

  const [isHidden, setIsHidden] = useState(false);

  const handleHidePress = async () => {
    if (isHidden) {
      setIsHidden(false);
      const todos = await AsyncStorage.getItem("@Todos");
      if (todos !== null) {
        dispatch(setTodosReducer(JSON.parse(todos)));
      }
      return;
    }
    setIsHidden(!isHidden);
    dispatch(hideCompletedReducer());
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://images.pexels.com/photos/5736660/pexels-photo-5736660.jpeg?auto=compress&cs=tinysrgb&h=650&w=940 940w, https://images.pexels.com/photos/5736660/pexels-photo-5736660.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260 1260w, https://images.pexels.com/photos/5736660/pexels-photo-5736660.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940 1880w, https://images.pexels.com/photos/5736660/pexels-photo-5736660.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260 2520w",
        }}
        style={styles.pic}
      />
      <View style={styles.containText}>
        <Text style={styles.title}>Today</Text>
        <TouchableOpacity onPress={handleHidePress}>
          <Text style={styles.hideText}>
            {isHidden ? "Show compleated" : "Hide compleated"}
          </Text>
        </TouchableOpacity>
      </View>

      <TodoList todosData={todos.filter((todo) => todo.isToday)} />

      <Text style={styles.title}>Tomorrow</Text>
      <TodoList todosData={todos.filter((todo) => !todo.isToday)} />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Add")}
      >
        <Text style={styles.plus}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 60,
    paddingHorizontal: 15,
  },
  pic: {
    width: 47,
    height: 47,
    borderRadius: 25,
    alignSelf: "flex-end",
  },
  containText: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 25,
    marginTop: 10,
  },
  hideText: {
    color: "#3478f6",
  },
  button: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: "#000",
    position: "absolute",
    bottom: 50,
    right: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  plus: {
    fontSize: 40,
    color: "#fff",
    top: -5,
    left: 10.5,
  },
});
