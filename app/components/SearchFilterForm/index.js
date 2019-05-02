/**
 *
 * SearchFilterForm
 *
 */

// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';

const styles = theme => ({
  button: {
    backgroundColor: '#E91D28',
    color: 'red'
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  form: {
    maxWidth: 800,
    width: '100%',
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  }
});

function SearchFilterForm(props) {
  const [fromDate, setFromDate] = useState('2018-01-01');
  const [toDate, setToDate] = useState('2019-12-12');
  const [status, setStatus] = useState('');

  const handleStatusChange = e => setStatus(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit({ fromDate, toDate, status });
  };
  const { classes } = props;
  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <div>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            margin="normal"
            label="From"
            value={fromDate}
            onChange={setFromDate}
            format="yyyy-MM-dd"
          />
          <DatePicker
            margin="normal"
            label="To"
            value={toDate}
            onChange={setToDate}
            format="yyyy-MM-dd"
          />
        </MuiPickersUtilsProvider>
      </div>
      <div>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="status-simple">Status</InputLabel>
          <Select
            value={status}
            onChange={handleStatusChange}
            inputProps={{
              name: 'status',
              id: 'status-simple',
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value='APPROVED'>APPROVED</MenuItem>
            <MenuItem value='WAITING'>WAITING</MenuItem>
            <MenuItem value='DECLINED'>DECLINED</MenuItem>
            <MenuItem value='ERROR'>ERROR</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div>
        <Button className={classes.button}
          type="submit"
          className='button'
          color="secondary"
          variant="contained"
        >
          Search
        </Button>
      </div>
    </form>
  );
}

export default withStyles(styles)(SearchFilterForm);
