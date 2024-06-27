import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { data } from "@/data/productsData";
import Product from "@/components/Product";

const index = () => {
  const local = useLocalSearchParams();
  const category =
    typeof local?.category === "string" ? local.category.split(":")[1] : "";
  const ProductsData = data?.products?.filter(
    (product) => product.category === category
  );
  console.log(ProductsData);
  return (
    <ScrollView>
    {ProductsData.map((product, index) => (
      <Product key={index} product={product} />
    ))}
  </ScrollView>
  );
};

export default index;

const styles = StyleSheet.create({});
