import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import ProgressBar from 'react-native-progress/Bar';

const NewTodo = ({ navigation }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleAddTodo = () => {
    setIsLoading(true);

    axios.post('http://localhost:4000/todos/new', {
      title: name,
      description: description,
    }, {
      onUploadProgress: progressEvent => {
        setProgress(progressEvent.loaded / progressEvent.total);
      },
    })
    .then(() => {
      setIsLoading(false);
      navigation.navigate('Home');
    })
    .catch(error => {
      console.error(error);
      setIsLoading(false);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Todo</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={[styles.input, {height: 100}]}
          multiline
          numberOfLines={4}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTodo}>
          <Text style={styles.addButtonLabel}>Add Todo</Text>
        </TouchableOpacity>
        {isLoading && (
          <View style={styles.progress}>
            <ProgressBar
              progress={progress}
              width={250}
              color="dodgerblue"
              unfilledColor="#F5F5F5"
              borderColor="#F5F5F5"
              height={10}
              borderRadius={5}
            />
            <Text style={styles.progressText}>
              {Math.round(progress * 100)}%
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
    fontWeight: 'bold',
    color: 'dodgerblue',
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: '100%',
    fontSize: 18,
    backgroundColor: '#F5F5F5',
  },
  addButton: {
    backgroundColor: 'dodgerblue',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginTop: 20,
  },
  addButtonLabel: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  progress: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
});

export default NewTodo;
