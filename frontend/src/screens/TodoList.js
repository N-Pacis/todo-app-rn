import axios from 'axios';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import React, {useState, useEffect} from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import { withNavigationFocus } from 'react-navigation';

const TodoList = ({ isFocused, navigation }) => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios.get('http://localhost:4000/todos')
      .then(response => {
        setTodos(response.data.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error(error);
        setIsLoading(false);
      });
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Todo List</Text>
      <FlatList
        style={styles.todoList}
        data={todos}
        keyExtractor={item => item._id.toString()}
        renderItem={({ item }) => (
          <View style={styles.todo}>
            <Text style={styles.todoTitle}>{item.title}</Text>
            <Text style={styles.todoDescription}>{item.description}</Text>
          </View>
        )}
      />
      <TouchableOpacity style={styles.addButton} onPress={()=>navigation.navigate("NewTodo")}>
        <Text style={styles.addButtonLabel}>Add New Todo</Text>
      </TouchableOpacity>
      <Text style={styles.footer}>{todos.length} Todos</Text>
      <Spinner
        visible={isLoading}
        textContent={'Loading...'}
        textStyle={styles.spinnerText}
        color={'dodgerblue'}
        animation={'fade'}
        size={'large'}
        overlayColor={'rgba(0, 0, 0, 0.5)'}
      />
    </View>
  );
}


const styles = StyleSheet.create({
    container: {
      maxWidth: 600,
      marginHorizontal: 'auto',
      padding: 20,
    },
    title: {
      fontSize: 32,
      marginBottom: 20,
    },
    todoList: {
      paddingTop: 10,
      paddingBottom: 20,
    },
    todo: {
      flexDirection: 'column',
      marginBottom: 10,
      padding: 10,
      backgroundColor: '#f5f5f5',
      borderRadius: 5,
    },
    todoTitle: {
      fontSize: 18,
    },
    todoDescription: {
      fontSize: 14,
      marginTop: 5,
      color: '#888',
    },
    addButton: {
      backgroundColor: 'dodgerblue',
      borderRadius: 25,
      paddingVertical: 15,
      paddingHorizontal: 30,
      alignSelf: 'center',
      marginTop: 20,
    },
    addButtonLabel: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    footer: {
      marginTop: 20,
      textAlign: 'center',
      fontSize: 16,
      color: '#888',
    },
    loaderContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 9999,
      alignItems: 'center',
      justifyContent: 'center',
    },
    loader: {
      width: 70,
      height: 70,
      backgroundColor: '#fff',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loaderText: {
      color: '#888',
      marginTop: 10,
      fontSize: 16,
    },
  });
  
export default withNavigationFocus(TodoList);
