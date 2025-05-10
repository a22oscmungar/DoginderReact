import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import Swiper from 'react-native-deck-swiper';

const SCREEN_WIDTH = Dimensions.get('window').width;

const dummyUsers = [
  {
    name: 'Lucía',
    age: 25,
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
  },
  {
    name: 'Marcos',
    age: 28,
    image: 'https://randomuser.me/api/portraits/men/2.jpg',
  },
  {
    name: 'Elena',
    age: 22,
    image: 'https://randomuser.me/api/portraits/women/3.jpg',
  },
];

export default function SwipeScreen() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const obtenerUbicacion = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setErrorMsg('Permiso denegado');
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
    };

    obtenerUbicacion();
  }, []);

  if (errorMsg) {
    return <Text>{errorMsg}</Text>;
  }

  if (!location) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text>Obteniendo ubicación...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Usuarios cerca de ti</Text>
      <Swiper
        cards={dummyUsers}
        renderCard={(user) => (
          <View style={styles.card}>
            <Image source={{ uri: user.image }} style={styles.image} />
            <Text style={styles.name}>{user.name}, {user.age}</Text>
          </View>
        )}
        backgroundColor="transparent"
        stackSize={3}
        cardIndex={0}
        infinite
        showSecondCard
        animateCardOpacity
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    width: SCREEN_WIDTH - 40,
    height: 800,
    backgroundColor: '#f8f8f8',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 320,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    marginVertical: 10,
  },
});
