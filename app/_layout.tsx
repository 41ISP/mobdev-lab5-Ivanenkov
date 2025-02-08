import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
//import TextInput from '@/components/input/Input';
import { Alert, Button, FlatList, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { customAlphabet } from 'nanoid/non-secure';
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [clickbtn, setClickbtn] = useState("")
  const [isEnabled, setIsEnabled] = useState(false);
  const [newTaskName, setNewTaskName] = useState("")
  const handleclick = () => {
    if (newTaskName.trim().length > 0 && newTaskName.trim().length < 15) {
      setNewTaskName('')
      setTasks([...tasks, { id: nanoid(), task: newTaskName.trim(), state: false }])
    }
    else {
      Alert.alert("Введите допустимое значение")
    }
  }

  const nanoid = customAlphabet("adcdefghijklmnopqrstuvwxyz0123456789", 10)

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
  const toggleSwitch = (id: string) => {
    const newTasks = []
    for (let i of tasks) {
      if (i.id === id) {
        newTasks.push({ ...i, state: !i.state })
      } else {
        newTasks.push(i) 
      }
    }
    setTasks(newTasks)
  }

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  const handleDelete = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>


      <View style={styles.container2}>
        <View style={styles.container}>
          <TextInput value={newTaskName} onChangeText={setNewTaskName} placeholder='Напишите текст' style={styles.styleinput} />
          <TouchableOpacity onPress={handleclick} style={styles.btn}><Text>Нажми</Text></TouchableOpacity>
        </View>
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item },) => (
            <View style={styles.container}>
              <Text>{item.task}</Text>
              <TouchableOpacity style={styles.btn} onPress={() => handleDelete(item.id)}><Text>Delete</Text></TouchableOpacity>
              <Switch value={item.state} onValueChange={() => { toggleSwitch(item.id) }}></Switch>
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
    marginLeft: 10,
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