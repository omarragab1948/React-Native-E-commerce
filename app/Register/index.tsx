import UserContext from "@/contexts/AuthContext";
import { Link, router } from "expo-router";
import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";

const RegisterForm = () => {
  const { user, loginHandler: login } = useContext(UserContext);
  const [loading, setLoading] = useState(false); // State for loading indicator

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const handleChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };

  const handleRegister = () => {
    const { first_name, last_name, email, password } = form;
    if (first_name && last_name && email && password) {
      const userDate = {
        first_name,
        last_name,
        email,
        password
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
      }, 1500);
    } else {
      Alert.alert("Error", "All fields are required.");
    }
  };
  console.log(user);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={form.first_name}
        onChangeText={(value) => handleChange("first_name", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={form.last_name}
        onChangeText={(value) => handleChange("last_name", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={form.email}
        onChangeText={(value) => handleChange("email", value)}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={form.password}
        onChangeText={(value) => handleChange("password", value)}
        secureTextEntry
      />
      <Button title="Register" onPress={handleRegister} />
      <Link href={"/login"}>Already have an account? Login</Link>

      {loading && <ActivityIndicator size="large" color="#0000ff" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default RegisterForm;
