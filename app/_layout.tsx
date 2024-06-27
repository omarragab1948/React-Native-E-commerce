import { StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { Image, StatusBar, Text } from "react-native";
import { Entypo, FontAwesome5, Ionicons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  Slot,
  Stack,
  Tabs,
  router,
  usePathname,
  useRootNavigationState,
  useRouter,
} from "expo-router";
import { useContext, useEffect } from "react";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import StatusBarComp from "@/components/StatusBarComp";
import UserContext, { UserProvider } from "@/contexts/AuthContext";
import { useNavigationState } from "@react-navigation/native";

const CustomDrawer = (props: any) => {
  const route = usePathname();
  console.log(route);
  const {
    user,
    loginHandler: login,
    logoutHandler: logout,
  } = useContext(UserContext);
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{ backgroundColor: "red", height: "100%" }}
    >
      <View style={styles.drawerHeader}>
        <Image source={require("../assets/logo.jpg")} style={styles.logo} />
      </View>
      {/* <DrawerItemList {...props} /> */}
      <DrawerItem
        label="Home"
        icon={({ color, size }) => (
          <Entypo
            name="home"
            size={24}
            color={route === "/" ? "#fff" : "#000"}
          />
        )}
        labelStyle={{
          fontWeight: "bold",
          fontSize: 16,
          color: route === "/" ? "#fff" : "#000",
        }}
        onPress={() => router.push("/")}
        style={{ backgroundColor: route === "/" ? "#000" : "#f00" }}
      />

      <DrawerItem
        label="Products"
        icon={({ color, size }) => (
          <FontAwesome
            name="product-hunt"
            size={24}
            color={route === "/Products" ? "#fff" : "#000"}
          />
        )}
        labelStyle={{
          fontWeight: "bold",
          fontSize: 16,
          color: route === "/Products" ? "#fff" : "#000",
        }}
        onPress={() => router.push("/Products")}
        style={{ backgroundColor: route === "/Products" ? "#000" : "#f00" }}
      />
      <DrawerItem
        label="Cart"
        icon={({ color, size }) => (
          <FontAwesome5
            name="cart-arrow-down"
            size={24}
            color={route === "/Cart" ? "#fff" : "#000"}
          />
        )}
        onPress={() => router.push("/Cart")}
        labelStyle={{
          fontWeight: "bold",
          fontSize: 16,
          color: route === "/Cart" ? "#fff" : "#000",
        }}
        style={{ backgroundColor: route === "/Cart" ? "#000" : "#f00" }}
      />
      <DrawerItem
        label={user ? user?.first_name + " " + user?.last_name : "Profile"}
        icon={({ color, size }) => (
          <MaterialIcons
            name="account-circle"
            size={24}
            color={route === "/Profile" ? "#fff" : "#000"}
          />
        )}
        onPress={() => router.push(user ? "/profile" : "/login")}
        labelStyle={{
          fontWeight: "bold",
          fontSize: 16,
          color: route === "/Profile" ? "#fff" : "#000",
        }}
        style={{ backgroundColor: route === "/Profile" ? "#000" : "#f00" }}
      />
      <DrawerItem
        label="Checkout"
        icon={({ color, size }) => (
          <MaterialIcons
            name="payments"
            size={24}
            color={route === "/Checkout" ? "#fff" : "#000"}
          />
        )}
        labelStyle={{
          fontWeight: "bold",
          fontSize: 16,
          color: route === "/Checkout" ? "#fff" : "#000",
        }}
        onPress={() => router.push("/Checkout")}
        style={{ backgroundColor: route === "/Checkout" ? "#000" : "#f00" }}
      />
      {user ? (
        <DrawerItem
          label="Logout"
          icon={({ color, size }) => (
            <Entypo
              name="login"
              size={24}
              color={route === "/" ? "#fff" : "#000"}
            />
          )}
          onPress={() => logout()}
          labelStyle={{
            fontWeight: "bold",
            fontSize: 16,
            color: route === "/" ? "#fff" : "#000",
          }}
          style={{ backgroundColor: route === "Home" ? "#000" : "#f00" }}
        />
      ) : (
        <DrawerItem
          label="Login"
          icon={({ color, size }) => (
            <Entypo
              name="login"
              size={24}
              color={route === "/login" ? "#fff" : "#000"}
            />
          )}
          onPress={() => router.push("/login")}
          labelStyle={{
            fontWeight: "bold",
            fontSize: 16,
            color: route === "/login" ? "#fff" : "#000",
          }}
          style={{ backgroundColor: route === "/login" ? "#000" : "#f00" }}
        />
      )}
    </DrawerContentScrollView>
  );
};

export default function Layout() {
  const {
    user,
    loginHandler: login,
    logoutHandler: logout,
  } = useContext(UserContext);
  return (
    <UserProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBarComp />
        <Drawer
          drawerContent={(props) => <CustomDrawer {...props} />}
          screenOptions={{
            headerStyle: {
              backgroundColor: "red",
            },
            drawerActiveBackgroundColor: "#000",
            drawerActiveTintColor: "white",
            headerTintColor: "white",
          }}
        >
          <Drawer.Screen
            name="index"
            options={{
              drawerLabel: "Home",
              headerTitle: "Home",
              drawerIcon: ({ size, color }) => (
                <Entypo name="home" size={24} color={color} />
              ),
            }}
          />
          {/*
           <Drawer.Screen
            name="categories"
            options={{
              drawerLabel: "Home",
              headerTitle: "Home",
              drawerItemStyle: {
                display: "none",
              },
              drawerIcon: ({ size, color }) => (
                <Entypo name="home" size={24} color={color} />
              ),
            }}
            
          />
           <Drawer.Screen
            name="Register"
            options={{
              drawerLabel: "Home",
              headerTitle: "Home",
              drawerItemStyle: {
                display: "none",
              },
              drawerIcon: ({ size, color }) => (
                <Entypo name="home" size={24} color={color} />
              ),
            }}
            
          />
           <Drawer.Screen
            name="+not-found"
            options={{
              drawerLabel: "Home",
              headerTitle: "Home",
              drawerItemStyle: {
                display: "none",
              },
              drawerIcon: ({ size, color }) => (
                <Entypo name="home" size={24} color={color} />
              ),
            }}
            
          />
          <Drawer.Screen
            name="Products"
            options={{
              drawerLabel: "Products",
              headerTitle: "Products",
              drawerIcon: ({ size, color }) => (
                <FontAwesome name="product-hunt" size={24} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="Cart"
            options={{
              drawerLabel: "Cart",
              headerTitle: "Cart",
              drawerIcon: ({ size, color }) => (
                <FontAwesome5 name="cart-arrow-down" size={24} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="Checkout"
            options={{
              drawerLabel: "Checkout",
              headerTitle: "Checkout",
              drawerIcon: ({ size, color }) => (
                <MaterialIcons name="payments" size={24} color={color} />
              ),
            }}
          />

          <Drawer.Screen
            name="Profile"
            options={{
              drawerLabel: "Profile",
              headerTitle: "Profile",
              drawerIcon: ({ size, color }) => (
                <MaterialIcons name="account-circle" size={24} color={color} />
              ),
            }}
          />
          {user ? (
            <DrawerItem
              label="Logout"
              icon={({ color, size }) => (
                <Entypo name="login" size={24} color={color} />
              )}
              onPress={() => logout()}
            />
          ) : (
            <Drawer.Screen
              name="login"
              options={{
                drawerLabel: "Login",
                headerTitle: "Login",
                drawerIcon: ({ size, color }) => (
                  <Entypo name="login" size={24} color={color} />
                ),
              }}
            />
          )} */}
        </Drawer>
      </GestureHandlerRootView>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  drawerHeader: {
    backgroundColor: "#f4f4f4",
    padding: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  logo: {
    width: 300,
    height: 150,
    resizeMode: "contain",
    marginBottom: 8,
  },
  drawerHeaderText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  drawerItemLabel: {
    fontSize: 16,
    color: "black",
  },
  drawerItemIcon: {
    color: "black",
  },
});
