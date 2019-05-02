import React, { Component } from "react";
import { render } from "react-dom";
import MuiDataTable from "react-mui-datatables";
import data from "./data";
import { Button, Paper } from "@material-ui/core/es/index";

import JssProvider from "react-jss/lib/JssProvider";
import { createGenerateClassName } from "@material-ui/core/styles";

import { CSVLink } from 'react-csv/lib';
import { transformFromAst } from "@babel/core";

const generateClassName = createGenerateClassName({
  dangerouslyUseGlobalCSS: true,
  productionPrefix: "c"
});

class TransactionTotalReport extends Component {
  constructor(props) {
    super(props);

    //TransactionTotalReport.handleClick = TransactionTotalReport.handleClick.bind(this);
  }


  componentWillMount() {}

  static handleClick(e) {
    /* Your code is here.alert is the example */
    //alert("parent td#id: " + e.target.parentNode.id);
  }

  render() {
    
    const columns = [
      
      { label: "Count", key: "count" },
      { label: "Total",key: "total"},
      { label: "Currency", key: "currency"} /* <-- this is required if you using customAction */
    ]; /* <-- Table header columns. this is required */

    const action = (
      <Button onClick={TransactionTotalReport.handleClick}>Action</Button>
    ); /* <-- action button */

    const options = {
      hasIndex: false /* <-- use numbers for rows*/,
      customAction: action /* <-- use action button for row */,
      searchBox: false /* <-- search true or false */,
      csv: true /* <-- csv download true or false */,
      indexColumn:
        "fname" , /* <-- add your data first unique column name for this like _id, i used fname because i don't have a _id field in my array */
      printButton: true
    };

    const reportArray = Object.keys(this.props.transactionTotalsData).map(i =>  this.props.transactionTotalsData[i])
    var reportArrayMap = reportArray.map(function (item) {
      return {count:item.count.toString(), total:item.total, currency:item.currency}
    });
   
    return (
     // this.props.transactionTotalsData
      <div>
        <Paper style={{ padding: 16, margin: 16 }}>
          <MuiDataTable
            data={reportArrayMap}
            columns={columns}
            options={options}
            title={"Transaction Total Report"}
          />
        </Paper>
      </div>
    );
  }
}

export default TransactionTotalReport;
