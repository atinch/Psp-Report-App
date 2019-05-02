/**
 *
 * ReportPage
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import TransactionTotalReport from 'components/TransactionTotalReport';
import TransactionList from 'components/TransactionList';
import SearchFilterForm from 'components/SearchFilterForm';
import Transaction from 'components/Transaction';

import { getTransactionDetail } from 'services/TransactionService.js'

import { makeSelectTransactionTotalsData, makeSelectTransactionListData } from './selectors';
import { searchRequest } from './actions';
import reducer from './reducer';
import saga from './saga';

import './index.css';

export function ReportPage({
  onSubmitSearch,
  transactionTotalsData,
  transactionListData,
}) {
  useInjectReducer({ key: 'report', reducer });
  useInjectSaga({ key: 'report', saga });
  const theme = createMuiTheme({ typography: { useNextVariants: true } });
  const [selectedTransactionId, setSelectedTransactionId] = React.useState();
  const [transactionDetailData, setTransactionDetailData] = React.useState();
  const [open, setOpen] = React.useState(false);

  const handleSubmit = (searchParams) => {
    onSubmitSearch(searchParams);
  };

  const handleTransactionDetail = async (id) => {
    setSelectedTransactionId(id)
    const result = await getTransactionDetail(id);
    setTransactionDetailData(result);
    setOpen(true);
  }

  const handleClose = value => {
    setOpen(false);
  };

  return (
    <div className="container">
      <Helmet>
        <title>ReportPage</title>
        <meta name="description" content="Description of ReportPage" />
      </Helmet>
      <SearchFilterForm onSubmit={handleSubmit} />
      <div>
        <ThemeProvider theme={theme}>
        {Object.keys(transactionTotalsData).length > 0 &&
          <TransactionTotalReport transactionTotalsData={transactionTotalsData} />
        } 
        {Object.keys(transactionListData).length > 0 &&
          <TransactionList
            transactionListData={transactionListData}
            rowOnClick={(id) => handleTransactionDetail(id)}
          />
        }
        </ThemeProvider>
        <Transaction
          transactionId={selectedTransactionId}
          transactionDetailData={transactionDetailData}
          selectedValue={'selectedValue'}
          open={open}
          onClose={handleClose}
        />
      </div>
    </div>
  );
}

ReportPage.propTypes = {
  onSubmitSearch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  transactionTotalsData: makeSelectTransactionTotalsData(),
  transactionListData: makeSelectTransactionListData(),
});

function mapDispatchToProps(dispatch) {
  return {
    onSubmitSearch: params => {
      dispatch(searchRequest(params));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ReportPage);
