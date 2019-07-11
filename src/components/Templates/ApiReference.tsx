import React from 'react';
import apiReferenceUtil from '../Shared/apiReferenceUtility';
import Layout from '../Layout/Layout';

class ApiReference extends React.Component<any> {

  public state = {
    docs: null
  };

  public async componentDidMount() {
    apiReferenceUtil.GetAllDocs().then(docs => {
      this.setState({ docs });
    });
  }

  public render() {
    return (
      <Layout>
        {this.state.docs ? this.state.docs.data.Sections.map(s => <p key={s}>{s}</p>) : <p>hi</p>}
      </Layout>
    )
  }

}

export default ApiReference