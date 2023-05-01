import React, { useState } from "react";
import {
  View,
  StyleSheet,
  CheckBox,
  TouchableOpacity,
  Modal,
  Dimensions,
} from "react-native";
import { Text, TouchableRipple } from "react-native-paper";
import { Icon, Button } from "react-native-elements";

export default function todo({
  index,
  todos,
  todo,
  onSelect,
  navigation,
  setTodos,
}) {
  const [showModal, setShowModal] = React.useState(false);

  const handleSelectChange = (value) => {
    onSelect(index, todo, value);
  };

  const handleDeleteTodo = () => {
    const newTodoList = [...todos];
    newTodoList.splice(index, 1);
    setShowModal(false);
    setTodos(newTodoList);
  };

  const handleShowModal = (index) => {
    setShowModal(true);
  };

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  console.log(windowHeight, windowWidth);

  return (
    <View style={styles.container}>
      <CheckBox
        value={todo.status}
        onValueChange={handleSelectChange}
        style={styles.checkbox}
      />
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableRipple
          onPress={() => navigation.navigate("todoDetails", { todo: todo })}
        >
          <View>
            <Text style={styles.text}>{todo.title}</Text>
          </View>
        </TouchableRipple>
        <TouchableOpacity onPress={handleShowModal}>
          <Icon name="delete" color="#FF0000" />
        </TouchableOpacity>
      </View>
      <Modal
        style={styles.modalStyle}
        animationType="fade"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <Text style={styles.modalText}>Are you sure to Delete ?</Text>
            <View style={styles.modalButtons}>
              <Button title="No" onPress={() => setShowModal(false)} />
              <Button
                title="Yes"
                onPress={handleDeleteTodo}
                buttonStyle={styles.deleteButton}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 30,
    margin: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    marginLeft: 10,
  },
  modalStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: Dimensions.get("window").width,
  },
  modal: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  deleteButton: {
    backgroundColor: "#F00000",
  },
});
