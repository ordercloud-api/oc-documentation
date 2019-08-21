import React from 'react'
import Layout from '../Layout/Layout';
import OpenApi from '../../openapi.service';
import { withStyles, Theme, createStyles, Container } from '@material-ui/core'
import ApiReferenceMenu from '../Layout/ApiReferenceMenu'
import { flatten as _flatten } from 'lodash';
import ApiReferenceSelection from '../Layout/ApiReferenceSelection';

const styles = (theme: Theme) =>
  createStyles({
    docContainer: {
      display: 'flex',
      position: 'relative',
      marginBlockStart: '2rem',
      marginBlockEnd: '4rem',
    },
    operationsList: {
      display: 'flex',
      flexDirection: 'column',
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
    listSections: [],
    listResources: [],
    listOperations: [],
    currentPath: null,
    activeSection: null,
    ocApi: null,
  }

  public async componentDidMount() {
    this.buildReferenceMenu();
  }

  public buildReferenceMenu = () => {
    // let allOperations = [];
    // let listSections = [];
    // const sections = this.props.pageContext.OcApi.sections;
    // debugger;
    // const sectionResources = '';
    // this.props.apiReference.forEach(ref => {
    //   if (ref.x_id != null) {
    //     listSections = [...listSections, ref];
    //   }
    // });
    // const listResources = this.props.apiReference.filter(ref => {
    //   return ref.x_section_id === listSections[0].x_id
    // });
    this.setState({
      ocApi: this.props.pageContext.OcApi,
      listSections: this.props.pageContext.OcApi.sections, // all
      activeSection: this.props.pageContext.OcApi.sections[0],
    });
  }

  public handleSectionChange = (section) => {
    const listResources = this.state.ocApi.resources.filter(ref => {
      return ref['x-section-id'] === section['x-id']
    });
    this.setState({
      activeSection: section,
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
        <Container maxWidth="lg" className={classes.docContainer}>
          {this.state.listOperations.length ? this.state.listOperations.map(r => <ApiReferenceSelection className={classes.operationsList} method={r} />) : null}
          <ApiReferenceMenu
            ocApi={pageContext.OcApi}
            sectionResources={this.state.listResources}
            // resourceOperations={this.state.listOperations}
            sectionChange={this.handleSectionChange}
            resourceChange={this.handleResourceChange}
            operationChange={this.handleOperationChange}
            activeSection={this.state.activeSection} />
        </Container>
      </Layout>
    )
  }
}

export default withStyles(styles)(ApiReference)

