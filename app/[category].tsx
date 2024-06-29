import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { data } from "@/data/productsData";
import Product from "@/components/Product";

const index = () => {
  const local = useLocalSearchParams();
  const category = typeof local?.category === "string" ? local?.category : "";
  const ProductsData = data?.products?.filter(
    (product) => product.category === category
  );

  return (
    <SafeAreaView>
      <ScrollView>
        <Stack.Screen options={{ headerTitle: category }} />
        <View style={styles.container}>
          {ProductsData.map((product, index) => (
            <Product key={index} product={product} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#111827",
  },
});
