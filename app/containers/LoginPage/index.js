/**
 *
 * LoginPage
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { makeSelectIsUserAuthenticated, makeSelectErrorMessage } from './selectors';
import reducer from './reducer';
import saga from './saga';
import './index.css'
import { loginRequest } from './actions';

export function LoginPage({
  history,
  isAuthenticated,
  errorMessage,
  onSubmitForm
}){
  useInjectReducer({ key: 'loginPage', reducer });
  useInjectSaga({ key: 'loginPage', saga });

  useEffect(() => {
    if (isAuthenticated) history.push('/report');
  }, [isAuthenticated]);

  const [username, setUsername] = useState('demo@bumin.com.tr');
  const [password, setPassword] = useState('cjaiU8CV');

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmitForm(username, password)
  }

  return (
    <div>
      <Helmet>
        <title>LoginPage</title>
        <meta name="description" content="LoginPage" />
      </Helmet>
      <main className='main'>
        <Paper className='paper'>
          <Avatar className='avatar'>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className='form' onSubmit={handleSubmit}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input id="email" name="email" autoComplete="email" value={username} autoFocus onChange={(e) => setUsername(e.target.value)} />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input name="password" type="password" id="password" value={password}  autoComplete="current-password" onChange={(e) => setPassword(e.target.value)} />
            </FormControl>
            {errorMessage}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className='submit'
            >
              Sign in
          </Button>
          </form>
        </Paper>
      </main>
    </div>
  );
}

LoginPage.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isAuthenticated: makeSelectIsUserAuthenticated(),
  errorMessage: makeSelectErrorMessage()
});

function mapDispatchToProps(dispatch) {
  return {
    onSubmitForm: (username, password) => {
      dispatch(loginRequest(username, password));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);


export default
  compose(
    withConnect,
    memo,
  )(LoginPage);
