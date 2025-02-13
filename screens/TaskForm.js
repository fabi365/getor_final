import React, { useState, useEffect } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { globalStyles } from "../styles/globalStyles";

export default function TaskForm({ route, navigation }) {
  const { task, onSave } = route.params || {}; 
  const [text, setText] = useState(task ? task.text : ""); 

  useEffect(() => {
    if (task) {
      navigation.setOptions({
        title: "Editar Tarea", 
      });
    } else {
      navigation.setOptions({
        title: "Agregar Tarea", 
      });
    }
  }, [task, navigation]);

  const handleSave = () => {
    if (text.trim()) {
      if (task) {
        // Editar tarea
        onSave(task.id, text);
      } else {
        // Nueva tarea
        const newTask = { id: Date.now().toString(), text, completed: false };
        onSave(newTask.text);
      }
      navigation.goBack(); 
    }
  };

  return (
    <View style={globalStyles.container}>
      <TextInput
        style={globalStyles.input}
        placeholder="Escribe una nueva tarea"
        value={text}
        onChangeText={setText}
      />
      <TouchableOpacity style={globalStyles.button} onPress={handleSave}>
        <Text style={globalStyles.buttonText}>
          {task ? "Actualizar Tarea" : "Agregar Tarea"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}


