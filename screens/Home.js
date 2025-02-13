import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, ImageBackground } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import TaskItem from "../components/TaskItem";

export default function Home({ navigation }) {
  const [tasks, setTasks] = useState([]);

  // Función para agregar una nueva tarea
  const addTask = (task) => {
    setTasks([...tasks, { id: Date.now().toString(), text: task, completed: false }]);
  };

  // Función para editar una tarea
  const editTask = (id, newText) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, text: newText } : task)));
  };

  // Función para eliminar una tarea
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Función para marcar una tarea como completada o pendiente
  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  return (
    <ImageBackground
      source={require('../assets/background.jpg')} 
      style={globalStyles.container} 
    >
      {/* Capa opaca sobre la imagen de fondo */}
      <View style={styles.overlay} />

      <Text style={globalStyles.title}>Bienvenidos a tu administrador de tareas</Text>

      <Text style={globalStyles.title}>Lista de Tareas</Text>

      {/* Tareas Pendientes */}
      <Text style={globalStyles.sectionTitle}>Tareas Pendientes</Text>
      <FlatList
        data={tasks.filter((task) => !task.completed)} 
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onEdit={() => navigation.navigate("TaskForm", { task: item, onSave: editTask })}
            onDelete={() => deleteTask(item.id)}
            onToggle={() => toggleTaskCompletion(item.id)}
          />
        )}
        keyExtractor={(item) => item.id}
      />

      {/* Tareas Completadas */}
      <Text style={globalStyles.sectionTitle}>Tareas Completadas</Text>
      <FlatList
        data={tasks.filter((task) => task.completed)} 
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onEdit={() => navigation.navigate("TaskForm", { task: item, onSave: editTask })}
            onDelete={() => deleteTask(item.id)}
            onToggle={() => toggleTaskCompletion(item.id)}
          />
        )}
        keyExtractor={(item) => item.id}
      />

      {/* Botón para agregar una nueva tarea */}
      <TouchableOpacity
        style={globalStyles.button}
        onPress={() => navigation.navigate("TaskForm", { task: null, onSave: addTask })}
      >
        <Text style={globalStyles.buttonText}>Agregar Tarea</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

// Estilo para la capa opaca
const styles = {
  overlay: {
    position: "absolute",  
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(192, 247, 224, 0.7)", 
  },
};
