import { Slot, Stack, router } from "expo-router";
import { View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/constants/theme";
import { Drawer } from "expo-router/drawer";
import { useContext, useEffect } from "react";
import UserContext from "@/contexts/AuthContext";

export default function RootLayout() {
  const { user } = useContext(UserContext);
  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [user]);
  return (
    <>
      <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }}  />
      </Stack>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingTop: 10,
  },
});
