import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { ThemeProvider } from '@material-ui/styles'
import ORDERCLOUD_THEME from '../../theme/theme.constants'

export default ({ children }) => (
  <React.Fragment>
    <ThemeProvider theme={ORDERCLOUD_THEME}>
      <Header siteTitle="OrderCloud Documentation" />
      {children}
      <Footer />
    </ThemeProvider>
  </React.Fragment>
)
