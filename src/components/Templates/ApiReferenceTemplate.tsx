import React from 'react'
import Layout from '../Layout/Layout';
import { Initialize } from '../../openapi.service';
import OpenApi from '../../openapi.service';
import { withStyles, Theme, createStyles, Container } from '@material-ui/core'
import ApiReferenceMenu from '../Layout/ApiReferenceMenu'
import { flatten as _flatten, findIndex as _findIndex } from 'lodash';
import ApiReferenceSelection from '../Layout/ApiReferenceSelection';

const styles = (theme: Theme) =>
  createStyles({
    docContainer: {
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      marginBlockStart: '2rem',
      marginBlockEnd: '4rem',
    },
    operationsList: {
      display: 'flex',
      position: 'fixed'
    }
  });

interface Operation {
  description: string;
  operationId: string;
  path: string;
  requestBody: any;
  responses: any;
  security: any;
  summary: string;
  tags: string[];
  verb: string;
}

class ApiReference extends React.Component<any> {
  public state = {
    selectedOperation: null,
    listResources: [],
    listOperations: [],
    activeIndex: 0,
    ocApi: null,
  }

  public async componentDidMount() {
    await Initialize()
  }

  public handleSectionChange = (section) => {
    const listResources = this.props.pageContext.OcApi.resources.filter(ref => {
      return ref['x-section-id'] === section['x-id']
    });
    const activeIndex = _findIndex(this.props.pageContext.OcApi.sections, (sect) => sect['x-id'] === section['x-id']);
    this.setState({
      activeIndex,
      listResources,
    });
  }

  public handleResourceChange = (resourceName: string) => {
    const operations = OpenApi.operationsByResource[resourceName];
    this.setState({ listOperations: operations });
  }

  public handleOperationChange = (operation: Operation) => {
    this.setState({ selectedOperation: operation });
  }

  public render() {
    const { classes, pageContext } = this.props;
    return (
      <Layout>
        {this.state.listOperations.length ? this.state.listOperations.map(r => <ApiReferenceSelection className={classes.operationsList} method={r} />) : null}
        <ApiReferenceMenu
          ocApi={pageContext.OcApi}
          activeIndex={this.state.activeIndex}
          sectionChange={this.handleSectionChange}
          resourceChange={this.handleResourceChange}
          operationChange={this.handleOperationChange}
        />
      </Layout>
    )
  }
}

export default withStyles(styles)(ApiReference)

