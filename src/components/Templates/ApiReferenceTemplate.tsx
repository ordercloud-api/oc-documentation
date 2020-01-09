import React, { FC, useMemo } from 'react'
import Layout from '../Layout/Layout'
import LayoutContainer from '../Layout/LayoutContainer'
import LayoutMain from '../Layout/LayoutMain'
import LayoutMenu from '../Layout/LayoutMenu'
import { RouteComponentProps } from '@reach/router'
import { Helmet } from 'react-helmet'
import {
  ApiSection,
  ApiResource,
  ApiOperation,
} from '../../models/openapi.models'
import ApiReferenceMenu, {
  ApiReferenceMenuData,
} from '../Layout/ApiReferenceMenu'
import {
  Typography,
  Breadcrumbs,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core'
import ApiOperationDisplay from '../Shared/ApiReference/ApiOperation'
import { Link } from 'gatsby'
import Case from 'case'

interface ApiReferenceProps extends RouteComponentProps {
  pageContext: {
    menuData: ApiReferenceMenuData
    section?: ApiSection
    resource?: ApiResource
    operation?: ApiOperation
  }
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    breadcrumbs: {
      paddingTop: theme.spacing(1.5),
      marginBottom: -theme.spacing(4.5),
    },
    breadcrumbLink: {
      textDecoration: 'none',
    },
  })
)

const ApiReference: FC<ApiReferenceProps> = (props: ApiReferenceProps) => {
  const { location, uri, pageContext } = props
  const classes = useStyles({})
  const defaultDescription =
    'OrderCloud is a cloud-hosted B2B eCommerce platform exposed entirely via a RESTful API. It enables rapid development of custom, secure, and scalable B2B eCommerce solutions. Spin up a fully functional B2B app in minutes and customize it to limits of your imagination.'
  const pageInfo = useMemo(() => {
    const prefix = 'OrderCloud API'
    const { section, resource, operation } = pageContext
    if (operation) {
      return {
        title: `${prefix} | ${operation.summary}`,
        description: resource.description,
      }
    }
    if (resource) {
      return {
        title: `${prefix} | ${resource.name}`,
        description: resource.description,
      }
    }
    if (section) {
      return {
        title: `${prefix} | ${section.name}`,
        description: section.description,
      }
    }
    return {
      title: `${prefix} Reference`,
    }
  }, [pageContext])
  return (
    <Layout location={location}>
      <Helmet
        title={pageInfo.title}
        description={pageInfo.description || defaultDescription}
      />
      <LayoutContainer>
        <LayoutMain>
          {pageContext.section ? (
            <Breadcrumbs className={classes.breadcrumbs}>
              <Typography
                className={classes.breadcrumbLink}
                component={Link}
                to="/api-reference"
              >
                API Reference
              </Typography>
              {pageContext.resource && (
                <Typography
                  className={classes.breadcrumbLink}
                  component={Link}
                  to={`/api-reference/${Case.kebab(
                    pageContext.section['x-id']
                  )}`}
                >
                  {pageContext.section.name}
                </Typography>
              )}
              {pageContext.operation && pageContext.resource && (
                <Typography
                  className={classes.breadcrumbLink}
                  component={Link}
                  to={`/api-reference/${Case.kebab(
                    pageContext.section['x-id']
                  )}/${Case.kebab(pageContext.resource.name)}`}
                >
                  {pageContext.resource.name}
                </Typography>
              )}
            </Breadcrumbs>
          ) : (
            <Typography variant="h1">API Reference</Typography>
          )}
          {!pageContext.resource && pageContext.section && (
            <React.Fragment>
              <Typography variant="h1">{pageContext.section.name}</Typography>
              <Typography>{pageContext.section.description}</Typography>
            </React.Fragment>
          )}
          {!pageContext.operation && pageContext.resource && (
            <React.Fragment>
              <Typography variant="h1">{pageContext.resource.name}</Typography>
              <Typography>{pageContext.resource.description}</Typography>
            </React.Fragment>
          )}
          {pageContext.operation && (
            <ApiOperationDisplay operation={pageContext.operation} />
          )}
        </LayoutMain>
        <LayoutMenu>
          <ApiReferenceMenu data={pageContext.menuData} uri={uri} />
        </LayoutMenu>
      </LayoutContainer>
    </Layout>
  )
}

export default ApiReference
