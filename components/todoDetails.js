import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { color } from 'react-native-elements/dist/helpers';

export default function todoDetails({ navigation, route }) {
    const { todo } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Title :-  {todo.title}</Text>
            <Text style={styles.description}>Description :-  {todo.description}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: '10px',
    },
    title: {
        fontSize: 30,
        color:'#9D3C72',
        paddingTop:40,
        paddingLeft:100,
    },
    description: {
        fontSize: 24,
        color:'#9D3C72',
        paddingLeft:100,
    }
});