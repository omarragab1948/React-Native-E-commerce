import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Slot, Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerStyle: {
              backgroundColor: "#20B2AA",
            },
            headerTitle: "Login",
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerShown: false
          }}
        />
      </Stack>
  );
}
