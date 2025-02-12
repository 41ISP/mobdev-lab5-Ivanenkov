import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { ITodo, IStore, sklad } from '@/entity/todo/todo.model';
//import TextInput from '@/components/input/Input';
import { Alert, Button, FlatList, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { customAlphabet } from 'nanoid/non-secure';
import { useStore } from 'zustand';
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const nanoid = customAlphabet("adcdefghijklmnopqrstuvwxyz0123456789", 10)
  const {dobavlenie, udalenie, tooglesw, tasks} = sklad()
  const colorScheme = useColorScheme();
  const [mainSwitch, setMainSwitch] = useState(false);
  const [newTaskName, setNewTaskName] = useState("")
  const [filtertodo, setFilterTodo] = useState([...tasks])
  
  const handleclick = () => {
    if (newTaskName.trim().length > 0 && newTaskName.trim().length < 15) {
      setNewTaskName('')
      dobavlenie({ id: nanoid(), task: newTaskName.trim(), taskstate: false })
    }
    else {
      Alert.alert("Введите допустимое значение")
    }
  }



  useEffect(() => {
    if (mainSwitch) {
      setFilterTodo(tasks.filter((task) => task.taskstate !== mainSwitch))
    }
    else {
      setFilterTodo([...tasks])
    }
  }, [mainSwitch, tasks])
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
          <TextInput value={newTaskName} onChangeText={setNewTaskName} placeholder='Напишите текст' style={styles.styleinput} />
          <TouchableOpacity onPress={handleclick} style={styles.btn}><Text>Нажми</Text></TouchableOpacity>
        </View>
        <Switch value={mainSwitch} onValueChange={setMainSwitch}></Switch>
        <FlatList
          data={filtertodo}
          keyExtractor={(item) => item.id}
          renderItem={({ item },) => (
            <View style={styles.container}>

              <Text>{item.task}</Text>
              <TouchableOpacity style={styles.btn} onPress={() => udalenie(item.id)}><Text>Delete</Text></TouchableOpacity>
              <Switch value={item.taskstate} onValueChange={() => { tooglesw(item.id) }}></Switch>
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
    borderRadius: 20,
    height: 30,
    borderWidth: 1,
    backgroundColor: "#ff0000",
    justifyContent: 'center',
    alignItems: 'center',
    color: "white"
  },
  styleinput: {
    width: 140,
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ff0000",
  }
});