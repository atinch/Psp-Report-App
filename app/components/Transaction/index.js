import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import blue from '@material-ui/core/colors/blue';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import './index.css'

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
  maxWidth: "lg"
});

const useStylesTab = makeStyles({
  root: {
    flexGrow: 1,
  },
});

const renderDetail = (data) => {
  if(!data || typeof data !== 'object') return null
  const mappedArr = Object.keys(data).map((key, ind) => (
    <tr key={ind}>
      <td className='detail-header'>{key}</td>
      <td>:</td>
      <td>{data[key]}</td>
    </tr>
  ))

  return (
    <table>
      {mappedArr}
    </table>
  )
}

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}
function Transaction(props) {
  
  function handleClose() {
    onClose(selectedValue);
  }

  // tab
  const classesTab = useStylesTab();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  const classes = useStyles();
  const { transactionDetailData, transactionId, onClose, selectedValue, ...other } = props;
  if(!transactionDetailData) return null

  const transactionArr = [
    {
      Name: `${transactionDetailData.customerInfo.billingFirstName} ${transactionDetailData.customerInfo.billingLastName}`,
      Phone: transactionDetailData.customerInfo.billingPhone,
      Email: transactionDetailData.customerInfo.email,
      Company: transactionDetailData.customerInfo.billingCompany  
    },
    {
      MerchantId: transactionDetailData.transaction.merchant.merchantId,
      FxTransactionId: transactionDetailData.merchant.fxTransactionId,
      ReferenceNo: transactionDetailData.transaction.merchant.referenceNo,
      Operation: transactionDetailData.transaction.merchant.operation,
      Status: transactionDetailData.transaction.merchant.status
    },
    {
      OriginalAmount: transactionDetailData.fx.merchant.originalAmount,
      OriginalCurrency: transactionDetailData.fx.merchant.originalCurrency
    }
  ]

  // tab
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      maxWidth='lg'
      {...other}  >
      <DialogTitle id="simple-dialog-title">
        Transaction Detail
      </DialogTitle>
      <Paper className={classesTab.root}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Customer" />
          <Tab label="Transaction" />
          <Tab label="Fx" />
        </Tabs>
        <TabContainer>
          {renderDetail(transactionArr[value])}
        </TabContainer>
      </Paper>
    </Dialog>
  );
}

Transaction.propTypes = {
  onClose: PropTypes.func,
  selectedValue: PropTypes.string,
};

export default Transaction