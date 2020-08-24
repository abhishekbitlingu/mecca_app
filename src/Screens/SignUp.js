/**
 * Template
 *
 *
 * @Rakesh Gujari
 * @Adapty
 */

import { CommonActions } from '@react-navigation/native';
import React, { Component } from 'react';
import { Dimensions, Image, StatusBar, StyleSheet, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SignUpForm from '../Components/Forms/SignUpForm';
import NetworkManager from '../Network/NetworkManager';
import { NETWORK_CONSTANTS, ASYNC_STORAGE_KEYS } from '../Utilities/AppConstants';
import AppUtilities from '../Utilities/AppUtilities';
import AsyncStorage from '@react-native-community/async-storage';

export default class Login extends Component {
  networkManager = new NetworkManager()
  appUtilities = new AppUtilities()
  constructor(props) {
    super(props);
    this.state = {
      aspectRatio: 2
    }
  }

  componentDidMount() {
    this.setState({
      aspectRatio: Dimensions.get('window').height / Dimensions.get('window').width
    })
    console.log('AspectRatio = ' + Dimensions.get('window').height / Dimensions.get('window').width)
    console.disableYellowBox = true;
  }

  render() {
    return (
      <KeyboardAwareScrollView bounces={false} contentContainerStyle={{ flex: 1, alignSelf: 'stretch' }} >
        <View style={{ flex: 1, alignSelf: 'stretch' }}>
          <StatusBar barStyle="light-content" />
          <Image source={this.state.aspectRatio > 2 ? require('../Assets/login_background_large.png') : require('../Assets/login_background_small.png')} style={styles.backgroundImage} />
          <View style={{ flex: 1 }}>
            <View style={{ flex: 3, justifyContent: 'center', alignItems: 'flex-end', alignItems: 'center' }}>
              <Text style={{ fontSize: 20, color: 'white', padding: 5 }}>Sign Up</Text>
              <Text style={{ fontSize: 12, color: 'white', fontWeight: '300', padding: 5 }}>Sign Up to your account</Text>
            </View>
            <View style={{ flex: 7, justifyContent: 'flex-end', paddingHorizontal: 50 }}>
              <SignUpForm onSignInClick={() => { this.props.navigation.pop() }}
                onSignUpButtonClicked={(data) => { this.performSignUp(data) }} />
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }

  performSignUp(obj) {
    let reqObj = {
      first_name: obj.firstName,
      "last_name": obj.lastName,
      "phone": obj.phone,
      "email": obj.email,
      "password": obj.createPassword,
      "cnfm_password": obj.confirmPassword
    }
    console.log("requestObj = " + JSON.stringify(reqObj))
    this.networkManager.loadPostData((responseJson) => {
      console.log('Response Scuccessfull ' + JSON.stringify(responseJson))
      // this.props.navigation.navigate("HomePage")
      if (responseJson && responseJson.success == "true") {
        //Save user credentials to Shared Preferences
        this.appUtilities.showAlert(responseJson.message, "OK", () => {
          AsyncStorage.multiSet([[ASYNC_STORAGE_KEYS.IS_LOGGED_IN_KEY, '1'],[ASYNC_STORAGE_KEYS.NOTIFY_BEFORE_KEY, '1'],[ASYNC_STORAGE_KEYS.IS_SILVER_FLAG, 'false']])
          .then(() => {
            this.props.navigation.replace("HomePage")
          })
          this.props.navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [
                { name: 'HomePage' },
              ],
            })
          );
        }, null)
      } else {
        this.appUtilities.showAlert(responseJson.message, "OK", () => { }, null)
      }
    }, NETWORK_CONSTANTS.PATH_PARAMETERS.SIGN_UP, reqObj, null, NETWORK_CONSTANTS.BASE_URL)
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
