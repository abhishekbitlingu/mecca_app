import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import DirectionsScreen from '../Screens/DirectionsScreen';
import HomePage from '../Screens/HomePage';
import Login from '../Screens/Login';
import SignUp from '../Screens/SignUp';
import SettingsScreen from '../Screens/SettingsScreen';



const Stack = createStackNavigator();
const RootNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={Login} options={{
                    header: () => null,
                    gestureEnabled: false
                }} />
                <Stack.Screen name="SignUp" component={SignUp} options={{
                    header: () => null,
                    gestureEnabled: false
                }} />
                <Stack.Screen name="HomePage" component={HomePage} options={{
                    header: () => null,
                    gestureEnabled: false
                }} />
                <Stack.Screen name="DirectionsScreen" component={DirectionsScreen} options={{
                    header: () => null,
                    gestureEnabled: false
                }} />
                <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{
                    header: () => null,
                    gestureEnabled: false
                }} />
            </Stack.Navigator>
        </NavigationContainer>
    )

}


export default RootNavigator