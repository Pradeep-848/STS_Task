import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useState } from 'react';
import { StyleSheet,Text,TextInput,TouchableOpacity,SafeAreaView,Alert } from 'react-native';

const AuthScreen = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [empID, setEmpID] = useState('');
  const [password, setPassword] = useState('');
  const [empName, setEmpName] = useState('');
  const [department, setDepartment] = useState('');

  const navigate = useNavigation();
  const ip = "http://192.168.0.3:2018";

  const handleLogin = async () => {
  if (!empID || !password) {
    Alert.alert('validation Error', 'please fill all fields');
    return;
  }

  try {
    const response = await axios.get(`${ip}/login`, {
      params: {
        empID, password,
      },
    });

    if (response.data && response.data.EmpID) {
      await AsyncStorage.setItem('user', JSON.stringify(response.data));

      //console.log('Login success:', response.data);
      Alert.alert('success', 'Login successful!');
      navigate.navigate("Home");
    } else {
      Alert.alert('login failed', 'id or password is incorrect');
    }
  } catch (error) {
    //console.error('Login error:', error);
    Alert.alert('Error', 'Server error or network issue');
  }

};

  const handleRegister = async () => {
    if (!empID || !password || !empName || !department) {
      Alert.alert('Please fill in all fields');
      return;
    }

    try {
      const response = await axios.post(`${ip}/register`, null, {
        params: {
          empID, password, empName, department,
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      Alert.alert('Success', response.data.message || 'Registered successfully!');
      setIsLogin(true); 
    } catch (error) {
      Alert.alert('Error', error?.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{isLogin ? 'Login' : 'Register'}</Text>

      {!isLogin && (
        <>
          <TextInput style={styles.input} placeholder="Employee Name" 
          value={empName} onChangeText={setEmpName} />

          <TextInput style={styles.input} placeholder="Department" 
          value={department} onChangeText={setDepartment} />
        </>
      )}

      <TextInput style={styles.input} placeholder="Employee ID" 
      value={empID} onChangeText={setEmpID} />

      <TextInput style={styles.input} placeholder="Password" 
      value={password} onChangeText={setPassword} secureTextEntry />

      <TouchableOpacity style={styles.button}
        onPress={isLogin ? handleLogin : handleRegister} >
        <Text style={styles.buttonText}> {isLogin ? 'Login' : 'Register'} </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
        <Text style={styles.switchText}>
          {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 16,
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  switchText: {
    color: '#333',
    textAlign: 'center',
  },
});
