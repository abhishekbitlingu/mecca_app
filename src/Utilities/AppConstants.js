const  NETWORK_CONSTANTS = {
  BASE_URL : 'https://democarol.com/prayertime/api',
  // v1/timings/1398332113?latitude=24.6903&longitude=75.5670&method=1',
  METHODS: {
    POST: 'POST',
    GET: 'GET'
  },
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
  },
  PATH_PARAMETERS: {
    LOGIN: '/signin',
    SIGN_UP: '/signup',
    GET_TIMINGS_BASE_URL: 'https://muslimsalat.com/',
    GET_TIMINGS: '/monthly.json?key=525cec70ca6377c3b2b52deda2e82224',
  }
}

const ASYNC_STORAGE_KEYS={
  ID_KEY: 'id',
  FIRST_NAME_KEY: 'first_name',
  LAST_NAME_KEY: 'last_name',
  EMAIL_KEY: 'email',
  PHONE_KEY: 'phone',
  TOKEN_KEY: 'token',
  STATUS_KEY: 'status',
  IS_LOGGED_IN_KEY: 'is_logged_in',
  NOTIFY_BEFORE_KEY: 'notify_before',
  LAST_LOGIN_KEY: 'last_login',
  PASSWORD_KEY: 'password',
  IS_SILVER_FLAG: 'is_silver'
}

const LOGGED_IN_USER_DETAILS= {
  EMP_ID: '',
  NAME: '',
  EMAIL: '',
  DESIGNATION: 'Manager',
  IS_MANAGER: false,
  IS_HR: false,
  MANAGER: 'test@adapty.com',
  PASSWORD: ''
}

const COLORS = {
  APP_DEFAULT_COLOR: '#0A993C'
}

const ERROR_MESSAGES = {
  DEFAULT_MESSAGE: 'Something went wrong. Please try again.',
  NETWORK_CONNECTION_ERROR: 'You must have a working internet connection in order to perform this action',
}

const SUCCESS_MESSAGES = {
  FORGOT_PASSWORD_MESSAGE: 'A reset password link has been successfully sent to your email ID',
}

export {
  NETWORK_CONSTANTS,
  ERROR_MESSAGES,
  LOGGED_IN_USER_DETAILS,
  SUCCESS_MESSAGES,
  COLORS,
  ASYNC_STORAGE_KEYS
}
