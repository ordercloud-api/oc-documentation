import React from "react"
import { MuiThemeProvider } from "@material-ui/core/styles"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Layout from "../Layout/Layout"
import Main from "../Layout/Main"
import ORDERCLOUD_THEME from "../../theme/theme.constants"

class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider theme={ORDERCLOUD_THEME}>
        <Router>
          <Layout>
            <Switch>
              <Route exact path="/" component={Main} />
            </Switch>
          </Layout>
        </Router>
      </MuiThemeProvider>
    )
  }
}

export default App
