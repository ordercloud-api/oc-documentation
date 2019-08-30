import React from 'react'
import Layout from '../Layout/Layout'
import { Initialize } from '../../openapi.service'
import OpenApi from '../../openapi.service'
import { withStyles, Theme, createStyles, Container } from '@material-ui/core'
import ApiReferenceMenu from '../Layout/ApiReferenceMenu'
import { flatten as _flatten, findIndex as _findIndex } from 'lodash'
import ApiReferenceSelection from '../Layout/ApiReferenceSelection'
import LayoutContainer from '../Layout/LayoutContainer'
import LayoutMain from '../Layout/LayoutMain'
import LayoutMenu from '../Layout/LayoutMenu'
import ApiResource from '../Shared/ApiReference/ApiResource'

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
      position: 'fixed',
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

class ApiReference extends React.Component<any> {
  public state = {
    selectedResource: null,
    selectedOperation: null,
    listResources: [],
    listOperations: [],
    activeIndex: 0,
    ocApi: null,
  }

  public async componentDidMount() {
    await Initialize()
  }

  public handleSectionChange = sectionIndex => {
    const listResources = this.props.pageContext.OcApi.resources.filter(ref => {
      return ref['x-section-id'] === this.props.pageContext.OcApi.sections[sectionIndex]['x-id']
    });
    const activeIndex = sectionIndex === this.state.activeIndex ? -1 : sectionIndex;
    this.setState({
      activeIndex,
      listResources,
    })
  }

  public handleResourceChange = (resourceName: string) => {
    const operations = OpenApi.operationsByResource[resourceName]
    const resource = OpenApi.findResourceByName(resourceName)
    this.setState({
      listOperations: operations,
      selectedResource: resource,
    })
  }

  public handleOperationChange = (operation: Operation) => {
    this.setState({ selectedOperation: operation })
  }

  public render() {
    const { classes, pageContext, location } = this.props
    return (
      <Layout location={location}>
        <LayoutContainer>
          <LayoutMain>
            {this.state.selectedResource && (
              <ApiResource
                resource={this.state.selectedResource}
                operations={this.state.listOperations}
              />
            )}
          </LayoutMain>
          <LayoutMenu>
            <ApiReferenceMenu
              ocApi={pageContext.OcApi}
              activeIndex={this.state.activeIndex}
              sectionChange={this.handleSectionChange}
              resourceChange={this.handleResourceChange}
              operationChange={this.handleOperationChange}
            />
          </LayoutMenu>
        </LayoutContainer>
      </Layout>
    )
  }
}

export default withStyles(styles)(ApiReference)
