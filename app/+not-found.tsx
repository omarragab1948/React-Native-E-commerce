import { Link, useLocalSearchParams, usePathname } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';



export default function NotFoundScreen() {
  const  first  = useLocalSearchParams()
  const path = usePathname()
  console.log(first)
  console.log(path)

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
