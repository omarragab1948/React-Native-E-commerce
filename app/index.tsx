import { colors } from "@/constants/theme";
import UserContext from "@/contexts/AuthContext";
import { categories } from "@/data/categories";
import { Link } from "expo-router";
import { useContext, useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";

export default function Home() {
  const [textSearch, setTextSearch] = useState("");
  const [loader, setLoader] = useState(false);
  const [shownCategories, setShownCategories] = useState(categories);
  const { user } = useContext(UserContext);
  const searchHandler = (category: string) => {
    setTextSearch(category);
  };
  const filterdCategories = () => {
    const filterd = categories.filter((cat) =>
      cat.name.toLowerCase().includes(textSearch.toLowerCase())
    );
    setShownCategories(filterd);
  };
  useEffect(() => {
    const handleFiterdCategories = () => {
      setLoader(true);
      setTimeout(() => {
        filterdCategories();
        setLoader(false);
      }, 1000);
    };
    handleFiterdCategories();
  }, [textSearch]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          placeholder="Search for a category"
          onChangeText={searchHandler}
          value={textSearch}
          placeholderTextColor="#888"
        />

        {loader && <ActivityIndicator size="large" color={"red"} />}
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          {shownCategories?.length > 0 && !loader
            ? shownCategories.map((category) => (
                <Link
                  key={`/categories/${category.id}`}
                  href={category.link}
                  asChild
                >
                  <Pressable style={styles.categoryButton}>
                    <View style={styles.categoryContent}>
                      <View style={styles.imageContainer}>
                        <Image
                          source={{ uri: category.image }}
                          style={styles.image}
                          resizeMode="cover"
                        />
                      </View>
                      <Text style={styles.text}>{category.name}</Text>
                    </View>
                  </Pressable>
                </Link>
              ))
            : !loader && (
                <Text style={styles.notFound}>No categories found</Text>
              )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    padding: 20,
  },
  scrollViewContent: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  categoryButton: {
    width: "48%",
    marginVertical: 10,
    borderRadius: 15,
    backgroundColor: colors.white,
    overflow: "hidden",
    elevation: 3, // Adds shadow for Android
    shadowColor: "#000", // Adds shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  categoryContent: {
    alignItems: "center",
  },
  imageContainer: {
    width: "100%",
    height: 150,
    padding: 5,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
  },
  text: {
    padding: 10,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    // color: colors.primary,
  },
  textInput: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 10,
    fontSize: 18,
    marginBottom: 20,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  notFound: {
    color: "#fff",
    fontSize: 18,
  },
});
