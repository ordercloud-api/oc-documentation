import React from 'react';
import apiReferenceUtil from './Shared/apiReferenceUtility';
import Layout from './Layout/Layout';

class ApiReference extends React.Component<any> {

  public async componentDidMount() {
    const docs = apiReferenceUtil.GetAllDocs();
  }

  public render() {
    return (
      <Layout>
        <p>helloooo</p>
      </Layout>
    )
  }

}

export default ApiReference