import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the reportPage state domain
 */

const selectReportPageDomain = state => state.report || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ReportPage
 */

const makeSelectReportPage = () =>
  createSelector(
    selectReportPageDomain,
    substate => substate,
  );

const makeSelectTransactionTotalsData = () =>
  createSelector(
    selectReportPageDomain,
    substate => substate.transactionTotalsData
  );

  const makeSelectTransactionListData = () =>
  createSelector(
    selectReportPageDomain,
    substate => substate.transactionListData
  );
  
export default makeSelectReportPage;
export {
  makeSelectTransactionTotalsData,
  makeSelectTransactionListData
};
