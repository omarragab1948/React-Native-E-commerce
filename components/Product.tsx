import { useCart } from "@/contexts/CartContext";
import { Link, router } from "expo-router";
import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Product = ({ product }: any) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({ id: product?.id, quantity: 1 });
  };

  const handleBuyNow = async () => {
    handleAddToCart();
    router.push("/Checkout");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View style={styles.productContainer}>
          <Link href={`/Products/${product.id}`}>
            <Text style={styles.productName}>{product.name}</Text>
          </Link>
          <Text style={styles.productPrice}>Price: ${product.price}</Text>
          <ScrollView
            horizontal
            style={styles.imageScrollView}
            contentContainerStyle={styles.imageContainer}
            showsHorizontalScrollIndicator={false}
          >
            {product.images.map((image: { url: string }, index: number) => (
              <Image key={index} source={{ uri: image.url }} style={styles.image} />
            ))}
          </ScrollView>
          <Text style={styles.productCategory}>Category: {product.category}</Text>
          <Text style={styles.productAbout}>About:</Text>
          <View style={styles.aboutContainer}>
            {Object.entries(product?.about ?? {}).map(([key, value]) => (
              <View key={key}>
                {typeof value === "object" && value !== null ? (
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
            {product.aboutthisitem.map((item: { point: string }, index: number) => (
              <Text key={index} style={styles.aboutThisItemText}>
                {`\u2022 ${item.point}`}
              </Text>
            ))}
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buyNowButton} onPress={handleBuyNow}>
            <Text style={styles.buttonText}>Buy Now</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
            <Text style={styles.buttonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  productContainer: {
    padding: 10,
    flex: 1,
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
    height: 160,
  },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    paddingHorizontal: 10,
    marginBottom: 50,
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

export default Product;
