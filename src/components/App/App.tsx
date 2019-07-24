import React from 'react'
import { Router } from '@reach/router'
import Layout from '../Layout/Layout'
import Main from '../Layout/Main'
import { ThemeProvider } from '@material-ui/styles'
import ORDERCLOUD_THEME from '../../theme/theme.constants'

class App extends React.Component {
  public render() {
    return (
      <ThemeProvider theme={ORDERCLOUD_THEME}>
        <Layout>
          <Router>
            <Main
              path={
                process.env.NODE_ENV === 'production' ? '/documentation' : '/'
              }
            />
          </Router>
        </Layout>
      </ThemeProvider>
    )
  }
}

export default App
