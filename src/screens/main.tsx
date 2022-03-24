import React, { useCallback, useEffect, useState} from 'react';
import { TouchableOpacity, TextInput } from 'react-native'
import { Text,Box, Center, VStack, useColorMode, useColorModeValue, Input } from 'native-base';
import { AntDesign } from '@expo/vector-icons'
import ThemeToggle from '../components/theme-toggle';
import TaskList from '../components/task-list';
import shortid from 'shortid'

const initialData = [
    {
        id: shortid.generate(),
        subject: 'Buy movie tickets for Friday',
        done: false
    },
    {
        id: shortid.generate(),
        subject: 'Make Anass ElYoubi Great Again',
        done: false  
    },
    {
        id: shortid.generate(),
        subject: 'GoodBye Sir',
        done: false  
    }
]

export default function MainScreen() {
    const [ task, setTask] = useState('')
    const [ data, setData] = useState([])
    const [editingItemId, setEditingItemId] = useState<string | null>(null)

    class newTask{
      id: number = shortid.generate();
      subject: string = task; 
      done: boolean = false;
    }

    let addingTask =  new newTask()
    
    const handleTask = () => {
      setData([...data, addingTask])
      setTask('')
      console.log(data)
    }
    const handleToggleTaskItem = useCallback(item => {
      setData(prevData => {
        const newData = [...prevData]
        const index = prevData.indexOf(item)
        newData[index] = {
          ...item,
          done: !item.done
        }
        return newData
      })
    }, [])
    const handleChangeTaskItemSubject = useCallback((item, newSubject) => {
        setData(prevData => {
          const newData = [...prevData]
          const index = prevData.indexOf(item)
          newData[index] = {
            ...item,
            subject: newSubject
          }
          return newData
        })
      }, [])
      const handleFinishEditingTaskItem = useCallback(_item => {
        setEditingItemId(null)
      }, [])
      const handlePressTaskItemLabel = useCallback(item => {
        setEditingItemId(item.id)
      }, [])
      const handleRemoveItem = useCallback(item => {
        setData(prevData => {
          const newData = prevData.filter(i => i !== item)
          return newData
        })
      }, [])
    return(
        <Center _dark={{bg: 'blueGray.900'}} _light={{bg: 'blueGray.50'}} px={4} flex={1}>
            <VStack space={5} alignItems={"center"} w='full'>
            <TaskList
                data={data}
                onToggleItem={handleToggleTaskItem}
                onChangeSubject={handleChangeTaskItemSubject}
                onFinishEditing={handleFinishEditingTaskItem}
                onPressLabel={handlePressTaskItemLabel}
                onRemoveItem={handleRemoveItem}
                editingItemId={editingItemId}
            >
            </TaskList>
            <TextInput placeholder="What's your Task ..." value={task} onChangeText={text => setTask(text)}></TextInput>
            <TouchableOpacity onPress={() => handleTask()}>
              <Text>APPUYE</Text>
            </TouchableOpacity>
            <ThemeToggle/>
            </VStack> 
        </Center>
    )
}

