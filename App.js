import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ToolbarAndroidBase } from 'react-native';
import { Button } from 'react-native';
import { StyleSheet, Text, View, FlatList, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Header from './components/header';
import ToDoItem from './components/todoitems';
import AddToDo from './components/addtodo';



export default function App() {
  const [todos, setTodos] = useState([
    {text: "Buy coffee", key:1},
    {text: "Create an app", key:2},
    {text: "Finish revising chinese", key:3}
  ]);

  const pressHandler = (key) => {
    setTodos((prevTodos) => {
      return prevTodos.filter(todo => todo.key != key);
    })
  }

  const submitHandler = (text) => {

    if(text.length > 3){
    setTodos((prevTodos) => {
      return [
        { text: text, key: Math.random},
        ...prevTodos
      ];
    });
    }
    else{
      Alert.alert("Oops!", "To-Dos must be at least 3 characters long", [
        {text:"Understood", onPress: () => console.log("Alert closed")}
      ]);
    }
  }


  return (    
    <TouchableWithoutFeedback onPress = {() => {
      Keyboard.dismiss();
      console.log("Dismissed Keyboard")
    }}>
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <AddToDo submitHandler={submitHandler}/>
        <View style={styles.list}>
          <FlatList
          data={todos}
          renderItem={({ item }) => (
            <ToDoItem item={item} pressHandler={pressHandler}/>
          )}
          />
        </View>
      </View>  
    </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#fff',
  },
  content: {
    padding: 40,
    flex: 1

  },
  list: {
    marginTop: 20,
    flex: 1
  }
});