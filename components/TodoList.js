import * as React from "react";
import { FlatList, StyleSheet } from "react-native";
import Todo from "./Todo";

export default function TodoList({ todosData }) {
  return (
    <FlatList
      style={styles.container}
      showsVerticalScrollIndicator={false}
      data={todosData}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <Todo {...item} />}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    height: 300,
  },
});
