import React from 'react'
import Layout from '../Layout/Layout'
import { Initialize } from '../../openapi.service'
import OpenApi from '../../openapi.service'
import { withStyles, Theme, createStyles } from '@material-ui/core'
import ApiReferenceMenu from '../Layout/ApiReferenceMenu'
import { flatten as _flatten, findIndex as _findIndex } from 'lodash'
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
    activeIndex: null,
    ocApi: null,
  }

  public async componentDidMount() {
    await Initialize();
    const selectedOperationId = window.location.hash.replace('#', '');
    const ocApi = this.props.pageContext.OcApi;
    if (!selectedOperationId) return;
    const selectedOperation = ocApi.operationsById[selectedOperationId];

    // this.handleResourceChange(selectedOperation.resource.name);

    const resource = OpenApi.findResourceByName(selectedOperation.resource.name);

    const activeIndex = _findIndex(ocApi.sections, x => x['x-id'] === resource['x-section-id']);
    const listResources = ocApi.resources.filter(ref => {
      return ref['x-section-id'] === ocApi.sections[activeIndex]['x-id']
    });
    const resourceData = this.getResourceData(resource.name);
    this.setState({
      activeIndex,
      listResources,
      selectedResource: resourceData['selectedResource'],
      listOperations: resourceData['listOperations'],
    })
  }

  private getResourceData = (resourceName: string) => {
    return {
      selectedResource: OpenApi.findResourceByName(resourceName),
      listOperations: OpenApi.operationsByResource[resourceName],
    }
  }

  public handleSectionChange = sectionIndex => {
    const ocApi = this.props.pageContext.OcApi
    const listResources = ocApi.resources.filter(ref => {
      return ref['x-section-id'] === ocApi.sections[sectionIndex]['x-id']
    });
    const activeIndex = sectionIndex === this.state.activeIndex ? -1 : sectionIndex;
    this.setState({
      activeIndex,
      listResources,
    })
  }

  public handleResourceChange = (resourceName: string) => {
    const resourceData = this.getResourceData(resourceName);
    this.setState({
      selectedResource: resourceData['selectedResource'],
      listOperations: resourceData['listOperations']
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
