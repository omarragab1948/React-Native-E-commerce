import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Stack, router } from "expo-router";
import { useCart } from "@/contexts/CartContext";
import { data } from "@/data/productsData";
import UserContext from "@/contexts/AuthContext";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  // Map cart items with product details
  const cartProducts = cart.map((cartItem) => {
    const product = data?.products.find((p) => p.id === cartItem.id);
    return { ...product, quantity: cartItem.quantity };
  });

  const handleInputChange = (name, value) => {
    setShippingInfo({
      ...shippingInfo,
      [name]: value,
    });
  };

  const { user } = useContext(UserContext);

  const handlePlaceOrder = () => {
    if (!user) {
      router.replace("/login");
    } else {
      Alert.alert("Order placed successfully!");
      clearCart();
      router.push("/");
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "Checkout",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={{ marginRight: 10 }}
            >
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
          ),
        }}
      />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {cartProducts.length > 0 ? (
          <>
            <View style={styles.cartSummary}>
              <Text style={styles.sectionTitle}>Order Summary</Text>
              {cartProducts.map((product) => (
                <View style={styles.productContainer} key={product.id}>
                  <Text style={styles.productName}>{product.name}</Text>
                  <Text style={styles.productPrice}>
                    Price: ${product.price}
                  </Text>
                  <Text style={styles.productQuantity}>
                    Quantity: {product.quantity}
                  </Text>
                  <ScrollView horizontal style={styles.imageScrollView}>
                    {product.images.map((image, index) => (
                      <Image
                        key={index}
                        source={{ uri: image.url }}
                        style={styles.image}
                      />
                    ))}
                  </ScrollView>
                </View>
              ))}
            </View>
            <View style={styles.shippingInfo}>
              <Text style={styles.sectionTitle}>Shipping Information</Text>
              <TextInput
                style={styles.input}
                placeholder="Name"
                value={shippingInfo.name}
                onChangeText={(value) => handleInputChange("name", value)}
              />
              <TextInput
                style={styles.input}
                placeholder="Address"
                value={shippingInfo.address}
                onChangeText={(value) => handleInputChange("address", value)}
              />
              <TextInput
                style={styles.input}
                placeholder="City"
                value={shippingInfo.city}
                onChangeText={(value) => handleInputChange("city", value)}
              />
              <TextInput
                style={styles.input}
                placeholder="Postal Code"
                value={shippingInfo.postalCode}
                onChangeText={(value) => handleInputChange("postalCode", value)}
              />
              <TextInput
                style={styles.input}
                placeholder="Country"
                value={shippingInfo.country}
                onChangeText={(value) => handleInputChange("country", value)}
              />
            </View>
            <TouchableOpacity
              style={styles.placeOrderButton}
              onPress={handlePlaceOrder}
            >
              <Text style={styles.buttonText}>Place Order</Text>
            </TouchableOpacity>
          </>
        ) : (
          <View style={styles.emptyCartContainer}>
            <Text style={styles.emptyCartText}>Your cart is empty</Text>
          </View>
        )}
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
  cartSummary: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  productContainer: {
    padding: 10,
    backgroundColor: "#1F2937",
    borderRadius: 10,
    marginBottom: 20,
  },
  productName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 10,
  },
  productQuantity: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 10,
  },
  imageScrollView: {
    marginBottom: 10,
  },
  image: {
    width: 150,
    height: 150,
    marginRight: 10,
    borderRadius: 10,
    resizeMode: "contain",
  },
  shippingInfo: {
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
  placeOrderButton: {
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
  emptyCartContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#1F2937",
    borderRadius: 10,
  },
  emptyCartText: {
    fontSize: 18,
    color: "#fff",
  },
});

export default Checkout;
