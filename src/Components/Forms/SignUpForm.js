import React, { Component } from 'react';
import { Content, Form, Item, Label, Input, Icon, Button, Text } from 'native-base';
import { StyleSheet } from 'react-native';
import AppUtilities from '../../Utilities/AppUtilities';


export default class SignUpForm extends Component {
  appUtilities = new AppUtilities()
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      createPassword: '',
      confirmPassword: '',
    }
  }

  render() {
    return (
      <Form style={{ alignContent: 'flex-start' }}>
        <Item floatingLabel>
          <Label style={styles.inputLabelStyle} >First Name</Label>
          <Input style={styles.inputLabelStyle} defaultValue={this.state.firstName} onChangeText={(text) => this.setState({ firstName: text })} />
        </Item>
        <Item floatingLabel>
          <Label style={styles.inputLabelStyle} >Last Name</Label>
          <Input style={styles.inputLabelStyle} defaultValue={this.state.lastName} onChangeText={(text) => this.setState({ lastName: text })} />
        </Item>
        <Item floatingLabel>
          <Label style={styles.inputLabelStyle} >Email</Label>
          <Input style={styles.inputLabelStyle} defaultValue={this.state.email} onChangeText={(text) => this.setState({ email: text })} />
        </Item>
        <Item floatingLabel>
          <Label style={styles.inputLabelStyle} >Phone Number</Label>
          <Input style={styles.inputLabelStyle} defaultValue={this.state.phone} onChangeText={(text) => this.setState({ phone: text })} />
        </Item>
        <Item floatingLabel>
          <Label style={styles.inputLabelStyle} >Create Password</Label>
          <Input secureTextEntry style={styles.inputLabelStyle} defaultValue={this.state.createPassword} onChangeText={(text) => this.setState({ createPassword: text })} />
          <Icon fontSize={14} name='ios-lock' type="Ionicons" />
        </Item>
        <Item floatingLabel last>
          <Label style={styles.inputLabelStyle}>Confirm Password</Label>
          <Input secureTextEntry style={styles.inputLabelStyle} defaultValue={this.state.confirmPassword} onChangeText={(text) => this.setState({ confirmPassword: text })} />
          <Icon fontSize={8} name='ios-lock' type="Ionicons" />
        </Item>
        <Button rounded style={styles.signUpButton}>
          <Text style={{ textAlign: 'center' }} onPress={() => { this.performValidation() }}>Sign Up</Text>
        </Button>
        <Button rounded bordered style={styles.signInButton} onPress={() => { this.props.onSignInClick() }}>
          <Text style={{ textAlign: 'center', color: '#0A993C' }}>Sign In</Text>
        </Button>
      </Form>
    )
  }
  

  performValidation() {
    // do validations
    // console.log('validateCredentials called')
    // let hasError = false
    // let errorMessage = ''
    // if (this.state.firstName.length == 0) {
    //   hasError = true
    //   errorMessage = "First name cannot be Empty..!!"
    // } else if (this.state.lastName.length == 0) {
    //   hasError = true
    //   errorMessage = "Last name cannot be Empty..!!"
    // } else if (this.state.email.length == 0) {
    //   hasError = true
    //   errorMessage = "Email cannot be empty!!"
    // } else if (!this.appUtilities.validateEmail(this.state.email)) {
    //   hasError = true
    //   errorMessage = "Please enter a valid email..!!"
    // } else if (this.state.phone.length < 10) {
    //   hasError = true
    //   errorMessage = "Phone number cannot be less than 10 digits..!!"
    // } else if (this.state.createPassword.length <=6) {
    //   hasError = true
    //   errorMessage = "Password should contain more than 6 characters..!!"
    // } else if (this.state.confirmPassword.length <= 6) {
    //   hasError = true
    //   errorMessage = "Password should contain more than 6 characters..!!"
    // } else if (this.state.createPassword.length != this.state.confirmPassword.length) {
    //   hasError = true
    //   errorMessage = "Passwords do not match..!!"
    // }

    // if (hasError) {
    //   this.appUtilities.showAlert(errorMessage, 'Ok', () => { this.setState({ createPassword: '', confirmPassword: '', email: '' }) })
    // } else {
    //   this.props.onSignUpButtonClicked(this.state)
    // }

    this.props.onSignUpButtonClicked(this.state)
  }
}

const styles = StyleSheet.create({
  inputLabelStyle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#052911',
  },
  forgotPasswordLink: {
    textAlign: 'right',
    fontSize: 12,
    paddingVertical: 8,
    color: 'black'
  },
  signUpButton: {
    height: 40,
    backgroundColor: '#0A993C',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginHorizontal: 20

  },
  signInButton: {
    height: 40,
    borderColor: '#0A993C',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    marginHorizontal: 20,
    marginBottom: 20
  }
})