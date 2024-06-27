import { Slot, router } from "expo-router";
import { View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/constants/theme";
import { Drawer } from "expo-router/drawer";
import { useContext, useEffect } from "react";
import UserContext from "@/contexts/AuthContext";


export default function RootLayout() {
  const {user} = useContext(UserContext);
  useEffect(() => {
  (!user) && router.push('/login');
  }, [user]);
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
