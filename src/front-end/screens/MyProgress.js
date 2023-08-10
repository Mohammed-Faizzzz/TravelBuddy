import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import axios from 'axios';

const API_URL = 'http://192.168.1.6:3000';

const MyProgress = ({ route, navigation }) => {
  const { userId, userEmail } = route.params;

  const [readingProgress, setReadingProgress] = useState(null);
  const [writingProgress, setWritingProgress] = useState(null);
  const [speakingProgress, setSpeakingProgress] = useState(null);
  const [listeningProgress, setListeningProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchProgress('Reading'), fetchProgress('Writing'), fetchProgress('Speaking'), fetchProgress('Listening')])
      .then(() => setLoading(false))
      .catch(err => console.error("Error during fetch:", JSON.stringify(err)));
  }, []);

  const fetchProgress = async (type) => {
    let endpoint = '';
  
    switch (type) {
      case 'Reading':
        endpoint = 'reading-progress';
        break;
      case 'Writing':
        endpoint = 'writing-progress';
        break;
      case 'Speaking':
        endpoint = 'speaking-progress';
        break;
      case 'Listening':
        endpoint = 'listening-progress';
        break;
      default:
        break;
    }
  
    try {
      const response = await fetch(`${API_URL}/${endpoint}/${userId}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      switch (type) {
        case 'Reading':
          setReadingProgress(data);
          break;
        case 'Writing':
          setWritingProgress(data);
          break;
        case 'Speaking':
          setSpeakingProgress(data);
          break;
        case 'Listening':
          setListeningProgress(data);
          break;
        default:
          break;
      }
    } catch (err) {
      console.error(`Error fetching ${type} Progress: ${err}`);
    }
  };
  
  if (loading) {
    return <Text>Loading...</Text>;
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
        <View style={styles.button}>
          <Text style={{ fontWeight: 'normal', fontSize: 20 }}>Progress Report</Text>
        </View>
        {/* Clickable Buttons --> yet to create pages for MyProgress, MyProfile, and Settings */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('MyProgress')} style={styles.button}>
            <Text style={{ fontWeight: 'bold' }}>Help</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('PatientHome', { userEmail: userEmail })} style={styles.button}>
            <Text style={{ fontWeight: 'bold' }}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('SettingsPage')} style={styles.button}>
            <Text style={{ fontWeight: 'bold' }}>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style = {{marginBottom: 50}}>
      <View
          style={{
            margin: 10,
            marginBottom: 50,
            padding: 10,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: '#d3d3d3',
            backgroundColor: '#A8DADC',
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,
            elevation: 4,
          }}
      >
        <Text style={styles.title}>
          Reading Progress:
        </Text>
        {readingProgress && readingProgress.answered && readingProgress.correctAns && readingProgress.result && readingProgress.timeTaken ?(
          <View>
            {readingProgress.answered.map((item, index) => (
              <View
                key={index}
                  style={{
                  margin: 10,
                  padding: 10,
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: '#d3d3d3',
                  backgroundColor: '#F5F5DC',
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.23,
                  shadowRadius: 2.62,
                  elevation: 4,
                }}
              >
              <Text style={styles.subheader}>
                Question Number: {index + 1}
              </Text>
              <Text style={styles.subheader}>
                Selected Option: {item}
              </Text>
              <Text style={styles.subheader}>
                Correct Option: {readingProgress.correctAns[index]}
              </Text>
              <Text style={styles.subheader}>
                Result: {readingProgress.result[index] === "true" ? "Correct" : "Incorrect"}
              </Text>
              <Text style={styles.subheader}>
                Time Taken: {readingProgress.timeTaken[index]}
              </Text>
              </View>
            ))}
          </View>
          ) : (
          <Text style={styles.subheader}>No record found</Text>
          )}
        </View>
{/* writingProgress */}
        <View
          style={{
            margin: 10,
            marginBottom: 50,
            padding: 10,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: '#d3d3d3',
            backgroundColor: '#A8DADC',
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,
            elevation: 4,
          }}
      >
        <Text style={styles.title}>
          Writing Progress:
        </Text>
        {writingProgress && writingProgress.answered && writingProgress.correctAns && writingProgress.result && writingProgress.timeTaken ? (
          <View>
            {writingProgress.answered.map((item, index) => (
              <View
                key={index}
                  style={{
                  margin: 10,
                  padding: 10,
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: '#d3d3d3',
                  backgroundColor: '#F5F5DC',
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.23,
                  shadowRadius: 2.62,
                  elevation: 4,
                }}
              >
              <Text style={styles.subheader}>
                Question Number: {index + 1}
              </Text>
              <Text style={styles.subheader}>
                Selected Option: {item}
              </Text>
              <Text style={styles.subheader}>
                Correct Option: {writingProgress.correctAns[index]}
              </Text>
              <Text style={styles.subheader}>
                Result: {writingProgress.result[index] === "true" ? "Correct" : "Incorrect"}
              </Text>
              <Text style={styles.subheader}>
                Time Taken: {writingProgress.timeTaken[index]}
              </Text>
              </View>
            ))}
          </View>
          ) : (
          <Text style={styles.subheader}>No record found</Text>
          )}
        </View>
{/* speakingProgress */}
      <View
          style={{
            margin: 10,
            marginBottom: 50,
            padding: 10,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: '#d3d3d3',
            backgroundColor: '#A8DADC',
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,
            elevation: 4,
          }}
      >
        <Text style={styles.title}>
          Speaking Progress:
        </Text>
        {speakingProgress && speakingProgress.answered && speakingProgress.correctAns && speakingProgress.result && speakingProgress.timeTaken ?(
          <View>
            {speakingProgress.answered.map((item, index) => (
              <View
                key={index}
                  style={{
                  margin: 10,
                  padding: 10,
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: '#d3d3d3',
                  backgroundColor: '#F5F5DC',
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.23,
                  shadowRadius: 2.62,
                  elevation: 4,
                }}
              >
              <Text style={styles.subheader}>
                Question Number: {index + 1}
              </Text>
              <Text style={styles.subheader}>
                Selected Option: {item}
              </Text>
              <Text style={styles.subheader}>
                Correct Option: {speakingProgress.correctAns[index]}
              </Text>
              <Text style={styles.subheader}>
                Result: {speakingProgress.result[index] === "true" ? "Correct" : "Incorrect"}
              </Text>
              <Text style={styles.subheader}>
                Time Taken: {speakingProgress.timeTaken[index]}
              </Text>
              </View>
            ))}
          </View>
          ) : (
          <Text style={styles.subheader}>No record found</Text>
          )}
        </View>
        {/* listeningProgress */}
        <View
          style={{
            margin: 10,
            marginBottom: 50,
            padding: 10,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: '#d3d3d3',
            backgroundColor: '#A8DADC',
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,
            elevation: 4,
          }}
      >
        <Text style={styles.title}>
          Listening Progress:
        </Text>
        {listeningProgress && listeningProgress.answered && listeningProgress.correctAns && listeningProgress.result && listeningProgress.timeTaken ? (
          <View>
            {listeningProgress.answered.map((item, index) => (
              <View
                key={index}
                  style={{
                  margin: 10,
                  padding: 10,
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: '#d3d3d3',
                  backgroundColor: '#F5F5DC',
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.23,
                  shadowRadius: 2.62,
                  elevation: 4,
                }}
              >
              <Text style={styles.subheader}>
                Question Number: {index + 1}
              </Text>
              <Text style={styles.subheader}>
                Selected Option: {item}
              </Text>
              <Text style={styles.subheader}>
                Correct Option: {listeningProgress.correctAns[index]}
              </Text>
              <Text style={styles.subheader}>
                Result: {listeningProgress.result[index] === "true" ? "Correct" : "Incorrect"}
              </Text>
              <Text style={styles.subheader}>
                Time Taken: {listeningProgress.timeTaken[index]}
              </Text>
              </View>
            ))}
          </View>
          ) : (
          <Text style={styles.subheader}>No record found</Text>
          )}
        </View>
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('PatientHome', {userEmail: userEmail})}>
          <Text style={styles.optionText}>Home</Text>
        </TouchableOpacity>
      </View>
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
    paddingHorizontal: 16,
  },
  button: {
    marginRight: 25,
  },
  title: {
    paddingLeft: 30,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingLeft: 30,
    paddingTop: 30,
  },
  subheader: {
    paddingLeft: 30,
    fontSize: 18,
    fontWeight: 'normal',
    marginBottom: 5,
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

export default MyProgress;
