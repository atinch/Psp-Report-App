/*
 *
 * LoginPage reducer
 *
 */
import produce from 'immer';
import { LOGIN_REQUEST, LOGIN_REQUEST_SUCCESS, LOGIN_REQUEST_ERROR } from './constants';

export const initialState = {
  username: '',
  loading: false,
  errorMessage: '',
  isAuthenticated: false,
  merchantId: 0,
  merchantUserId: 0,
  subMerchantIds: [],
  role: null
};

/* eslint-disable default-case, no-param-reassign */
const loginPageReducer = (state = initialState, action) =>
  produce(state, draft  => {
    switch (action.type) {
      case LOGIN_REQUEST:
        draft.errorMessage = ''
        draft.isAuthenticated = false
        draft.loading = true        
        break;
      case LOGIN_REQUEST_SUCCESS:
        draft.errorMessage = ''
        draft.isAuthenticated = true
        draft.loading = false
        draft.username = action.payload.username
        draft.merchantId = action.payload.merchantId,
        draft.merchantUserId = action.payload.merchantUserId,
        draft.role = action.payload.role,
        draft.subMerchantIds = action.payload.subMerchantIds
        break;
      case LOGIN_REQUEST_ERROR:
        draft.errorMessage = action.errorMessage
        draft.isAuthenticated = false
        draft.loading = false
        draft.username = ''
        break;
    }
  });

export default loginPageReducer;
