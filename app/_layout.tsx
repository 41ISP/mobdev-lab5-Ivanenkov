import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [counter, setCounter]= useState(0)
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const handleclick = () =>{
    setCounter((value) => value+1)

  }
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      
          <View style={styles.container}>
            <TouchableOpacity onPress={handleclick}>-
            </TouchableOpacity>
            <Text style={styles.text}>{counter}</Text>
          </View>
        
    </ThemeProvider>
  );
}
const styles = StyleSheet.create({
  container:{
     marginTop:100,
     flexDirection:"row"
  },
  text:{
    color:"#ff0000",
    fontSize: 24,
  }
});