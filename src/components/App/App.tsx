import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from '../Layout/Layout';
import Main from '../Layout/Main';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/" component={Main} />
          </Switch>
        </Layout>
      </Router>
    );
  }
}

export default App;
