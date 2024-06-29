import React, { useContext, useState } from "react";
import { Link, router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from "react-native";
import UserContext from "@/contexts/AuthContext";

const RegisterForm = () => {
  const { user, loginHandler: login } = useContext(UserContext);
  const [loading, setLoading] = useState(false); // State for loading indicator

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    image: "",
  });

  const handleChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result?.canceled) {
      setForm({ ...form, image: result?.assets[0]?.uri });
    }
  };
  const handleRegister = () => {
    const { first_name, last_name, email, password, image } = form;
    if (first_name && last_name && email && password && image) {
      const userDate = {
        first_name,
        last_name,
        email,
        password,
        image,
      };
      setLoading(true);

      setTimeout(() => {
        setLoading(false);
        login(userDate);
        Alert.alert(
          "Registration Successful",
          `Welcome, ${first_name} ${last_name}!`,
          [
            {
              text: "OK",
              onPress: () => router.push("/login"),
            },
          ]
        );
        setForm({
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          image: "",
        });
      }, 1500);
    } else {
      Alert.alert("Error", "All fields are required.");
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <View style={styles.imageContainer}>
        {form.image && (
          <Image source={{ uri: form.image }} style={styles.image} />
        )}
      </View>
      <TextInput
        placeholderTextColor="#fff"
        style={styles.input}
        placeholder="First Name"
        value={form.first_name}
        onChangeText={(value) => handleChange("first_name", value)}
      />
      <TextInput
        placeholderTextColor="#fff"
        style={styles.input}
        placeholder="Last Name"
        value={form.last_name}
        onChangeText={(value) => handleChange("last_name", value)}
      />
      <TextInput
        placeholderTextColor="#fff"
        style={styles.input}
        placeholder="Email"
        value={form.email}
        onChangeText={(value) => handleChange("email", value)}
        keyboardType="email-address"
      />
      <TextInput
        placeholderTextColor="#fff"
        style={styles.input}
        placeholder="Password"
        value={form.password}
        onChangeText={(value) => handleChange("password", value)}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Pick an image from camera roll</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <Link href={"/login"} style={styles.link}>
        Already have an account? Login
      </Link>

      {loading && <ActivityIndicator size="large" color="#20B2AA" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#111827",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: "#fff",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    color: "#fff",
  },
  imageContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  link: {
    color: "#fff",
    marginTop: 12,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#20B2AA",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default RegisterForm;
