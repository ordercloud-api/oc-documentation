import React from 'react'
import { Router } from '@reach/router'
import Layout from '../Layout/Layout'
import Main from '../Layout/Main'
import { MuiThemeProvider } from '@material-ui/core/styles'
import ORDERCLOUD_THEME from '../../theme/theme.constants'

import ApiReference from '../Templates/ApiReference';
import React from 'react';
import { Router } from '@reach/router';
import { Route } from 'react-router-dom';
import Layout from '../Layout/Layout';
import Main from '../Layout/Main';

class App extends React.Component {
  public render() {
    return (
      <MuiThemeProvider theme={ORDERCLOUD_THEME}>
        <Layout>
          <Router>
            <Main
              path={
                process.env.NODE_ENV === 'production' ? '/documentation' : '/'
              }
            />
          </Router>
        </Layout>
      </MuiThemeProvider>
    )
  }
}

export default App
