import React from 'react';
import apiReferenceUtil from '../Shared/apiReferenceUtility';

class ApiReference extends React.Component<any> {

  public async componentDidMount() {
    const docs = apiReferenceUtil.GetAllDocs();
  }

  public render() {
    return (
      <p>helloooo</p>
    )
  }

}

export default ApiReference