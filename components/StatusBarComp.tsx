import { colors } from "@/constants/theme";
import { StyleSheet, Text, View, StatusBar } from "react-native";

const StatusBarComp = () => {
  return <StatusBar animated={true} backgroundColor="green"  />;
};

export default StatusBarComp;

const styles = StyleSheet.create({
  statusBarStyle: {
    backgroundColor: "red",
    height: 50,
  },
});
