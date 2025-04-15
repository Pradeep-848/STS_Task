import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    };
    loadUser();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Home</Text>

      {user ? (
        <View>
          <Text style={styles.label}>Employee Name: {user.EmpName}</Text>
          <Text style={styles.label}>Employee ID: {user.EmpID}</Text>
        </View>
      ) : (
        <Text>Loading user data</Text>
      )}
    </View>
  );
};

export default Home;

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
  label: {
    fontSize: 18,
    marginBottom: 12,
    color: '#333',
  },
});
