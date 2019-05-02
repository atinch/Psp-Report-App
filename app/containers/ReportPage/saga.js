import axios from 'axios'
import { call, put, takeLatest } from 'redux-saga/effects';
import { REPORT_SEARCH_REQUEST } from './constants';

import { loadTransactionTotals, loadTransactionList } from './actions';

export function* searchRequest(actionParams) {  
  try {
    const { type, ...searchParams } = actionParams
    const payload = yield call(
      axios.post,
      'api/transactions/report', {
        fromDate: searchParams.fromDate,
        toDate: searchParams.toDate
      }
    );
    yield put(loadTransactionTotals(payload.data.response));

    const payloadList = yield call(axios.post, 'api/transaction/list', {...searchParams});
    yield put(loadTransactionList(payloadList.data.data));

  } catch (err) {
    console.log('err', err)
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* reportPageSaga() {
  yield takeLatest(REPORT_SEARCH_REQUEST, searchRequest);
}