/*
 *
 * ReportPage actions
 *
 */


import { REPORT_SEARCH_REQUEST, REPORT_SEARCH_REQUEST_SUCCESS, REPORT_SEARCH_REQUEST_ERROR, REPORT_LOAD_TRANSACTION_TOTALS, REPORT_LOAD_TRANSACTION_LIST } from './constants';

export function searchRequest(searchParams) {
  return {
    type: REPORT_SEARCH_REQUEST,
    ...searchParams
  };
}

export function searchSuccess(payload) {
  return {
    type: REPORT_SEARCH_REQUEST_SUCCESS,
    payload
  };
}

export function searchError(errorMessage) {
  return {
    type: REPORT_SEARCH_REQUEST_ERROR,
    errorMessage
  };
}

export function loadTransactionTotals(payload) {
  return {
    type: REPORT_LOAD_TRANSACTION_TOTALS,
    payload
  }
}
export function loadTransactionList(payload) {
  return {
    type: REPORT_LOAD_TRANSACTION_LIST,
    payload
  }
}
