import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;

const PerfilScreen = () => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const cargarUsuario = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          const parsedUser = JSON.parse(userData);
          setUsuario(parsedUser);
        }
      } catch (error) {
        console.error('Error cargando datos del usuario:', error);
      }
    };

    cargarUsuario();
  }, []);

  if (!usuario) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Cargando perfil...</Text>
      </View>
    );
  }

  const imagenURL = `http://192.168.1.48:3745${usuario.imgProfile}`;
  const perroURL =  `http://192.168.1.48:3745${usuario.foto}`;
  const edadMascota = calcularEdad(usuario.edad);
  const edadHumano = calcularEdad(usuario.edadUsu);

  return (
    <ScrollView style={styles.scroll}>
      <Text style={styles.titulo}>SOBRE TU MASCOTA</Text>

      <View style={styles.imageContainer}>
        <Image
          source={{ uri: perroURL }}
          style={styles.mainImage}
          resizeMode="cover"
        />

        <Text style={styles.nombre}>{usuario.nombre}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Raza:</Text>
        <Text>{usuario.raza}</Text>

        <Text style={styles.label}>Edad:</Text>
        <Text>{edadMascota} años</Text>

        <Text style={styles.label}>Descripción:</Text>
        <Text>{usuario.descripcion}</Text>

        <Text style={styles.label}>Relación con otras mascotas:</Text>
        <Text>{usuario.relacionMascotas}</Text>

        <Text style={styles.label}>Relación con humanos:</Text>
        <Text>{usuario.relacionHumanos}</Text>
        
        <View style={styles.imageContainer}>
        <Image
          source={{ uri: imagenURL }}
          style={styles.mainImage}
          resizeMode="cover"
        />

        <Text style={styles.nombre}>{usuario.nombreUsu}</Text>
      </View>

        <Text style={styles.label}>Edad del humano:</Text>
        <Text>{edadHumano} años</Text>

        <Text style={styles.label}>Género del humano:</Text>
        <Text>{usuario.generoHumano}</Text>
      </View>
    </ScrollView>
  );
};

function calcularEdad(fechaString) {
  if (!fechaString) return '-';
  const hoy = new Date();
  const fechaNacimiento = new Date(fechaString);
  let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
  const mes = hoy.getMonth() - fechaNacimiento.getMonth();
  if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
    edad--;
  }
  return edad;
}

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: '#ffffff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titulo: {
    textAlign: 'center',
    fontSize: 27,
    fontWeight: 'bold',
    paddingVertical: 20,
    backgroundColor: '#FFD59A', // equivalente a naranjaFlojo
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 25,
  },
  mainImage: {
    width: 360,
    height: 500,
    borderRadius: 20,
  },
  nombre: {
    position: 'absolute',
    bottom: 10,
    left: 20,
    fontSize: 40,
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'Poppins-Black', // asegúrate de tener esta fuente
  },
  infoContainer: {
    padding: 20,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 15,
    fontSize: 16,
  },
});

export default PerfilScreen;
