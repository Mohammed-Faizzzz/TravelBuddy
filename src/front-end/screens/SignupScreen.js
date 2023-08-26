import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Button } from 'react-native';

const API_URL = 'http://127.0.0.1:3000';

const SignupScreen = ({navigation}) => {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [dateofbirth, setDateOfBirth] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setconfirmPassword] = useState('');

  const handleInputChange = (text, inputField) => {
    switch (inputField) {
      case 'firstname':
        setFirstName(text);
        break;
      case 'lastname':
        setLastName(text);
        break;
      case 'dateofbirth':
        setDateOfBirth(text);
        break;
      case 'username':
        setUsername(text);
        break;
      case 'password':
        setPassword(text);
        break;
      case 'confirmpassword':
        setconfirmPassword(text);
        break;
      default:
        break;
    }
  };

  const handleGenderSelect = (selectedGender) => {
    setGender(selectedGender);
  };

  const handleSubmit = () => {
    const payload = {
      firstname,
      lastname,
      gender: gender,
      dateofbirth: new Date (dateofbirth),
      username,
      password,
      confirmpassword,
    };

    console.log('Form submitted');
    console.log('Form values:', {
      firstname,
      lastname,
      gender: gender,
      dateofbirth,
      username,
      password,
      confirmpassword,
    });
  
    // Use the fetch API to send the data to the server
    console.log(`${API_URL}/login`);
    fetch(`${API_URL}/signup`, { 
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
    })
    .then(async res => { 
      console.log('signing up');
      // console.log('Response:', res);
      try {
        const jsonRes = await res.json();
        if (res.status !== 200) {
          setIsError(true); 
          setMessage(jsonRes.message);
        } else {
          setIsError(false);
          setMessage(jsonRes.message);
          navigation.navigate('LoginScreen');
        }
      } catch (err) {
        console.log(err);
      };
    })
    .catch(err => {
      console.log(err);
    });

    // navigation.navigate('LoginScreen');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>TravelBuddy: Signup</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          placeholderTextColor="#888"
          value={firstname}
          onChangeText={(text) => handleInputChange(text, 'firstname')}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          placeholderTextColor="#888"
          value={lastname}
          onChangeText={(text) => handleInputChange(text, 'lastname')}
        />
        {/* Gender */}
        <View style={styles.genderContainer}>
          <TouchableOpacity
            style={[
              styles.genderButton,
              gender === 'male' && styles.selectedGenderButton,
            ]}
            onPress={() => handleGenderSelect('male')} 
          >
            <Text style={styles.genderButtonText}>Male</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.genderButton,
              gender === 'female' && styles.selectedGenderButton,
            ]}
            onPress={() => handleGenderSelect('female')}
          >
            <Text style={styles.genderButtonText}>Female</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Date of Birth"
          placeholderTextColor="#888"
          value={dateofbirth}
          onChangeText={(text) => handleInputChange(text, 'dateofbirth')}
        />
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#888"
          value={username}
          onChangeText={(text) => handleInputChange(text, 'username')}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#888"
          value={password}
          onChangeText={(text) => handleInputChange(text, 'password')}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#888"
          value={confirmpassword}
          onChangeText={(text) => handleInputChange(text, 'confirmpassword')}
        />
        {/* submit button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#FEFAE0',
  },
  header: {
    fontSize: 24,
    fontWeight: 'normal',
    marginBottom: 20,
  },
  form: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  genderButton: {
    backgroundColor: '#FEFAE0',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    width: '48%',
  },
  selectedGenderButton: {
    backgroundColor: '#FAEDCD',
    borderWidth: 0,
  },
  genderButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'normal',
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: '#FAEDCD',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  submitButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'normal',
    textAlign: 'center',
  },
});

export default SignupScreen;
