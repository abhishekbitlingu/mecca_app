import React , { Component } from 'react';
import { Content, Form, Item, Label, Input, Icon, Button, Text } from 'native-base';
import { StyleSheet } from 'react-native';
import AppUtilities from '../../Utilities/AppUtilities';


export default class LoginForm extends Component {
  appUtilities = new AppUtilities()
  constructor(props){
    super(props);
    this.state = {
      userName : '',
      password : ''
    }
  }

  render(){
    return (
      <Content scrollEnabled={false} >
        <Form style ={{alignContent: 'flex-start'}}>
          <Item floatingLabel>
            <Label style={styles.inputLabelStyle} >Email</Label>
            <Input 
            style={styles.inputLabelStyle} 
            defaultValue={this.state.userName} 
            onChangeText={(text)=>this.setState({userName:text})} />
          </Item>
          <Item floatingLabel last>
            <Label style={styles.inputLabelStyle}>Password</Label>
            <Input 
            secureTextEntry 
            style={styles.inputLabelStyle} 
            defaultValue={this.state.password} 
            onChangeText={(text)=>this.setState({password:text})} />
            <Icon fontSize={14} name='eye-with-line' type="Entypo" />
          </Item>
          <Label style= {styles.forgotPasswordLink}>Forgot Password?</Label>

          <Button rounded style={styles.signInButton} onPress={() => this.validateCredentials()}>
            <Text style={{textAlign: 'center'}}>Login</Text>
          </Button>
          <Button rounded bordered style={styles.signUpButton} onPress={()=> this.props.onSignUpButtonClicked()} >
            <Text style={{textAlign: 'center', color: '#0A993C'}}>Sign Up</Text>
          </Button>
        </Form>
      </Content>
    )
  }

  validateCredentials(){
    // do validations
    console.log('validateCredentials called')
    // let hasError = false
    // let errorMessage = ''
    // if (this.state.userName.length == 0) {
    //   hasError = true
    //   errorMessage = "Username cannot be Empty!!"
    // } else if (this.state.password.length<=6) {
    //   hasError = true
    //   errorMessage = "Password length should be more than 6 characters!!"
    // }

    // if (hasError) {
    //   this.appUtilities.showAlert(errorMessage, 'Ok', () => {this.setState({password: ''})})
    // } else {
    //   this.props.onLoginButtonClicked(this.state.userName, this.state.password)
    // }

    this.props.onLoginButtonClicked(this.state.userName, this.state.password)
  }
}

const styles = StyleSheet.create({
  inputLabelStyle: {
    fontSize: 13,
    fontWeight:'600',
    color: '#052911'
  },
  forgotPasswordLink: {
    textAlign:'right',
    fontSize: 12,
    paddingVertical: 8,
    color: 'black'
  },
  signInButton: {
    height: 40,
    backgroundColor: '#0A993C',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginHorizontal: 20

  },
  signUpButton: {
    height: 40,
    borderColor: '#0A993C',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    marginHorizontal: 20
  }
})