import React, { useContext, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { Stack, router } from "expo-router";
import UserContext from "@/contexts/AuthContext";

const Profile = () => {
  const {
    user,
    loginHandler: login,
    logoutHandler: logout,
  } = useContext(UserContext);
  const [updatedUser, setUpdatedUser] = useState(user);
  console.log(user);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result?.canceled) {
      setUpdatedUser({ ...updatedUser, image: result?.assets[0]?.uri });
    }
  };
  const handleInputChange = (name: string, value: string) => {
    setUpdatedUser({
      ...updatedUser,
      [name]: value,
    });
  };

  const handleUpdateProfile = () => {
    login(updatedUser);
    Alert.alert("Profile updated successfully!");
  };

  return (
    <>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.profileSection}>
          <Text style={styles.sectionTitle}>User Information</Text>
          <Image source={{ uri: user?.image }} style={styles.profileImage} />
          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={updatedUser?.first_name}
            onChangeText={(value) => handleInputChange("first_name", value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={updatedUser?.first_name}
            onChangeText={(value) => handleInputChange("last_name", value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={updatedUser?.email}
            onChangeText={(value) => handleInputChange("email", value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={updatedUser?.password}
            onChangeText={(value) => handleInputChange("password", value)}
          />
          <TouchableOpacity style={styles.button} onPress={pickImage}>
            <Text style={styles.buttonText}>
              Pick an image from camera roll
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.updateButton}
            onPress={handleUpdateProfile}
          >
            <Text style={styles.buttonText}>Update Profile</Text>
          </TouchableOpacity>
        </View>
        
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexDirection: "column",
    padding: 20,
    backgroundColor: "#111827",
    flexGrow: 1,
  },
  profileSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: "center",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  updateButton: {
    backgroundColor: "#FF6347",
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  ordersSection: {
    marginBottom: 20,
  },
  orderContainer: {
    padding: 10,
    backgroundColor: "#1F2937",
    borderRadius: 10,
    marginBottom: 20,
  },
  orderDate: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 5,
  },
  orderTotal: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 5,
  },
  orderItem: {
    fontSize: 14,
    color: "#fff",
  },
  button: {
    backgroundColor: "#20B2AA",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: "center",
  },
});

export default Profile;
