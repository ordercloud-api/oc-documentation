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
      requestBody: null,
      parameters: null
    }

    public async componentDidMount() {
      await Initialize();
    }

    protected handleResourceChange = (operation: Operation) => {
      console.log('operation', operation);

      // this.setState({ requestBody: operation.requestBody });
    }

    public render() {
      const { classes, apiReference } = this.props
      return (
        <Layout>
          <Container maxWidth="lg">
            <ApiReferenceMenu apiReference={apiReference} resourceChange={this.handleResourceChange} />
            {this.state && this.state.requestBody ? <p>{this.state.requestBody}</p> : null}
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
