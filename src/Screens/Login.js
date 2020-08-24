/**
 * Template
 *
 *
 * @Rakesh Gujari
 * @Adapty
 */

import AsyncStorage from '@react-native-community/async-storage';
import React, { Component } from 'react';
import { Dimensions, Image, StatusBar, StyleSheet, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LoginForm from '../Components/Forms/LoginForm';
import NetworkManager from '../Network/NetworkManager';
import { ASYNC_STORAGE_KEYS, NETWORK_CONSTANTS } from '../Utilities/AppConstants';
import AppUtilities from '../Utilities/AppUtilities';
import RNLocalNotifications from 'react-native-local-notifications';

export default class Login extends Component {
  networkManager = new NetworkManager()
  appUtilities = new AppUtilities()
  backHandler = null
  constructor(props) {
    super(props);
    this.state = {
      aspectRatio: 2
    }
  }

  retrieveData = () => {
    AsyncStorage.getItem(ASYNC_STORAGE_KEYS.IS_LOGGED_IN_KEY)
      .then((data) => {
        console.log(" Data retrieved" + data)
        if (data == 1) {
          // this.props.navigation.dispatch(
          //   CommonActions.reset({
          //     index: 1,
          //     routes: [
          //       { name: 'HomePage' },
          //     ],
          //     transitioningFromKey: null
          //   })
          // );
          this.props.navigation.push('HomePage')
        }
      })
  }

  componentDidMount() {
    console.log('Setting default alarm');
    console.disableYellowBox = true;
    this.setState({
      aspectRatio: Dimensions.get('window').height / Dimensions.get('window').width
    })
    console.log('AspectRatio = ' + Dimensions.get('window').height / Dimensions.get('window').width)
    console.log('didMount')
    this.retrieveData()
  }

  render() {
    console.log('render')
    return (
      <KeyboardAwareScrollView bounces={false} contentContainerStyle={{ flex: 1, alignSelf: 'stretch' }} >
        <View style={{ flex: 1, alignSelf: 'stretch' }}>
          <StatusBar barStyle="light-content" />
          <Image source={this.state.aspectRatio > 2 ? require('../Assets/login_background_large.png') : require('../Assets/login_background_small.png')} style={styles.backgroundImage} />
          <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 50 }}>
            <View style={{ justifyContent: 'center', alignSelf: 'stretch', alignItems: 'center', padding: '8%', height: '40%' }}>
              <Text style={{ fontSize: 20, color: 'white', padding: 5 }}>Sign In</Text>
              <Text style={{ fontSize: 12, color: 'white', fontWeight: '300', padding: 5 }}>Sign Up to your account</Text>
            </View>
            <LoginForm
              onLoginButtonClicked={(userName, password) => this.performLogin(userName, password)}
              onSignUpButtonClicked={() => { this.props.navigation.navigate("SignUp") }} />
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }

  performLogin(userName, password) {
    let reqObj = {
      "email": userName,
      "password": password
    }
    this.networkManager.loadPostData((responseJson) => {
      console.log('Response Scuccessfull ' + responseJson)
      if (responseJson && responseJson.success == "true") {
        AsyncStorage.multiSet([[ASYNC_STORAGE_KEYS.IS_LOGGED_IN_KEY, responseJson.data.is_login],[ASYNC_STORAGE_KEYS.NOTIFY_BEFORE_KEY, '1'],[ASYNC_STORAGE_KEYS.IS_SILVER_FLAG, 'false']])
          .then(() => {
            this.props.navigation.replace("HomePage")
          })
      } else {
        this.appUtilities.showAlert(responseJson.message, "OK", null, null, null)
      }
    }, NETWORK_CONSTANTS.PATH_PARAMETERS.LOGIN, reqObj, null, NETWORK_CONSTANTS.BASE_URL)
  }

  /**
   * Dev defined Funcs
   */
}

const styles = StyleSheet.create({
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  }
})
