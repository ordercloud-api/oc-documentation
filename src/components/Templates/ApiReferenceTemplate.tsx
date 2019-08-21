import React from 'react'
import Layout from '../Layout/Layout';
import { Initialize } from '../../openapi.service';
import OpenApi from '../../openapi.service';
import { withStyles, Theme, createStyles, Container } from '@material-ui/core'
import ApiReferenceMenu from '../Layout/ApiReferenceMenu'
import { graphql, StaticQuery } from 'gatsby'
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

const ApiReference = withStyles(styles)(
  class extends React.Component<any> {
    public state = {
      selectedOperation: null,
      listSections: [],
      listResources: [],
      listOperations: [],
      currentPath: null,
      activeSection: null
    }

    public async componentDidMount() {
      await Initialize();
      this.buildReferenceMenu();
    }

    public buildReferenceMenu = () => {
      // let allOperations = [];
      let listSections = [];
      this.props.apiReference.forEach(ref => {
        if (ref.x_id != null) {
          listSections = [...listSections, ref];
        }
        // else {
        //   allOperations = _flatten([...allOperations, OpenApi.operationsByResource[ref.name]]);
        // }
      });
      const listResources = this.props.apiReference.filter(ref => {
        return ref.x_section_id === listSections[0].x_id
      });
      // const listOperations = OpenApi.operationsByResource[listResources[0].name];
      this.setState({
        listSections, // all
        activeSection: listSections[0],
        listResources, // resources of a single section
        // listOperations, // operations of a single resource
        // selectedOperation: listOperations[0],
        // currentPath: listOperations[0].path
      });
    }

    public handleOperationChange = (operation: Operation) => {
      this.setState({ selectedOperation: operation });
    }

    public handleResourceChange = (resourceName: string) => {
      const operations = OpenApi.operationsByResource[resourceName];
      this.setState({ listOperations: operations });
    }

    public handleSectionChange = (section) => {
      const listResources = this.props.apiReference.filter(ref => {
        return ref.x_section_id === section.x_id
      });
      this.setState({
        activeSection: section,
        listResources,
      });
    }

    public render() {
      const { classes } = this.props;
      return (
        <Layout>
          <Container maxWidth="lg" className={classes.docContainer}>
            {this.state.listOperations.length ? this.state.listOperations.map(r => <ApiReferenceSelection className={classes.operationsList} method={r} />) : null}
            <ApiReferenceMenu allSections={this.state.listSections}
              sectionResources={this.state.listResources}
              resourceOperations={this.state.listOperations}
              sectionChange={this.handleSectionChange}
              resourceChange={this.handleResourceChange}
              operationChange={this.handleOperationChange}
              currentPath={this.state.currentPath}
              activeSection={this.state.activeSection} />
          </Container>
        </Layout>
      )
    }
  }
)

export default () => (
  <StaticQuery
    query={graphql`
      query {
        allSrcJson {
          edges {
            node {
              tags {
                name
                x_section_id
                x_id
                description
              }
            }
          }
        }
      }
    `}
    render={data => (
      <ApiReference apiReference={data.allSrcJson.edges[0].node.tags} />
    )}
  />
)
