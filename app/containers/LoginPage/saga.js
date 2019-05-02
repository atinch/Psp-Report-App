import { call, put, takeLatest } from 'redux-saga/effects';
import { LOGIN_REQUEST } from './constants';
import axios from 'axios'
import { decode } from 'jsonwebtoken'

// import request from 'utils/request';
import { loginSuccess, loginError } from './actions';

export function* login({ username, password }) {
  const requestURL = `api/user/login`;

  try {
    const userInfo = yield call(axios.post, requestURL, { email: username, password });
    console.log(userInfo)
    const token = userInfo.data.token
    localStorage.setItem('token', token)

    const { timestamp, merchantId, merchantUserId } = decode(token);
    localStorage.setItem('tokenExpireDate', timestamp)
    localStorage.setItem('userInfo', JSON.stringify({ timestamp, merchantId, merchantUserId }))  

    yield put(loginSuccess({
      username,
      isAuthenticated: true,
      merchantId,
      merchantUserId
    }));
  } catch (err) {
    localStorage.removeItem('token')
    yield put(loginError('Username or password is not valid!'));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* loginData() {
  yield takeLatest(LOGIN_REQUEST, login);
}
