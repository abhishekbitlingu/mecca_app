/**
 * Template
 *
 *
 * @Rakesh Gujari
 * @Adapty
 */

import { Body, Button, Card, CardItem, Content, Header, Icon, Left, Picker, Right, Text, Title } from 'native-base';
import React, { Component } from 'react';
import { BackHandler, Dimensions, Image, StatusBar, StyleSheet, View } from 'react-native';
import NetworkManager from '../Network/NetworkManager';
import AppUtilities from '../Utilities/AppUtilities';
import AsyncStorage from '@react-native-community/async-storage';
import { ASYNC_STORAGE_KEYS } from '../Utilities/AppConstants';
import { CommonActions } from '@react-navigation/native';

export default class SettingsScreen extends Component {
    networkManager = new NetworkManager()
    appUtilities = new AppUtilities()
    backHandler = null
    constructor(props) {
        super(props);
        this.state = {
            // activeItem : props.route.params.activeItem,
            selected: undefined,
            aspectRatio: 2
        }
    }

    componentDidMount() {
        AsyncStorage.getItem(ASYNC_STORAGE_KEYS.NOTIFY_BEFORE_KEY)
        .then((data) => {
            console.log('Selected Value is : ' + data);
            this.setState({selected: data})
        })
        // fetch selected value here
        // this.setState({selected: '0'})
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.onBackClick)

        this.setState({
            aspectRatio: Dimensions.get('window').height / Dimensions.get('window').width
        })
        console.log('AspectRatio = ' + Dimensions.get('window').height / Dimensions.get('window').width)
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }

    onBackClick = () => {
        this.props.navigation.goBack()
        return true
    }

    render() {
        return (
            <View style={{ flex: 1, alignSelf: 'stretch' }}>
                <StatusBar barStyle="light-content" />
                <Image source={this.state.aspectRatio > 2 ? require('../Assets/login_background_large.png') : require('../Assets/login_background_small.png')} style={styles.backgroundImage} />
                <Header transparent>
                    <Left style={{ flex: 0, marginHorizontal: 8}}>
                        <Button transparent>
                            <Icon name='arrow-back' style={{ fontSize: 22, color: 'white' }} onPress={() => { this.props.navigation.goBack() }} />
                        </Button>
                    </Left>
                    <Body style={{ flex: 1, alignSelf: 'stretch', justifyContent: 'center' }}>
                        <Title style={{ alignSelf: 'center', color: 'white' }}>Settings</Title>
                    </Body>
                    <Right transparent active style={{ flex: 0, alignItems: 'center', width: 35, alignSelf: 'stretch' }}>

                    </Right>
                </Header>
                <Content contentContainerStyle={{ flex: 1, justifyContent: 'space-between', alignItems: 'center', alignSelf: 'stretch' }}>
                    <View style={{ alignSelf: 'stretch', marginHorizontal: 10, marginTop: 160 }}>
                        <Card >
                            <CardItem style={{ alignSelf: 'stretch', justifyContent: 'space-between' }}>
                                <Text style={{ alignSelf: 'center', paddingHorizontal: 0 }}>Notify me before : </Text>
                                <Picker
                                    style={{ alignSelf: 'flex-end' }}
                                    renderHeader={backAction =>
                                        <Header style={{ backgroundColor: '#0A993C' }}>
                                            <Left style={{ flex: 0, paddingHorizontal: 8 }}>
                                                <Button transparent onPress={backAction}>
                                                    <Icon name="arrow-back" style={{ fontSize: 22, color: 'white' }} />
                                                </Button>
                                            </Left>
                                            <Body style={{ flex: 3 }}>
                                                <Title style={{ color: "#fff" }}>Notify me before</Title>
                                            </Body>
                                            <Right transparent active style={{ flex: 0, alignItems: 'center', width: 35, alignSelf: 'stretch' }} />
                                        </Header>}
                                    mode="dropdown"
                                    iosIcon={<Icon name="arrow-down" />}
                                    placeholder="Notify me before"
                                    placeholderIconColor="white"
                                    itemStyle={{ marginLeft: 0, paddingHorizontal: 10, color: 'white' }}
                                    itemTextStyle={{ flex: 1, alignSelf: 'center', textAlign: 'left', marginRight: -80 }}
                                    selectedValue={this.state.selected}
                                    onValueChange={(value) => { this.onNotifyBeforePickerItemValueChange(value)}}
                                >
                                    <Picker.Item label="Never" value={'0'} />
                                    <Picker.Item label="5 minutes" value={'1'} />
                                    <Picker.Item label="10 minutes" value={'2'} />
                                    <Picker.Item label="15 minutes" value={'3'} />
                                    <Picker.Item label="20 minutes" value={'4'} />
                                    <Picker.Item label="25 minutes" value={'5'} />
                                    <Picker.Item label="30 minutes" value={'6'} />
                                </Picker>
                            </CardItem>
                        </Card>
                    </View>

                    <Button rounded bordered style={styles.signInButton} onPress={() => this.onLogOutClicked()} >
                        <Text style={{ textAlign: 'center', color: 'white', alignSelf: 'center' }}>LogOut</Text>
                    </Button>

                </Content>
            </View>
        );
    }

    onNotifyBeforePickerItemValueChange(value) {
        this.setState({ selected: value })
        AsyncStorage.setItem(ASYNC_STORAGE_KEYS.NOTIFY_BEFORE_KEY, value)
        this.appUtilities.clearAllNotifications()
        this.appUtilities.setNewNotifications(this.props.route.params.data, value)
    }

    onLogOutClicked() {
        // Delete all the preExisting Notifications and then logout
        this.appUtilities.clearAllNotifications()
        AsyncStorage.multiRemove([ASYNC_STORAGE_KEYS.IS_LOGGED_IN_KEY, ASYNC_STORAGE_KEYS.NOTIFY_BEFORE_KEY, ASYNC_STORAGE_KEYS.IS_SILVER_FLAG])
            .then(() => {
                this.props.navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [
                            { name: 'Login' },
                        ],
                    })
                );
            })
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
    },
    signInButton: {
        height: 45,
        backgroundColor: '#0A993C',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20,
        alignSelf: 'stretch'
    },
})
