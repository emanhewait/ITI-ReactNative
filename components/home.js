import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, TextInput, Pressable, Text } from 'react-native';
import ToDos from './todos';
import Divider from "./divider";
import Filter from "./filter";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function home(navigation) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [todos, setTodos] = useState([]);
    const [filteredTodos, setFilteredTodos] = useState([]);

    const handleTodoSelect = (index, todo, isSelected) => {
        const updatedItem = [...todos];
        updatedItem[index].status = isSelected;
        setTodos(updatedItem);
        setFilteredTodos(updatedItem);
    };

    const save = () => {
        const newTodos = { title, description, status: false };
        setTodos([...todos, newTodos]);
        setTitle("");
        setDescription("");
    }

    const readData = async () => {
        try {
            const value = await AsyncStorage.getItem('todos');
            console.log(value)
            if (value) {
                setTodos(JSON.parse(value));
                setFilteredTodos(JSON.parse(value));
            }
        } catch (error) {
            console.log(error);
        }
    };

    const saveData = async () => {
        try {
            await AsyncStorage.setItem('todos', JSON.stringify(todos))
            setFilteredTodos(todos);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        readData();
    }, [])
    useEffect(() => {
        saveData();
    }, [todos]);


    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={setTitle}
                value={title}
                placeholder="Enter the Title"
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                onChangeText={setDescription}
                value={description}
                placeholder="Enter the Description"
                keyboardType="numeric"
            />
             <Pressable style={styles.button} 
                  onPress={save}>
                <Text style={styles.text}>Add</Text>
            </Pressable>
            <Divider />
            <View>
                <Filter todos={todos} setFilteredTodos={setFilteredTodos}></Filter>
            </View>
            <Divider />

            <View>
                <ToDos todos={filteredTodos} navigation={navigation.navigation} handleTodoSelect={handleTodoSelect} setTodos={setTodos}></ToDos>
            </View>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: '10px',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 2,
        borderColor: '#C85C8E',
        borderRadius: 25 , 
        padding: '10px',
        width: 400,
        marginLeft:500,
    },
    Button: {
        backgroundColor: '#fff',
    },
    button: {
        alignContent:'center',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 4,
        backgroundColor:'#C85C8E',
        width:100,
        marginLeft:650,
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },

});
