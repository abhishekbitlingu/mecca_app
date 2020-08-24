/**
 * Template
 *
 *
 * @Rakesh Gujari
 * @Adapty
 */

import { Body, Button, Card, CardItem, Header, Icon, Left, Right, Text, Title } from 'native-base';
import React, { Component } from 'react';
import { Dimensions, Image, StatusBar, StyleSheet, View, BackHandler } from 'react-native';
import RNSimpleCompass from 'react-native-simple-compass';
import NetworkManager from '../Network/NetworkManager';
import { COLORS } from '../Utilities/AppConstants';
import AppUtilities from '../Utilities/AppUtilities';

export default class DirectionsScreen extends Component {
    networkManager = new NetworkManager()
    appUtilities = new AppUtilities()
    backHandler = null
    constructor(props) {
        super(props);
        this.state = {
            activeItem : props.route.params.activeItem,
            needle: Number(props.route.params.needle),
            currentHeading: 0,
            aspectRatio: 2
        }
        console.log('needle value is' + JSON.stringify(props.route.params.activeItem))
    }
    
    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.onBackClick)

        this.setState({
            aspectRatio: Dimensions.get('window').height / Dimensions.get('window').width
        })
        console.log('AspectRatio = ' + Dimensions.get('window').height / Dimensions.get('window').width)

        if (RNSimpleCompass) {
            const degree_update_rate = 1; // Number of degrees changed before the callback is triggered
            RNSimpleCompass.start(degree_update_rate, (degree) => {
                console.log('You are facing', degree);
                this.setState({ currentHeading: degree })
            });
        }
    }

    componentWillUnmount() {
        if (RNSimpleCompass) {
            RNSimpleCompass.stop();
        }
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
                    <Left style={{ flex: 0, paddingHorizontal: 8 }}>
                        <Button transparent>
                            <Icon name='arrow-back' style={{ fontSize: 22, color: 'white' }} onPress={() => { this.props.navigation.pop() }} />
                        </Button>
                    </Left>
                    <Body style={{ flex: 1, alignSelf: 'stretch', justifyContent: 'center' }}>
                        <Title style={{ alignSelf: 'center', color: 'white' }}>Qbila Directions</Title>
                    </Body>
                    <Right transparent active style={{ flex: 0, alignItems: 'center' }}>

                    </Right>
                </Header>
                <View bounces={false} style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between', marginTop: 200, marginBottom: 50 }}>
                    <Card>
                        <CardItem style={{ flexDirection: 'column', }}>
                            <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', paddingHorizontal: 30 }}>
                                <Icon name='location-arrow' type='FontAwesome5' style={{ fontSize: 14, textAlign: 'center', color: COLORS.APP_DEFAULT_COLOR }} />
                                <Text style={{ fontSize: 18, fontWeight: '600' }}>Alfajr Gebedstijden</Text>
                            </View>
                            <Text style={{ fontWeight: '300' }}>
                                {this.state.needle} Degree from North</Text>
                        </CardItem>
                    </Card>
                    <View style={{ alignSelf: 'center', alignItems: 'center', justifyContent: 'center', alignContent: 'center' }}>
                        <Image source={require('./../Assets/compass_outer_ring.png')}
                            style={{
                                aspectRatio: 1,
                                width: Dimensions.get('window').width - 40,
                                height: Dimensions.get('window').width - 40,
                                alignSelf: 'center',
                                transform: [{ rotate: 360 - this.state.currentHeading + "deg" }]
                            }} />
                    <Image source={require('./../Assets/compass_needle.png')} resizeMode="contain" style={{ position: 'absolute', width: '33%', height: '33%', alignSelf: 'center', transform: [{ rotate: 360 - this.state.currentHeading + 45 + this.state.needle + "deg" }] }} />
                    </View>


                </View>
            </View>
        );
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
