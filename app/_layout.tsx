import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
//import TextInput from '@/components/input/Input';
import { Alert, Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { customAlphabet } from 'nanoid';
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [clickbtn, setClickbtn] = useState("")
  const [task, setTask] = useState("")
  const handleclick = () => {
    // if(task.length > 0 && task.length <15)
    // {
    
    //   Alert.alert(task)
    // }
    // else {
      //   Alert.alert("Введите допустимое значение")
      // }
      setTasks([...tasks,{id: nanoid(), task: task, state: false }])
    }
    
    const nanoid = customAlphabet("adcdefghijklmnopqrstuvwxyz0123456789",10)
    
    const contact = [
      {
        task: "123",
        id: nanoid(),
        state: false
      },
      
    ]
  const [tasks, setTasks] = useState([...contact])
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });


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
      

        <View style={styles.container2}>
          <View style={styles.container}>
          <TextInput value={task} onChangeText={setTask} placeholder='Напишите текст' style={styles.styleinput}>{task}</TextInput>
          <TouchableOpacity onPress={handleclick} style={styles.btn}><Text>Нажми</Text></TouchableOpacity>
          </View>
          <FlatList
            data={tasks}
            keyExtractor={(item) => item.id}
            renderItem={({ item },) => (
              <View style={styles.container}>
                <Text>{item.task}</Text>
              </View>
            )}></FlatList>
        </View>
     

    </ThemeProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: "row",
    justifyContent: 'center',
  },
  container2: {
    alignItems: 'center',
    flexDirection: "column",
    justifyContent: 'center',
  },
  text: {
    color: "#ff0000",
    fontSize: 24,
  },
  btn: {
    width: 50,
    height: 30,
    borderWidth: 1,

  },
  styleinput: {
    width: 140,
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ff0000",
  }
});