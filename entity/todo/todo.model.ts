import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface ITodo {
    task: string,
    id: string,
    taskstate: boolean;
}

export interface IStore {
    tasks: ITodo[],
    dobavlenie: (task: ITodo) => void,
    udalenie: (id: ITodo) => void,
    tooglesw: (id: ITodo) => void,
}

export const sklad = create<IStore>()(
    persist(
        (set) => ({
            tasks:[],
            dobavlenie: (task) => set((state)=>({...state, tasks:[...state.tasks, task]})),
            udalenie:(task)=> set((state)=> ({...state, tasks: state.tasks.filter((u)=> task.taskstate !== u.taskstate)})),
            tooglesw: (task)=> set((state)=>({...state, tasks: state.tasks.map((t)=> t.id === task.id ? {...t, taskstate: !t.taskstate } : t)}))
        }),
        {
            name: 'task-storage',
            storage: createJSONStorage(()=> AsyncStorage),

        },
    )
)

