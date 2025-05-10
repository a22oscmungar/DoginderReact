import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert  } from 'react-native';
import { useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        Alert.alert('Campos vacíos', 'Por favor, completa todos los campos');
        return;
      }

      const response = await axios.post('http://192.168.1.48:3745/login', {
        mailUsu: email,
        passUsu: password,
      });

      if (response.status === 200 && response.data) {
        const user = response.data;

        // Guardar en AsyncStorage
        await AsyncStorage.setItem('user', JSON.stringify(user));
        console.log('Usuario guardado en AsyncStorage:', user);

        // Navegar a la pantalla de perfil
        navigation.navigate('main', { user });
      } else {
        Alert.alert('Error', 'Credenciales incorrectas');
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo conectar con el servidor');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/banner_sin_back.png')} style={styles.banner} />
      <Text style={styles.title}>Iniciar Sesión</Text>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.registerText}>¿No tienes cuenta? Regístrate</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Correo electrónico</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Introduce tu correo" 
        keyboardType="email-address" 
        value={email} 
        onChangeText={setEmail} 
      />

      <Text style={styles.label}>Contraseña</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Introduce tu contraseña" 
        secureTextEntry 
        value={password} 
        onChangeText={setPassword} 
      />

      <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>Iniciar sesión</Text>
      </TouchableOpacity>

      <Image source={require('../assets/rastro_huellas.png')} style={styles.huellas} />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingTop: 20,
  },
  banner: {
    width: '100%',
    height: 120,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FF6600',
  },
  registerText: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
    color: '#FF6600',
  },
  label: {
    alignSelf: 'flex-start',
    marginLeft: 40,
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
  },
  input: {
    width: '80%',
    height: 50,
    borderBottomWidth: 2,
    borderBottomColor: '#FF6600',
    fontSize: 16,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  forgotPassword: {
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
    color: '#FF6600',
  },
  loginButton: {
    backgroundColor: '#FF6600',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    alignItems: 'center',
  },
  loginText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  huellas: {
    //position: 'absolute',
    bottom: 30,
    right: -20,
    width: 450,
    height: 450,
    resizeMode: 'contain',
    rotation: '50deg',
  },
});

export default LoginScreen;
