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
    const ocApi = this.props.pageContext.OcApi;
    const selectedOperationId = window.location.hash.replace('#', '');
    this.initSelectedOperation(ocApi, selectedOperationId);
  }

  private getResourceData = (resourceName: string) => {
    return {
      selectedResource: OpenApi.findResourceByName(resourceName),
      listOperations: OpenApi.operationsByResource[resourceName],
    }
  }

  private initSelectedOperation = (ocApi: any, operId: string) => {
    let selectedOperation;
    let activeIndex = 0;
    let resourceData;
    let listResources;
    if (operId) { // bottom up (single operation to section)
      selectedOperation = ocApi.operationsById[operId];

      resourceData = this.getResourceData(selectedOperation.resource.name);

      activeIndex = _findIndex(ocApi.sections, x => x['x-id'] === selectedOperation.resource['x-section-id']);
      listResources = ocApi.resources.filter(ref => ref['x-section-id'] === ocApi.sections[activeIndex]['x-id']);

    } else { // top down (section to single operation)
      listResources = ocApi.resources.filter(ref => ref['x-section-id'] === ocApi.sections[activeIndex]['x-id']);
      resourceData = this.getResourceData(listResources[activeIndex].name);
      selectedOperation = resourceData['listOperations'][activeIndex];
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

    const selectedOperation = (this.state.selectedResource && resourceName != this.state.selectedResource.name) || !this.state.selectedOperation ? resourceData['listOperations'][0] : null;
    this.setState({
      listOperations: resourceData['listOperations'],
      selectedResource: resourceData['selectedResource'],
      selectedOperation
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
              selectedOperation={this.state.selectedOperation}
            />
          </LayoutMenu>
        </LayoutContainer>
      </Layout>
    )
  }
}

export default withStyles(styles)(ApiReference)
