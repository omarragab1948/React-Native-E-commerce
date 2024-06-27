import { Slot } from "expo-router";
import { View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/constants/theme";
import { Drawer } from "expo-router/drawer";


export default function RootLayout() {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <Slot />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg, 
    paddingTop: 10
  },
});
