/*
 *
 * LoginPage actions
 *
 */

import { LOGIN_REQUEST, LOGIN_REQUEST_ERROR, LOGIN_REQUEST_SUCCESS } from './constants';

export function loginRequest(username, password) {
  return {
    type: LOGIN_REQUEST,
    username,
    password
  };
}

export function loginSuccess(payload) {
  return {
    type: LOGIN_REQUEST_SUCCESS,
    payload
  };
}

export function loginError(errorMessage) {
  return {
    type: LOGIN_REQUEST_ERROR,
    errorMessage
  };
}
