
import ApiReference from '../Templates/ApiReference';
import React from 'react';
import { Router } from '@reach/router';
import { Route } from 'react-router-dom';
import Layout from '../Layout/Layout';
import Main from '../Layout/Main';

class App extends React.Component {
  public render() {
    return (
      <Layout>
        <Router>
          <Main path="/" />
          <Route path="/api-reference" component={ApiReference} />
        </Router>
      </Layout>
    )
  }
}

export default App
