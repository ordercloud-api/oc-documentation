import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from '../Layout/Layout';
import Main from '../Layout/Main';
import ApiReference from '../Templates/ApiReference';

class App extends React.Component {
  public render() {
    return (
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/api-reference" component={ApiReference} />
          </Switch>
        </Layout>
      </Router>
    );
  }
}

export default App;
