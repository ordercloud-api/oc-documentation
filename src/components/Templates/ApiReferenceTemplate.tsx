import React from 'react'
import Layout from '../Layout/Layout'
import OpenApi, { Initialize } from '../../services/openapi.service'
import { withStyles, createStyles } from '@material-ui/core'
import ApiReferenceMenu from '../Layout/ApiReferenceMenu'
import { findIndex as _findIndex } from 'lodash'
import LayoutContainer from '../Layout/LayoutContainer'
import LayoutMain from '../Layout/LayoutMain'
import LayoutMenu from '../Layout/LayoutMenu'
import ApiResource from '../Shared/ApiReference/ApiResource'
import { ApiOperation } from '../../models/openapi.models'

const styles = () =>
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

class ApiReference extends React.Component<any> {
  public state = {
    selectedResource: null,
    selectedOperation: null,
    listResources: [],
    listOperations: [],
    activeIndex: null,
    ocApi: null,
  }

  public async componentDidMount() {
    const ocApi = await Initialize(this.props.pageContext.OcApi)
    this.setState({ ocApi })
    const selectedOperationId = window.location.hash.replace('#', '')
    this.initSelectedOperation(selectedOperationId)
    if (selectedOperationId) {
      // TODO : would be 'dry'er to put in if(operId) statement in initSelectedOperation but it breaks
      document.getElementById(selectedOperationId).scrollIntoView()
    } else {
      window.scrollTo({ top: 0 })
    }
  }

  private getResourceData = (resourceName: string) => {
    return {
      selectedResource: OpenApi.findResourceByName(resourceName),
      listOperations: OpenApi.operationsByResource[resourceName],
    }
  }

  private initSelectedOperation = (operId: string) => {
    const { ocApi } = this.state
    let selectedOperation
    let activeIndex = 0
    let resourceData
    let listResources
    if (operId) {
      // bottom up (single operation to section)
      selectedOperation = ocApi.operationsById[operId]

      resourceData = this.getResourceData(selectedOperation.resource.name)

      activeIndex = _findIndex(
        ocApi.sections,
        x => x['x-id'] === selectedOperation.resource['x-section-id']
      )
      listResources = ocApi.resources.filter(
        ref => ref['x-section-id'] === ocApi.sections[activeIndex]['x-id']
      )
    } else {
      // top down (section to single operation)
      listResources = ocApi.resources.filter(
        ref => ref['x-section-id'] === ocApi.sections[activeIndex]['x-id']
      )
      resourceData = this.getResourceData(listResources[activeIndex].name)
      selectedOperation = resourceData['listOperations'][activeIndex]
    }

    this.setState({
      activeIndex,
      listResources,
      selectedOperation,
      selectedResource: resourceData['selectedResource'],
      listOperations: resourceData['listOperations'],
    })
  }

  public handleSectionChange = sectionIndex => {
    const { ocApi } = this.state
    const listResources = ocApi.resources.filter(ref => {
      return ref['x-section-id'] === ocApi.sections[sectionIndex]['x-id']
    })
    const activeIndex =
      sectionIndex === this.state.activeIndex ? -1 : sectionIndex
    this.setState({
      activeIndex,
      listResources,
    })
  }

  public handleResourceChange = (resourceName: string) => {
    const resourceData = this.getResourceData(resourceName)
    this.setState({
      listOperations: resourceData['listOperations'],
      selectedResource: resourceData['selectedResource'],
      selectedOperation: null,
    })
    window.scrollTo({ top: 0 })
  }

  public handleOperationChange = (operation: ApiOperation) => {
    this.setState({ selectedOperation: operation })
  }

  public render() {
    const { location } = this.props
    const { ocApi } = this.state
    return ocApi ? (
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
              ocApi={ocApi}
              activeIndex={this.state.activeIndex}
              sectionChange={this.handleSectionChange}
              resourceChange={this.handleResourceChange}
              operationChange={this.handleOperationChange}
              selectedResource={this.state.selectedResource}
              selectedOperation={this.state.selectedOperation}
            />
          </LayoutMenu>
        </LayoutContainer>
      </Layout>
    ) : null
  }
}

export default withStyles(styles)(ApiReference)
