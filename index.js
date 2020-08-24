/**
 * @format
 */
import 'react-native-gesture-handler';
import * as React from 'react';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import RootNavigator from './src/Navigation/Navigator'

const App = () => {
    return (<RootNavigator></RootNavigator>) 
    }

AppRegistry.registerComponent(appName, () => App);
