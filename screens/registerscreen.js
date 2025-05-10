import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from "react-native";
import { RadioButton } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";

const RegisterScreen = () => {
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [genero, setGenero] = useState("");
  const [edad, setEdad] = useState("");
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      {/* Nombre y Apellidos */}
      <Text>Nombre</Text>
      <TextInput style={styles.input} value={nombre} onChangeText={setNombre} />

      <Text>Apellidos</Text>
      <TextInput style={styles.input} value={apellidos} onChangeText={setApellidos} />

      {/* Correo */}
      <Text>Correo Electrónico</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />

      <Text>Confirmar Correo</Text>
      <TextInput style={styles.input} value={confirmEmail} onChangeText={setConfirmEmail} keyboardType="email-address" />

      {/* Contraseña */}
      <Text>Contraseña</Text>
      <TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />

      <Text>Confirmar Contraseña</Text>
      <TextInput style={styles.input} value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />

      {/* Género */}
      <Text>Género</Text>
      <RadioButton.Group onValueChange={(value) => setGenero(value)} value={genero}>
        <View style={styles.radioContainer}>
          <RadioButton.Item label="Hombre" value="Hombre" />
          <RadioButton.Item label="Mujer" value="Mujer" />
          <RadioButton.Item label="Otro" value="Otro" />
        </View>
      </RadioButton.Group>

      {/* Edad */}
      <Text>Edad</Text>
      <TextInput style={styles.input} value={edad} onChangeText={setEdad} keyboardType="numeric" />

      {/* Imagen */}
      <Text>Foto de Perfil</Text>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Seleccionar Imagen</Text>
      </TouchableOpacity>

      {/* Botón de Siguiente */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Siguiente</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = {
  input: {
    borderWidth: 1,
    borderColor: "#FF8C00",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  radioContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#FF8C00",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginBottom: 10,
  },
};

export default RegisterScreen;
