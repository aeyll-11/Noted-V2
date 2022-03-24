import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import NotedHome from './screens/noted-home';
import MainScreen from './screens/main';
import AboutScreen from './screens/about-screen';
import ThemeToggle from './components/theme-toggle';

const Drawer = createDrawerNavigator()

const App = () => {
    return (
        <Drawer.Navigator screenOptions={{
            headerStyle:{
                backgroundColor: '#c6cbef'
            },
            drawerStyle:{
                width: 300,
            }
        }}>
            <Drawer.Screen name='Noted' component={NotedHome}/>
            <Drawer.Screen name='TodoList' component={MainScreen} />
            <Drawer.Screen name='About' component={AboutScreen} />
        </Drawer.Navigator>
    )
}

export default App