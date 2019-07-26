import React from 'react';
import Layout from '../Layout/Layout';
import { withStyles, Theme, createStyles, Container } from '@material-ui/core';
import ApiReferenceMenu from '../Layout/ApiReferenceMenu';
import { graphql, StaticQuery } from 'gatsby';

const styles = (theme: Theme) =>
  createStyles({
    docContainer: {
      marginBlockStart: '2rem',
      marginBlockEnd: '4rem',
    },
  })

const ApiReference = withStyles(styles)(
  class extends React.Component<any> {
    public render() {
      const { classes, apiReference } = this.props;
      return (
        <Layout>
          <Container maxWidth="lg">
            <ApiReferenceMenu apiReference={apiReference} />
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
    render={data => <ApiReference apiReference={data.allSrcJson.edges[0].node.tags} />}
  />
)