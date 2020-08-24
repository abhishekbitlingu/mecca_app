import AsyncStorage from '@react-native-community/async-storage';
import { Body, Button, Container, Content, FooterTab, Header, Icon, Right, Title, View, Subtitle } from 'native-base';
import React, { Component } from 'react';
import { BackHandler, Image, ImageBackground, Platform, Text, Dimensions } from 'react-native';
import GetLocation from 'react-native-get-location';
import NetworkManager from '../Network/NetworkManager';
import { ASYNC_STORAGE_KEYS, NETWORK_CONSTANTS } from '../Utilities/AppConstants';
import AppUtilities from '../Utilities/AppUtilities';


export default class HomePage extends Component {
    networkManager = new NetworkManager();
    appUtilities = new AppUtilities();
    backHandler = null
    notifyBefore = 0
    aspectRatio= Dimensions.get('window').height / Dimensions.get('window').width
    constructor(props) {
        super(props);
        this.state = {
            isSilver: false,
            isLoading: true,
            currentDateText: '',
            makkahDirection: 0,
            location: 'amsterdam',
            items: undefined
        }
    }

    getLocation() {

        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 150000,
        })
            .then(location => {
                this.setState({
                    latitude: location.latitude,
                    longitude: location.longitude
                });

                const region = {
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01
                };

                //   RNReverseGeocode.searchForLocations(
                //     'Mumbai',
                //     region,
                //     (err, res) => {
                //         error: err,
                //         addresses: res
                //       });
                //     }
                //   );

                // this.getTimes();
            })
            .catch(ex => {
                const { code, message } = ex;
                console.warn(code, message);
                if (code === 'CANCELLED') {
                    // Alert.alert('Location cancelled by user or by another request');
                }
                if (code === 'UNAVAILABLE') {
                    // Alert.alert('Location service is disabled or unavailable');
                }
                if (code === 'TIMEOUT') {
                    // Alert.alert('Location request timed out');
                }
                if (code === 'UNAUTHORIZED') {
                    // Alert.alert('Authorization denied');
                }
                this.setState({
                    latitude: null,
                    longitude: null
                });
            });
    }

    compareDateWithCurrentDate(dateString, timeString) {
        let timeArr = timeString.split(':')
        let currentDate = new Date();
        let eventDate = new Date(dateString);
        eventDate.setHours(timeArr[0])
        eventDate.setMinutes(timeArr[1])
        return currentDate.getTime() <= eventDate.getTime()
    }

    componentDidMount() {
        AsyncStorage.multiGet([ASYNC_STORAGE_KEYS.NOTIFY_BEFORE_KEY, ASYNC_STORAGE_KEYS.IS_SILVER_FLAG])
            .then((data) => {
                console.log('Async data = ' + JSON.stringify(data));
                this.notifyBefore = data[0][1],
                this.setState({
                    isSilver: data[1][1] == "true"
                })
            })
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.onBackClick)
        setTimeout(() => {
            this.getTimes()
        }, 250);
    }

    calculateDayText(dateString) {
        let date = new Date(dateString);
        let day;
        let month;
        switch (date.getDay()) {
            case 0:
                day = 'Sunday';
                break;
            case 1:
                day = 'Monday';
                break;
            case 2:
                day = 'Tueday';
                break;
            case 3:
                day = 'Wednesday';
                break;
            case 4:
                day = 'Thursday';
                break;
            case 5:
                day = 'Friday';
                break;
            case 6:
                day = 'Saturday';
                break;
        }

        switch (date.getMonth()) {
            case 0:
                month = 'January';
                break;
            case 1:
                month = 'February';
                break;
            case 2:
                month = 'March';
                break;
            case 3:
                month = 'April';
                break;
            case 4:
                month = 'May';
                break;
            case 5:
                month = 'June';
                break;
            case 6:
                month = 'July';
                break;
            case 7:
                month = 'August';
                break;
            case 8:
                month = 'September';
                break;
            case 9:
                month = 'October';
                break;
            case 10:
                month = 'November';
                break;
            case 11:
                month = 'December';
                break;
        }
        return day + " " + month + " " + date.getDate() + " " + date.getFullYear()
    }

    reformatDate(date) {
        let dateArr = date.split('-')
        for (let i = 0; i < dateArr.length; i++) {
            if (dateArr[i].length == 1) {
                dateArr[i] = String(dateArr[i].padStart(2, '0'))
            }
        }
        return dateArr.join("-")
    }

    convertTo24HourFormat(time) {
        let hours = Number(time.match(/^(\d+)/)[1]);
        let minutes = Number(time.match(/:(\d+)/)[1]);
        let AMPM = time.match(/\s(.*)$/)[1];
        if (AMPM == "pm" && hours < 12) hours = hours + 12;
        if (AMPM == "am" && hours == 12) hours = hours - 12;
        let sHours = hours.toString();
        let sMinutes = minutes.toString();
        if (hours < 10) sHours = "0" + sHours;
        if (minutes < 10) sMinutes = "0" + sMinutes;
        return sHours + ":" + sMinutes
    }

    getTimes() {
        let endPoint = this.state.location + NETWORK_CONSTANTS.PATH_PARAMETERS.GET_TIMINGS
        this.networkManager.loadData((responseJson) => this.onSuccessResponse(responseJson), endPoint, null, NETWORK_CONSTANTS.PATH_PARAMETERS.GET_TIMINGS_BASE_URL)
    }

    onSuccessResponse(responseJson) {
        let dateText = this.calculateDayText(this.reformatDate(responseJson.items[0].date_for))
        let processedItems = []
        for (let i = 0; i < 8; i++) {
            let arr = []
            let date = this.reformatDate(responseJson.items[i].date_for)
            let time = this.convertTo24HourFormat(responseJson.items[i].fajr)
            let flag = this.compareDateWithCurrentDate(date, time)
            let item = {
                date: date,
                title: 'Fajr',
                time: time,
                isNext: flag
            }
            arr.push(item)
            date = this.reformatDate(responseJson.items[i].date_for)
            time = this.convertTo24HourFormat(responseJson.items[i].shurooq)
            flag = this.compareDateWithCurrentDate(date, time)
            item = {
                date: date,
                title: 'Sunrise',
                time: time,
                isNext: flag
            }
            arr.push(item)
            date = this.reformatDate(responseJson.items[i].date_for)
            time = this.convertTo24HourFormat(responseJson.items[i].dhuhr)
            flag = this.compareDateWithCurrentDate(date, time)
            item = {
                date: date,
                title: 'Dhuhr',
                time: time,
                isNext: flag
            }
            arr.push(item)
            date = this.reformatDate(responseJson.items[i].date_for)
            time = this.convertTo24HourFormat(responseJson.items[i].asr)
            flag = this.compareDateWithCurrentDate(date, time)
            item = {
                date: date,
                title: 'Asr',
                time: time,
                isNext: flag
            }
            arr.push(item)
            date = this.reformatDate(responseJson.items[i].date_for)
            time = this.convertTo24HourFormat(responseJson.items[i].maghrib)
            flag = this.compareDateWithCurrentDate(date, time)
            item = {
                date: date,
                title: 'Maghrib',
                time: time,
                isNext: flag
            }
            arr.push(item)
            date = this.reformatDate(responseJson.items[i].date_for)
            time = this.convertTo24HourFormat(responseJson.items[i].isha)
            flag = this.compareDateWithCurrentDate(date, time)
            item = {
                date: date,
                title: 'Isha',
                time: time,
                isNext: flag
            }
            arr.push(item)
            processedItems.push(arr)
        }

        // Remove the existing Notifications
        this.appUtilities.clearAllNotifications();
        //set the local notification by looping the responseJson.items[]
        this.appUtilities.setNewNotifications(processedItems, this.notifyBefore);
        this.setState({
            isLoading: false,
            currentDateText: dateText,
            makkahDirection: responseJson.qibla_direction,
            location: responseJson.city + ", " + responseJson.state + ", " + responseJson.country,
            items: processedItems
        });
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }

    onBackClick = () => {
        return true
    }


    render() {
        let array
        let activeItem
        let anotherActiveItem
        if (this.state.items) {
            array = this.state.items[0]
            if (array && array.length > 0) {
                activeItem = array.filter((item) => {
                    return item.isNext
                })
                if (activeItem.length == 0 && this.state.items[1]) {
                    anotherActiveItem = this.state.items[1].filter((item) => {
                        return item.isNext
                    })
                }
            }
        } else {
            array = []
        }
        return (
            <Container>
                <Header transparent style={{marginTop: Platform.OS == 'android' ? 15 : 0}}>
                    <Body style={{ flex: 1, alignSelf: 'stretch', justifyContent: 'center' }}>
                        <Title style={{ alignSelf: 'center', color: 'black', }}>Alfajr Gebedstijden</Title>
                        <Subtitle style={{ fontSize: 14, alignSelf: 'center', color: 'black', padding: 2 }}>Mede mogelijk gemaakt door: Islam Producten</Subtitle>
                    </Body>
                    <Right transparent active style={{ flex: 0, alignItems: 'center' }}>
                        <Button
                            rounded
                            onPress={() => {
                                AsyncStorage.setItem(ASYNC_STORAGE_KEYS.IS_SILVER_FLAG, (this.state.isSilver) ? "false" : "true") 
                                this.setState({
                                    isSilver: !this.state.isSilver
                                })
                            }}
                            style={{
                                alignSelf: 'stretch',
                                width: 30,
                                height: 30,
                                justifyContent: 'center',
                                backgroundColor: '#0A993C',
                                paddingBottom: 2
                            }}>
                            <Icon name='ios-shuffle'
                                type='Ionicons'
                                style={{
                                    fontSize: 20,
                                    color: 'white',
                                    width: '100%',
                                    height: '100%',
                                    alignSelf: 'stretch',
                                    paddingTop: -0,
                                    paddingLeft: 1
                                }} />
                        </Button>
                    </Right>
                </Header>
                <Content bounces={false} contentContainerStyle={{ flex: 1 }}>
                    {!this.state.isLoading &&
                        <View style={{ flex: 1, marginTop: this.aspectRatio < 1.8 ? 0 : 50 }}>
                            <Image source={this.state.isSilver ? require('./../Assets/silver_frame.png') : require('./../Assets/golden_frame.png')} resizeMode={this.aspectRatio < 1.8 ? 'contain' : 'cover'} style={{ position: 'absolute', top: 0, height: '100%', width: '100%', paddingRight: 3 }} />
                            <Image source={require('./../Assets/islam.png')} resizeMode='contain' style={{ position: 'absolute', top: 50, alignSelf: 'center', alignItems: 'center', width: '12%' }} />
                            {/* <View style={{ position: 'absolute', top: 148, alignSelf: 'center', flexDirection: 'row' }}>
                                <Icon name='location' type='Entypo' style={{ fontSize: 12, justifyContent: 'center', paddingHorizontal: 5 }} />
                                <Text style={{ textAlign: 'center', fontSize: 10, fontWeight: '300' }}>{this.state.location}</Text>
                            </View> */}
                            <Image source={require('./../Assets/rectangle_background.png')} resizeMode="contain" style={{ position: 'absolute', top: 145, alignSelf: 'center', height: 160 }} />

                            <View style={{ position: 'absolute', alignSelf: 'center', alignContent: 'center', marginTop: 190 }}>
                                <View style={{ alignSelf: 'center' }}>
                                    <Text style={{ textAlign: 'center', fontSize: 12, padding: 5, fontWeight: '500' }}>{(activeItem && activeItem.length > 0) ? activeItem[0].title : anotherActiveItem[0].title}</Text>
                                    <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: '700' }}>{(activeItem && activeItem.length > 0) ? activeItem[0].time : anotherActiveItem[0].time}</Text>
                                    <Text style={{ textAlign: 'center', fontSize: 12, padding: 5, fontWeight: '300' }}>{(activeItem && activeItem.length > 0) ? this.calculateDayText(this.reformatDate(activeItem[0].date)) : this.calculateDayText(this.reformatDate(anotherActiveItem[0].date))}</Text>
                                </View>
                            </View>
                            <View style={{ marginHorizontal: 70, marginTop: 300 }}>
                                {
                                    this.state.items[0].map((item, index) => {
                                        return <View key={index} style={{ height: 30, margin: this.aspectRatio < 1.8 ? 3 : 5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                                            <Text style={{ flex: 1, fontWeight: '700' }}>{item.title}</Text>
                                            <ImageBackground source={require('./../Assets/rectangle_small.png')} style={{ width: 70, height: 70, justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={{ fontWeight: 'bold' }}>{item.time}</Text>
                                            </ImageBackground>
                                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                                                <Image source={activeItem && activeItem.length > 0 && activeItem[0].title == item.title ? require('./../Assets/active_bulb.png') : require('./../Assets/inactive_bulb.png')} style={{ height: activeItem && activeItem.length > 0 && activeItem[0].title == item.title ? 8 : 30, width: activeItem && activeItem.length > 0 && activeItem[0].title == item.title ? 8 : 30, marginRight: activeItem && activeItem.length > 0 && activeItem[0].title == item.title ? 11 : 0 }} />
                                                <Text></Text>
                                            </View>
                                        </View>
                                    })
                                }
                            </View>
                            <FooterTab style={{backgroundColor: 'transparent'}}>
                                <Button style={{ flex: 1, height: 40, alignSelf: 'flex-end' }} onPress={() => this.props.navigation.navigate('DirectionsScreen', { needle: this.state.makkahDirection, activeItem: activeItem && activeItem.length > 0 ? activeItem[0] : anotherActiveItem[0] })}>
                                    <Icon name="compass" type='MaterialCommunityIcons' style={{ color: 'white' }} />
                                </Button>
                                <Button disabled transparent contentContainerStyle={{ backgroundColor: 'transparent', alignSelf: 'flex-end' }} style={{ flex: 0, alignSelf: 'flex-end', height: Platform.OS == 'android' ? '40%' : this.aspectRatio < 1.8 ? '75%' :'65%', backgroundColor: '#0A993C', paddingHorizontal: 13, borderTopLeftRadius: 30, borderTopRightRadius: 30, shadowColor: 'white' }} >
                                    <Image source={require('./../Assets/islam_button.png')} style={{ height: 30, width: 25, paddingHorizontal: 20 }} />
                                </Button>
                                <Button style={{ flex: 1, height: 40, alignSelf: 'flex-end' }} onPress={() => {
                                    this.props.navigation.navigate('SettingsScreen', { data: this.state.items })
                                }}>
                                    <Icon name="settings" style={{ color: 'white' }} />
                                </Button>
                            </FooterTab>

                        </View>
                    }
                </Content>
                {/* <Footer>
                    
                </Footer> */}
            </Container>
        );
    }
}