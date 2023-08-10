import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import ProgressBar from "./ProgressBar";


const NavBar = () => {
    
    return (
    
    <View
      style={styles.navbar}
    >    
      {/* Clickable Buttons */}
      <View style= {styles.buttonContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('MyProgress', {userId: userId, userEmail: userEmail})} style = {styles.button}>
      <Image
            source={require('../assets/home.png')}
            style={{width: 25, 
              height: 30, 
            }}
          />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('MyProgress', {userId: userId, userEmail: userEmail})} style = {styles.button}>
      <Image
            source={require('../assets/newPost.png')}
            style={{width: 25, 
              height: 25, 
            }}
          />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('MyProgress', {userId: userId, userEmail: userEmail})} style = {styles.button}>
      <Image
            source={require('../assets/profile-user.png')}
            style={{width: 25, 
              height: 25, 
            }}
          />
      </TouchableOpacity>
      </View>
    </View>
    );
}

const styles = StyleSheet.create({
    navbar: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      height: 50,
      backgroundColor: '#FAEDCD',
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    buttonContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 16,
      flex: 1, // Add flex: 1 to expand the container to the full width
    },
    button: {
      alignSelf: 'center', // Center the individual buttons within the container
      marginHorizontal: 50, // Add some horizontal margin between the buttons
    },
  });

export default NavBar;