/*
 *
 * ReportPage reducer
 *
 */
import produce from 'immer';
import {
  REPORT_SEARCH_REQUEST,
  REPORT_LOAD_TRANSACTION_TOTALS,
  REPORT_LOAD_TRANSACTION_LIST
} from './constants';

export const initialState = {
  searchParams: {},
  transactionTotalsData: [],
  transactionListData: []
};

/* eslint-disable default-case, no-param-reassign */
const reportPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    const { type, ...searchParams } = action
    switch (type) {
      case REPORT_SEARCH_REQUEST:
        draft.searchParams = { ...searchParams }
        draft.transactionTotalsData = []
        draft.transactionListData = []
        break;
      case REPORT_LOAD_TRANSACTION_TOTALS:
        draft.transactionTotalsData = { ...action.payload }
        break;
      case REPORT_LOAD_TRANSACTION_LIST:
        draft.transactionListData = { ...action.payload }
        break;
    }
  });

export default reportPageReducer;
