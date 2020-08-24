import React, {Component } from 'react';

import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Animated,
    Easing
} from 'react-native';
import {COLORS} from '../Utilities/AppConstants'

const WINDOW_WIDTH = Dimensions.get('window').width;

import RootSiblings from 'react-native-root-siblings';
import { Spinner } from 'native-base';

let loadingView = null;
let timer = null;
let rotationAnim = new Animated.Value(0);

function _initializeRotationAnimation() {
    rotationAnim.setValue(0);

    Animated.timing(rotationAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear
    }).start(() => {
        if (loadingView) {
            _initializeRotationAnimation();
        }
    });
}

/**
 * 
 */
export function showHUDLoading() {
    const hud = (
        <View style={{top: 0,right: 0,bottom: 0,left: 0,backgroundColor: 'transparent', position: 'absolute', alignSelf: 'center', alignItems: 'center', justifyContent: 'center', marginTop: 90}}>
            <View style={{alignSelf: 'center', height: 70, width: 70, justifyContent:'center'}}>
                <Spinner color={COLORS.APP_DEFAULT_COLOR} />
            </View>
        </View>
    );

    if (timer) {
        clearTimeout(timer);
    }

    if (loadingView) {
        loadingView.update(hud);
    }
    else {
        loadingView = new RootSiblings(hud);
    }
    _initializeRotationAnimation();
}

/**
 * 
 */
export function hidenHUDLoading() {
    if (loadingView) {
        console.log('Destroying loader')
        loadingView.destroy();
        loadingView = null;
    }
    console.log('hidenHUDLoading');
}

export function showHUDMessage(message) {
    if (typeof message !== 'string') {
        return;
    }

    const hud = (
        <View style={styles.maskView}>
            <View style={[styles.textContainer, styles.shadowStyle]}>
                <Text style={styles.textStyle}>{message}</Text>
            </View>
        </View>
    );

    if (timer) {
        clearTimeout(timer);
    }

    if (loadingView) {
        loadingView.update(hud);
    }
    else {
        loadingView = new RootSiblings(hud);
    }

    timer = setTimeout(() => hidenHUDLoading(), 2500);
}


const styles = StyleSheet.create({
    maskView: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0)',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },
    textContainer: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginHorizontal: 0.1 * WINDOW_WIDTH,
        backgroundColor: 'rgba(20,20,20,0.9)',
        borderRadius: 6
    },
    shadowStyle: {
        shadowColor: '#000',
        shadowOffset: {
            width: 4,
            height: 4
        },
        shadowOpacity: 0.7,
        shadowRadius: 6
    },
    textStyle: {
        fontSize: 14,
        color: '#fff',
        textAlign: 'center',
        letterSpacing: 0.5,
        lineHeight: 18
    },
    iconContainer: {
        padding: 15,
        backgroundColor: 'rgba(20,20,20,0.9)',
        borderRadius: 6
    },
    iconStyle: {
        width: 48,
        height: 48,
        tintColor: '#fcfcfc',
        transform: [{
            rotate: rotationAnim.interpolate({
                inputRange: [0, 1], 
                outputRange: ['0deg', '360deg']
            })
        }]
    }
});