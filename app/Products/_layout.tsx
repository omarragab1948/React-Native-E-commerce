import { Slot, Stack } from "expo-router";
import { View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/constants/theme";
import { Drawer } from "expo-router/drawer";

export default function RootLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="index"  options={{  headerShown: false }}  />
        <Stack.Screen name="[product]"  options={{ headerShown: false }} />
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
