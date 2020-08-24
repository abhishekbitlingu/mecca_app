/*
  All App Utilities defined here.
  Rakesh Gujari
*/
import { Alert } from 'react-native'
import RNLocalNotifications from 'react-native-local-notifications'
import { ERROR_MESSAGES } from './AppConstants'
import { showHUDLoading, hidenHUDLoading } from '../Libraries/UniversalLoader'
export default class AppUtilities {

  showAlert(message, positiveButtonText, onPositiveButtonPress, negativeButtonText, onNegativeButtonPress) {
    let buttonArray = []
    buttonArray.push({ text: (positiveButtonText) ? positiveButtonText : 'Ok', onPress: () => { (onPositiveButtonPress) ? onPositiveButtonPress() : console.log('On Ok pressed function not available') } })
    if (negativeButtonText) {
      buttonArray.push({ text: (negativeButtonText) ? negativeButtonText : 'Cancel', onPress: () => { (onNegativeButtonPress) ? onNegativeButtonPress() : console.log('On Cancel pressed function not available') } })
    }
    Alert.alert(
      'Alert',
      (message) ? message : ERROR_MESSAGES.DEFAULT_MESSAGE,
      buttonArray
    )
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  getMinutes(notifyBefore) {
    switch (notifyBefore) {
      case '1':
        return 5;
      case '2':
        return 10;
      case '3':
        return 15;
      case '4':
        return 20;
      case '5':
        return 25;
      case '6':
        return 30;
      default:
        return 0;
    }
  }

  getNotificationTime(date, time, minBefore) {
    console.log('getNotificationTime date : ' + date + ' time : ' + time + ' notifyBefore : ' + minBefore);
    let notificationDate = new Date(date);
    let timeArr = time.split(':')
    notificationDate.setHours(timeArr[0])
    notificationDate.setMinutes(timeArr[1])
    console.log('getNotificationTime cnotificationDate = ' + notificationDate)
    notificationDate.setMinutes(notificationDate.getMinutes() - minBefore)
    let currentDate = new Date();
    console.log('getNotificationTime currentDate.getTime() = ' + currentDate.getTime())
    console.log('getNotificationTime notificationDate.getTime() = ' + notificationDate)
    if ((currentDate.getTime() < notificationDate.getTime())) {
      console.log('getNotificationTime returning from true')
      // time belongs to future
      return notificationDate.getFullYear() + "-" + (notificationDate.getMonth() + 1) + "-" + notificationDate.getDate() + " " + notificationDate.getHours() + ":" + notificationDate.getMinutes();
    } else {
      return null;
      // time has already passed
    }
  }

  clearAllNotifications() {
    showHUDLoading();
    // Total notifications will always be maximum of 48
    for (let i = 1; i <= 48; i++) {
      console.log('Clearing the Notifications for id = ' + i);
      RNLocalNotifications.deleteNotification(i);
    }
    hidenHUDLoading();
  }

  setNewNotifications(items, notifyBefore) {
    showHUDLoading();
    let id = 1
    for (let i = 0; i < items.length; i++) {
      let itemsForSingleDay = items[i]
      for (let j = 0; j < itemsForSingleDay.length; j++) {
        let item = itemsForSingleDay[j]
        //calculate the data here
        console.log('setNewNotifications for id ' + id + ' time ' + item.time + ' and isNext ' + item.isNext);
        if (item.isNext) {
          console.log('getNotificationTime Calculating time constraint for id = ' + id);
          let time = this.getNotificationTime(item.date, item.time, this.getMinutes(notifyBefore))
          console.log('getNotificationTime Notification time = ' + time);

          if (time) {
            console.log('getNotificationTime setting notification for id ' + id + ' time ' + item.time + ' and isNext ' + item.isNext);
            RNLocalNotifications.createNotification(1, 'Its prayer time at ' + item.time, time, 'default');
            id++
          }
        }
      }
    }
    hidenHUDLoading();
  }
}
