import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const SettingsPage = ({navigation}) => {
  const handleLogout = () => {
    navigation.navigate('LoginScreen');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Settings</Text>
      
      <TouchableOpacity style={styles.button}>
        <Text style={styles.optionText}>Account Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.optionText}>Notifications</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.optionText}>Privacy</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.optionText}>About</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.option, styles.logoutButton]} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5DC',
  },
  header: {
    fontSize: 22,
    fontWeight: 'normal',
    marginBottom: 10,
    paddingLeft: 10, 
    paddingTop: 10,
    fontFamily: ''
  },
  option: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#A8DADC',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 50,
    // width: '48%',
    marginTop: 10,
  },
  optionText: {
    fontSize: 16,
  },
  logoutButton: {
    marginTop: 40,
    backgroundColor: '#FF0000',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  logoutButtonText: {
    color: '#F5F5DC',
    fontSize: 16,
    fontWeight: 'bold',
    paddingVertical: 8,
  },
});

export default SettingsPage;
