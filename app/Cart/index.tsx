import { useCart } from "@/contexts/CartContext";
import { data } from "@/data/productsData";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Link, Stack, router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Button,
  Pressable,
  TouchableOpacity,
} from "react-native";

const Index = () => {
  const { cart, removeFromCart, clearCart, addToCart } = useCart();

  // Map cart items with product details
  const cartProducts = cart.map((cartItem) => {
    const product = data?.products.find((p) => p.id === cartItem.id);
    return { ...product, quantity: cartItem.quantity };
  });

  const handleBuyNow = async() => {
   router.push("/Checkout")
 }
  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "Cart",
          headerLeft: () => (
            <Pressable
              onPress={() => router.back()}
              style={{ marginRight: 10 }}
            >
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </Pressable>
          ),
        }}
      />
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {cartProducts?.length > 0 ? (
          cartProducts.map((pro) => (
            <View style={styles.productContainer} key={pro?.id}>
              <Text style={styles.productName}>{pro?.name}</Text>
              <Text style={styles.productPrice}>Price: ${pro?.price}</Text>
              <ScrollView horizontal style={styles.imageScrollView}>
                {pro?.images?.map((image, index) => (
                  <Image
                    key={index}
                    source={{ uri: image.url }}
                    style={styles.image}
                  />
                ))}
              </ScrollView>
              <Text style={styles.productCategory}>
                Category: {pro?.category}
              </Text>
              <View style={styles.quantityContainer}>
                <Text style={styles.productCategory}>
                  Quantity: {pro?.quantity}
                </Text>
                <Pressable style={styles.increaseButton} onPress={()=>removeFromCart(pro)}>
                  <Text>
                    <AntDesign name="minus" size={24} color="#fff" />
                  </Text>
                </Pressable>
                <Pressable style={styles.increaseButton} onPress={()=>addToCart(pro)}>
                  <Text>
                    <AntDesign name="plus" size={24} color="#fff" />
                  </Text>
                </Pressable>
              </View>
              <Text style={styles.productAbout}>About:</Text>
              <View style={styles.aboutContainer}>
                {Object.entries(pro?.about ?? {}).map(([key, value]) => (
                  <View key={key}>
                    {typeof value === "object" ? (
                      <>
                        <Text style={styles.productAbout}>{key}:</Text>
                        <View style={styles.subAboutContainer}>
                          {Object.entries(value).map(([subKey, subValue]) => (
                            <Text key={subKey} style={styles.subAboutText}>
                              {subKey}: {String(subValue)}
                            </Text>
                          ))}
                        </View>
                      </>
                    ) : (
                      <Text style={styles.aboutText}>
                        {key}: {String(value)}
                      </Text>
                    )}
                  </View>
                ))}
              </View>
              <Text style={styles.productAboutThisItem}>About This Item:</Text>
              <View style={styles.aboutThisItemContainer}>
                {pro?.aboutthisitem?.map((item, index) => (
                  <Text key={index} style={styles.aboutThisItemText}>
                    {`\u2022 ${item.point}`}
                  </Text>
                ))}
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.addToCartButton}
                  onPress={() => removeFromCart(pro)}
                >
                  <Text style={styles.buttonText}>Remove</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Your cart is empty</Text>
          </View>
        )}
      </ScrollView>
      {cartProducts?.length > 0 && (
       
        <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buyNowButton}
          onPress={handleBuyNow}
        >
          <Text style={styles.buttonText}>Buy Now</Text>
        </TouchableOpacity>
        <Pressable onPress={clearCart} style={styles.clearButton}>
          <Text style={{ color: "#fff", fontSize: 15, fontWeight: "bold" }}>
            Clear Cart
          </Text>
        </Pressable>
      </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 20,
    color: "#fff",
  },
  quantityContainer: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  increaseButton: {
    width: "25%",
    padding: 5,
    backgroundColor: "#32CD32",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  scrollViewContent: {
    flexDirection: "column",
    padding: 20,
    backgroundColor: "#111827",
    flexGrow: 1,
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
  productCategory: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 10,
  },
  productAbout: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  aboutContainer: {
    marginLeft: 10,
    marginBottom: 10,
  },
  aboutText: {
    fontSize: 14,
    marginBottom: 5,
    color: "#fff",
  },
  subAboutContainer: {
    marginTop: 5,
    marginBottom: 10,
  },
  subAboutText: {
    fontSize: 14,
    marginBottom: 3,
    color: "#fff",
  },
  productAboutThisItem: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  aboutThisItemContainer: {
    marginLeft: 10,
    marginBottom: 10,
  },
  aboutThisItemText: {
    fontSize: 14,
    marginBottom: 5,
    color: "#fff",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    backgroundColor: "#111827",
    paddingVertical: 10,
  },
  buyNowButton: {
    flex: 1,
    backgroundColor: "#FF6347",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    marginRight: 10,
  },
  addToCartButton: {
    flex: 1,
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  clearButton: {
    flex: 1,
    borderRadius: 5,
    backgroundColor: "red",
    padding: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Index;
