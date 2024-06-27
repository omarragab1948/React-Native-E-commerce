import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';



export default function NotFoundScreen() {
  return (
    <View>
      <Text>Not found page</Text>
      <Link href="/" style={styles.link}> Go to home screen!</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
