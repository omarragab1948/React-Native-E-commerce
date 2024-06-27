import React, { useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  DrawerLayoutAndroid,
  Button,
} from "react-native";
const Product = ({ product }: any) => {
  const drawerRef = useRef<DrawerLayoutAndroid>(null);
  const navigationView = () => (
    <View style={[styles.container, styles.navigationContainer]}>
      <Text style={styles.paragraph}>I'm in the Drawer!</Text>
      <Button
        title="Close drawer"
        onPress={() => drawerRef.current?.closeDrawer()}
      />
    </View>
  );
  return (
    <>
      <Button
        title="Open drawer"
        onPress={() => drawerRef.current?.openDrawer()}
      />
      <DrawerLayoutAndroid
        ref={drawerRef}
        drawerPosition="left"
        renderNavigationView={navigationView}
        drawerWidth={300}
        onDrawerOpen={() => console.log("first")}
        style={{ backgroundColor: "white", width: 300, zIndex: 1000 }}
      >
        <View style={styles.container}>
          <Text style={styles.paragraph}>Drawer on the !</Text>

          <Text style={styles.paragraph}>
            Swipe from the side or press button below to see it!
          </Text>
        </View>
      </DrawerLayoutAndroid>
      {/* <View style={styles.productContainer}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productPrice}>Price: ${product.price}</Text>
        <ScrollView horizontal style={styles.imageScrollView}>
          {product.images.map(
            (image: { url: any }, index: React.Key | null | undefined) => (
              <Image
                key={index}
                source={{ uri: image.url }}
                style={styles.image}
              />
            )
          )}
        </ScrollView>
        <Text style={styles.productCategory}>Category: {product.category}</Text>
        <Text style={styles.productAbout}>About:</Text>
        <View style={styles.aboutContainer}>
          {Object.entries(product.about).map(([key, value]) => (
            <View key={key}>
              {typeof value === "object" ? (
                <>
                  <Text style={styles.productAbout}>{key}:</Text>
                  <View style={styles.subAboutContainer}>
                    {Object.entries(value).map(([subKey, subValue]) => (
                      <Text key={subKey} style={styles.subAboutText}>
                        {subKey}: {subValue}
                      </Text>
                    ))}
                  </View>
                </>
              ) : (
                <Text style={styles.aboutText}>
                  {key}: {value}
                </Text>
              )}
            </View>
          ))}
        </View>

        <Text style={styles.productAboutThisItem}>About This Item:</Text>
        <View style={styles.aboutThisItemContainer}>
          {product.aboutthisitem.map(
            (item: { point: any }, index: React.Key | null | undefined) => (
              <Text key={index} style={styles.aboutThisItemText}>
                {`\u2022 ${item.point}`}
              </Text>
            )
          )}
        </View>
      </View> */}
    </>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    padding: 10,
    marginVertical: 20,
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
});

export default Product;
