import React from 'react'
import Layout from '../components/Layout/Layout'
import { Initialize } from '../openapi.service'
import { withStyles, Theme, createStyles, Container } from '@material-ui/core'
import ApiReferenceMenu from '../components/Layout/ApiReferenceMenu'
import { graphql, StaticQuery } from 'gatsby'
import OpenApi from '../openapi.service'
import { flatten as _flatten } from 'lodash'
import ApiReferenceSelection from '../components/Layout/ApiReferenceSelection'

const styles = (theme: Theme) =>
  createStyles({
    docContainer: {
      display: 'flex',
      position: 'relative',
      marginBlockStart: '2rem',
      marginBlockEnd: '4rem',
    },
  })

interface Operation {
  description: string
  operationId: string
  path: string
  requestBody: any
  responses: any
  security: any
  summary: string
  tags: string[]
  verb: string
}

const ApiReference = withStyles(styles)(
  class extends React.Component<any> {
    constructor(props) {
      super(props)
      console.log(props)
      // Initialize();
    }

    public state = {
      operation: null,
      resources: [],
    }

    public async componentDidMount() {
      await Initialize()
      this.mapResources()
    }

    public handleResourceChange = (operation: Operation) => {
      this.setState({ operation })
    }

    public mapResources = () => {
      this.props.apiReference
        .filter(apiRef => apiRef.x_section_id != null)
        .forEach(ref => {
          const testing = OpenApi.operationsByResource[ref.name]
          this.setState({
            resources: _flatten([...this.state.resources, testing]),
          })
        })
    }

    public render() {
      this.props['pageContext']
      const { classes, apiReference } = this.props

      return (
        <Layout>
          <Container maxWidth="lg" className={classes.docContainer}>
            {/* {this.state.operation && this.state.operation ? <ApiReferenceSelection method={this.state.operation} /> : null} */}
            {this.state.resources.length
              ? this.state.resources.map(r => (
                  <ApiReferenceSelection method={r} />
                ))
              : null}
            <ApiReferenceMenu
              apiReference={apiReference}
              resourceChange={this.handleResourceChange}
            />
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
