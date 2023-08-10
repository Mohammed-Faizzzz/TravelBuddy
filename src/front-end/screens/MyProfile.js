import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import axios from 'axios';

const MyProfile = ({ route, navigation }) => {
  const { userData, userId, userEmail } = route.params;

  useEffect(() => {
    console.log(userData);
  }, []);

  const formatUserDetails = () => {
    if (!userData) {
      return 'Loading...';
    }

    return (
      <ScrollView style={{ flexGrow: 1, backgroundColor: '#F5F5DC' }}>
            {/* Navigation Bar */}
            <View style={styles.navbar}>
            {/* Company Logo */}
                <Image
                    source={require('../assets/company_logo.png')}
                    style={{ width: 70, height: 70, marginRight: 8, marginLeft: 15 }}
                />
                <View style = {styles.button}>
                        <Text style= {{fontWeight: 'normal', fontSize: 20}}>My Profile</Text>
                </View>
            {/* Clickable Buttons --> yet to create pages for MyProgress, MyProfile, and Settings */}
                <View style= {styles.buttonContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('MyProgress', {userId: userId, userEmail: userEmail})} style = {styles.button}>
                        <Text style= {{fontWeight: 'bold'}}>Help</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('PatientHome', {userEmail: userEmail})} style = {styles.button}>
                        <Text style= {{fontWeight: 'bold'}}>Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('SettingsPage')} style = {styles.button}>
                    <Text style= {{fontWeight: 'bold'}}>Settings</Text>
                    </TouchableOpacity>
                </View>
            </View>
      <View style= {{marginBottom: 50}}>

      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>Name: {userData.firstName} {userData.lastName}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>Gender: {userData.gender}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>Date of Birth: {userData.dateOfBirth}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>Email: {userData.email}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>Phone Number: {userData.phoneNo}</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>Address: {userData.address}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('PatientHome', {userEmail: userEmail})}>
        <Text style={styles.optionText}>Home</Text>
      </TouchableOpacity>
      </View>
      </ScrollView>
    );
  };

  return (
    <ScrollView style={{ flexGrow: 1, backgroundColor: '#F5F5DC' }}>
      {formatUserDetails()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: '#A8DADC',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginRight: 0,
    paddingHorizontal: 16
  },
  button: {
    marginRight: 25
  },
  option: {
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
});

export default MyProfile;
