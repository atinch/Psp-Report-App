/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import ReportPage from 'containers/ReportPage/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';

import GlobalStyle from '../../global-styles';
import redirectToLogin from 'utils/redirectToLogin'

const AppWrapper = styled.div`
 
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

export default function App() {

  useEffect(() => {
    if (redirectToLogin()) window.location = '/login'
  })

  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - Psp Report"
        defaultTitle="Psp Report"
      >
        <meta name="description" content="Psp Report" />
      </Helmet>
      {/* <Header /> */}
      <Switch>
        <Route exact path="/" component={ReportPage} />
        <Route exact path="/report" component={ReportPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route path="" component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </AppWrapper>
  );
}