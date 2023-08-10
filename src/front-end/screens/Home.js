import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';

import TopBar from '../components/TopBar';
import NavBar from '../components/NavBar';


const Home = ({ route, navigation }) => {

  const {userEmail} = route.params;
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = 'http://192.168.1.6:3000';

  useEffect(() => {
    handleUserData();
}, []);

const handleUserData = () => {
  fetch(`${API_URL}/fetchUserData/${encodeURIComponent(userEmail)}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      console.log("Server Response:", JSON.stringify(res));
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(`Server responded with status: ${res.status}`);
      }
    })
    .then((data) => {
      console.log("Fetched Data:", JSON.stringify(data));
      setUserData(data);
    })
    .catch((err) => {
      console.error("Error during fetch:", JSON.stringify(err));
    })
    .finally(() => {
      setLoading(false);
    });
};


  if (loading) {
    return <Text>Loading...</Text>;
}

const userId = userData.id; //pass it on for progress database access
  

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <TopBar />
        {/* Content */}
        <View style= {styles.content}>
        <Text style={styles.header}>Selamat datang di Aplikasi Terapi Karla!</Text>
        <Text style={styles.subheader}>Apa yang ingin Anda lakukan hari ini?</Text>
        </View>
      </ScrollView>
      <NavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5DC',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    marginTop: 20
  },
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
  header: {
    fontSize: 22,
    fontWeight: 'normal',
    marginBottom: 10,
    paddingLeft: 30, 
    paddingTop: 10,
    fontFamily: ''
  },
  subheader: {
    paddingLeft: 30, 
    fontSize: 18, 
    fontWeight: 'normal', 
    marginBottom: 20
  },
  row: {
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginBottom: 50
  },
  column: {
    flex: 1, 
    flexDirection: 'column', 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  topButton: {
    paddingTop: 8, 
    alignItems: 'center', 
    backgroundColor: '#A8DADC', 
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    width: '48%'
  },
  otherButton: {
    paddingTop: 8, 
    alignItems: 'center', 
    backgroundColor: '#A8DADC', 
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    width: '48%',
    marginTop: 20
  },
  icon: {
    width: 95, 
    height: 95, 
    marginRight: 8
  }
});


export default Home;
