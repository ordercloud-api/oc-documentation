import React from 'react'
import { Router } from '@reach/router'
import Layout from '../Layout/Layout'
import Main from '../Layout/Main'
import { ThemeProvider } from '@material-ui/styles'
import ORDERCLOUD_THEME from '../../theme/theme.constants'
import Route from '../Shared/Route'
import { withPrefix } from 'gatsby'
import Footer from '../Layout/Footer'

class App extends React.Component {
  public render() {
    return (
      <ThemeProvider theme={ORDERCLOUD_THEME}>
        <Layout>
          <Router>
            <Route path={withPrefix('/')} component={<Main />} />
          </Router>
          <Footer />
        </Layout>
      </ThemeProvider>
    )
  }
}

export default App
