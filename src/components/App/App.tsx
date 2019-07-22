import React from 'react'
import { Router } from '@reach/router'
import Layout from '../Layout/Layout'
import Main from '../Layout/Main'

class App extends React.Component {
  public render() {
    return (
      <Layout>
        <Router>
          <Main path="/" />
        </Router>
      </Layout>
    )
  }
}

export default App
