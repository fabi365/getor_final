import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function TaskItem({ task, onEdit, onDelete, onToggle }) {
  return (
    <View style={styles.taskItem}>
      <TouchableOpacity onPress={onToggle} style={styles.textContainer}>
        <Text style={[styles.taskText, task.completed && styles.completedTask]}>
          {task.text}
        </Text>
      </TouchableOpacity>
      
      {/* Contenedor para los botones */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={onEdit}>
          <Text style={styles.editText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete}>
          <Text style={styles.deleteText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  taskItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    flexDirection: "row", 
    alignItems: "center",
    justifyContent: "space-between", 
  },
  textContainer: {
    flex: 1, 
  },
  taskText: {
    fontSize: 16,
  },
  completedTask: {
    textDecorationLine: "line-through", 
    color: "gray",
  },
  buttonContainer: {
    flexDirection: "row", 
    alignItems: "center", 
  },
  editText: {
    color: "blue",
    marginRight: 10, 
  },
  deleteText: {
    color: "red",
  },
});
