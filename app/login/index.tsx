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

const LoginForm = () => {
  const { loginHandler: login, user } = useContext(UserContext);
  const [loading, setLoading] = useState(false); // State for loading indicator

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };

  const handleLogin = () => {
    const { email, password } = form;
    if (email && password) {
      setLoading(true);
      setTimeout(() => {
        login({ ...user, email });
        setLoading(false);
        if (email !== user?.email || password !== user?.password) {
          Alert.alert("Error", "Invalid email or password.");
        } else {
          Alert.alert("Login Successful", `Welcome back, ${user?.first_name + " " + user?.last_name}!`, [
            {
              text: "OK",
              onPress: () => router.push("/"),
            },
          ]);
        }
      }, 1500);
    } else {
      Alert.alert("Error", "All fields are required.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
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
      <Button title="Login" onPress={handleLogin} />
      <Link href={"/Register"}>Don't have an account? Register</Link>
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

export default LoginForm;
