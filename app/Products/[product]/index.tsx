import { useCart } from "@/contexts/CartContext";
import { data } from "@/data/productsData";
import { Ionicons } from "@expo/vector-icons";
import { Link, Stack, router, useLocalSearchParams } from "expo-router";
import React, { useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  DrawerLayoutAndroid,
  Button,
  Pressable,
  TouchableOpacity,
} from "react-native";
const Index = () => {
  const productId = useLocalSearchParams();
  const product = data.products.find(
    (pro) => pro?.id === (productId?.product ? +productId?.product : undefined)
  );
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (product) {
      addToCart({ id: product?.id, quantity: 1 });
    }
  };
  const handleBuyNow = async () => {
    handleAddToCart();
    router.push("/Checkout");
  };
  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: product?.name,
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
        <View style={styles.productContainer}>
          <Text style={styles.productName}>{product?.name}</Text>
          <Text style={styles.productPrice}>Price: ${product?.price}</Text>
          <ScrollView horizontal style={styles.imageScrollView}>
            {product?.images.map(
              (image: { url: any }, index: React.Key | null | undefined) => (
                <Image
                  key={index}
                  source={{ uri: image.url }}
                  style={styles.image}
                />
              )
            )}
          </ScrollView>
          <Text style={styles.productCategory}>
            Category: {product?.category}
          </Text>
          <Text style={styles.productAbout}>About:</Text>
          <View style={styles.aboutContainer}>
            {Object.entries(product?.about ?? {}).map(([key, value]) => (
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
            {product?.aboutthisitem.map(
              (item: { point: any }, index: React.Key | null | undefined) => (
                <Text key={index} style={styles.aboutThisItemText}>
                  {`\u2022 ${item.point}`}
                </Text>
              )
            )}
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buyNowButton} onPress={handleBuyNow}>
          <Text style={styles.buttonText}>Buy Now</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={handleAddToCart}
        >
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    backgroundColor: "#111827",
  },
  productContainer: {
    padding: 10,
  },
  productName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  productPrice: {
    fontSize: 16,
    color: "#fff",
  },
  imageScrollView: {
    marginTop: 10,
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
  },
  productAbout: {
    fontSize: 16,
    marginTop: 10,
    fontWeight: "bold",
    color: "#fff",
  },
  aboutContainer: {
    marginLeft: 10,
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
    marginTop: 10,
    fontWeight: "bold",
    color: "#fff",
  },
  aboutThisItemContainer: {
    marginLeft: 10,
  },
  aboutThisItemText: {
    fontSize: 14,
    marginBottom: 5,
    color: "#fff",
    marginVertical: 10,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  navigationContainer: {
    backgroundColor: "#fff",
  },
  paragraph: {
    padding: 16,
    fontSize: 15,
    textAlign: "center",
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
    backgroundColor: "#32CD32",
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
});

export default Index;
