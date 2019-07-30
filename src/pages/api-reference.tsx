import React from 'react'
import Layout from '../components/Layout/Layout'
import { Initialize } from '../openapi.service';
import { withStyles, Theme, createStyles, Container } from '@material-ui/core'
import ApiReferenceMenu from '../components/Layout/ApiReferenceMenu'
import { graphql, StaticQuery } from 'gatsby'
import OpenApi from '../openapi.service';

const styles = (theme: Theme) =>
  createStyles({
    docContainer: {
      marginBlockStart: '2rem',
      marginBlockEnd: '4rem',
    },
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
      operation: null
    }

    public async componentDidMount() {
      await Initialize();
    }

    public handleResourceChange = (operation: Operation) => {
      this.setState({ operation });
    }

    public render() {
      const { classes, apiReference } = this.props;
      return (
        <Layout>
          <Container maxWidth="lg">
            <ApiReferenceMenu apiReference={apiReference} resourceChange={this.handleResourceChange} />
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
