import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { Image, StatusBar, Text } from "react-native";
import { Entypo, FontAwesome5, Ionicons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  Link,
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
  DrawerToggleButton,
} from "@react-navigation/drawer";
import StatusBarComp from "@/components/StatusBarComp";
import UserContext, { UserProvider } from "@/contexts/AuthContext";
import { useNavigationState } from "@react-navigation/native";
import { CartProvider } from "@/contexts/CartContext";
import { data } from "@/data/productsData";
const bgRouteColor = "#178F85";
const CustomDrawer = (props: any) => {
  const route = usePathname();
  console.log(route)
  const {
    user,
    loginHandler: login,
    logoutHandler: logout,
  } = useContext(UserContext);
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{ backgroundColor: "#20B2AA", height: "100%" }}
    >
      <View style={styles.drawerHeader}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
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
        style={{ backgroundColor: route === "/" ? "#000" : bgRouteColor }}
      />

      {/* <DrawerItem
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
        style={{
          backgroundColor: route === "/Products" ? "#000" : bgRouteColor,
        }}
      /> */}
      {/* <DrawerItem
        label={`Products/${route.split("/")[1]}`}
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
        style={{
          backgroundColor: route === "/Products" ? "#000" : bgRouteColor,
        }}
      /> */}
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
        style={{ backgroundColor: route === "/Cart" ? "#000" : bgRouteColor }}
      />
      <DrawerItem
        label={user ? user?.first_name + " " + user?.last_name : "Profile"}
        icon={({ color, size }) => {
          if (user) {
            return (
              <Image
                source={{ uri: user?.image }}
                style={{ width: 24, height: 24, borderRadius: 50 }}
              />
            );
          } else {
            return (
              <MaterialIcons
                name="account-circle"
                size={24}
                color={route === "/Profile" ? "#fff" : "#000"}
              />
            );
          }
        }}
        onPress={() => router.push(user ? "/Profile" : "/login")}
        labelStyle={{
          fontWeight: "bold",
          fontSize: 16,
          color: route === "/Profile" ? "#fff" : "#000",
        }}
        style={{
          backgroundColor: route === "/Profile" ? "#000" : bgRouteColor,
        }}
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
        style={{
          backgroundColor: route === "/Checkout" ? "#000" : bgRouteColor,
        }}
      />
      {user ? (
        <DrawerItem
          label="Logout"
          icon={({ color, size }) => (
            <Entypo
              name="login"
              size={24}
              color={route === "/logout" ? "#fff" : "#000"}
            />
          )}
          onPress={() => {
            if(route === "/Profile" ){
              router.push("/")
            }
            logout()
          }}
          labelStyle={{
            fontWeight: "bold",
            fontSize: 16,
            color: route === "/logout" ? "#fff" : "#000",
          }}
          style={{
            backgroundColor: route === "/logout" ? "#000" : bgRouteColor,
          }}
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
          style={{
            backgroundColor: route === "/login" ? "#000" : bgRouteColor,
          }}
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
  const path = usePathname();
  const currentRoute = path.split("/")[1];
  console.log("user", user);
  // const cartContext = useContext(CartContext);
  // const cart = cartContext?.cart;
  // console.log(cart)
  return (
    <UserProvider>
      <CartProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <StatusBarComp />
          <Drawer
            drawerContent={(props) => <CustomDrawer {...props} />}
            screenOptions={{
              headerStyle: {
                backgroundColor: "#20B2AA",
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
              <Drawer.Screen
              name="Products"
              options={{
                drawerLabel: "Home",
                headerTitle: data?.products?.find((product) => product.id === +path.split("/")[2])?.name,
                drawerIcon: ({ size, color }) => (
                  <Entypo name="home" size={24} color={color} />
                ),
                headerRight: () => (
                  <TouchableOpacity
                  onPress={() => router.push(user ? "/Profile" : "/login")}

                    style={{ marginRight: 10 }}
                  >
                    {user ? (
                        <Image
                          source={{ uri: user?.image }}
                          style={{ width: 50, height: 50, borderRadius: 5000  }}
                        />
                    ) : (
                      <FontAwesome5 name="user-circle" size={24} color="#fff" />
                    )}
                  </TouchableOpacity>
                ),
              }}
            />
            <Drawer.Screen
              name="Cart"
              options={{
                drawerLabel: "Home",
                headerTitle: data?.products?.find((product) => product.id === +path.split("/")[2])?.name,
                drawerIcon: ({ size, color }) => (
                  <Entypo name="home" size={24} color={color} />
                ),
                headerRight: () => (
                  <TouchableOpacity
                  onPress={() => router.push(user ? "/Profile" : "/login")}

                    style={{ marginRight: 10 }}
                  >
                    {user ? (
                        <Image
                          source={{ uri: user?.image }}
                          style={{ width: 50, height: 50, borderRadius: 5000  }}
                        />
                    ) : (
                      <FontAwesome5 name="user-circle" size={24} color="#fff" />
                    )}
                  </TouchableOpacity>
                ),
              }}
            />
            <Drawer.Screen
              name="Checkout"
              options={{
                drawerLabel: "Home",
                headerTitle: data?.products?.find((product) => product.id === +path.split("/")[2])?.name,
                drawerIcon: ({ size, color }) => (
                  <Entypo name="home" size={24} color={color} />
                ),
                headerRight: () => (
                  <TouchableOpacity
                  onPress={() => router.push(user ? "/Profile" : "/login")}

                    style={{ marginRight: 10 }}
                  >
                    {user ? (
                        <Image
                          source={{ uri: user?.image }}
                          style={{ width: 50, height: 50, borderRadius: 5000  }}
                        />
                    ) : (
                      <FontAwesome5 name="user-circle" size={24} color="#fff" />
                    )}
                  </TouchableOpacity>
                ),
              }}
            />
          </Drawer>
        </GestureHandlerRootView>
        {/*
        <GestureHandlerRootView>
          <Drawer>
            <Stack>
              <Stack.Screen
                name="index"
                options={{
                  headerTitle: "Home",
                  headerStyle: {
                    backgroundColor: "#20B2AA",
                  },
                  headerTintColor: "#fff",
                  headerTitleStyle: {
                    fontWeight: "bold",
                  },
                  headerRight: () => (
                    <TouchableOpacity
                      onPress={() => {
                        router.push("/Profile");
                      }}
                      style={{ marginRight: 10 }}
                    >
                      {user ? (
                        <>
                          <Image
                            source={{ uri: user?.image }}
                            style={styles.userImage}
                          />
                          <Text style={styles.userName}>test</Text>
                        </>
                      ) : (
                        <FontAwesome5
                          name="user-circle"
                          size={24}
                          color="#fff"
                        />
                      )}
                    </TouchableOpacity>
                  ),
                }}
              />
              <Stack.Screen
                name="Products"
                options={{
                  headerTitle: "Products",
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="login"
                options={{
                  headerTitle: "Login",
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Register"
                options={{
                  headerTitle: "Register",
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Cart"
                options={{
                  headerTitle: "Cart",
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Checkout"
                options={{
                  headerTitle: "Checkout",
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Profile"
                options={{
                  headerTitle: "Profile",
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="[category]"
                options={{
                  headerTitle: "categories",
                  headerStyle: {
                    backgroundColor: "#20B2AA",
                  },
                  headerTintColor: "#fff",
                  headerTitleStyle: {
                    fontWeight: "bold",
                  },
                }}
              />
            </Stack>
          </Drawer>
          <Drawer>
            <Drawer.Screen name="index" options={{ title: "Home" }} />
            <Drawer.Screen name="Products" options={{ title: "Products", headerShown: false }} />
            <Drawer.Screen name="login" options={{ title: "Login" }} />
            <Drawer.Screen name="Register" options={{ title: "Register" }} />
            <Drawer.Screen name="Cart" options={{ title: "Cart" , headerShown: false}} />
            <Drawer.Screen name="Checkout" options={{ title: "Checkout" }} />
            <Drawer.Screen name="Profile" options={{ title: "Profile" }} />
            <Drawer.Screen name="Products/[product]/index" options={{ title: "Product" }} />
            <Drawer.Screen
              name="[category]"
              options={{ title: "Categories" }}
            />
          </Drawer>
          {currentRoute === "Cart" ||
          currentRoute === "login" ||
          currentRoute === "Register" ? null : (
            <View style={styles.cartButton}>
              <Link href="/Cart">
                <FontAwesome5 name="cart-arrow-down" size={25} color="#fff" />
              </Link>
            </View>
          )}
        </GestureHandlerRootView>
       */}
      </CartProvider>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  userImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  userName: {
    color: "#fff",
    marginLeft: 5,
  },
  drawerHeader: {
    backgroundColor: "transparent",
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
  cartButton: {
    position: "absolute",
    bottom: 70,
    right: 20,
    backgroundColor: "#20B2AA",
    padding: 10,
    borderRadius: 50,
  },
});
