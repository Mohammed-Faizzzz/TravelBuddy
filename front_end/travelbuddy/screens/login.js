import React, { useState } from 'react';
import { ImageBackground, View, Text, StyleSheet, TouchableOpacity, TextInput, Platform } from 'react-native';

// const API_URL = Platform.OS === 'ios' ? 'http://localhost:3000' : 'http://10.0.2.2:3000';

const API_URL = 'http://192.168.4.168:3000';

const LoginScreen = ({ navigation }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleLogin = () => {
    const payload = {
        email,
        password,
    };
    console.log(payload);
    console.log(`${API_URL}/login`);
    fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
    })
    .then(async res => { 
        try {
            const jsonRes = await res.json();
            if (res.status !== 200) {
                setIsError(true);
                setMessage(jsonRes.message);
            } else {
                // onLoggedIn(jsonRes.token);
                setIsError(false);
                setMessage(jsonRes.message);
                navigation.navigate('PatientHome', email);
            }
        } catch (err) {
            console.log(err);
        };
    })
    .catch(err => {
        console.log(err);
    });
  };

  const goToSignUpPage = () => {
    navigation.navigate('SignupScreen');
  };

  return (
    <ImageBackground source={require('../public/images/horizontal.jpeg')} style={styles.image}>
        <View style={styles.card}>
            <Text style={styles.heading}>{'Login'}</Text>
            <View style={styles.form}>
                <View style={styles.inputs}>
                    <TextInput style={styles.input} placeholder="Email" autoCapitalize="none" onChangeText={setEmail}></TextInput>
                    <TextInput secureTextEntry={true} style={styles.input} placeholder="Password" onChangeText={setPassword}></TextInput>
                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={goToSignUpPage}>
                    <Text style={styles.signUpLink}>Don't have an account? Sign up</Text>
                    </TouchableOpacity>
                </View>    
            </View>
        </View>
    </ImageBackground>
);
};

const styles = StyleSheet.create({
    image: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },  
    card: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        width: '70%',
        marginTop: '10%',
        borderRadius: 20,
        maxHeight: 190,
        // paddingBottom: '5%',
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: '10%',
        marginTop: '10%',
        // marginBottom: '10%',
        color: 'black',
    },
    form: {
        flex: 1,
        marginTop: '5%',
        justifyContent: 'space-between',
        // paddingBottom: '10%',
    },
    inputs: {
        width: '100%',
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
        // paddingBottom: '5%',
    },  
    input: {
        width: '80%',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        paddingTop: 10,
        fontSize: 16, 
        minHeight: 30,
    },
    button: {
        width: '70%',
        backgroundColor: 'black',
        height: 35,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 45,
        marginBottom: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '400'
    },
    message: {
        fontSize: 16,
        marginTop: '2%',
        marginBottom: '2%',
    },
});

export default LoginScreen;