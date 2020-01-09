import {
  Breadcrumbs,
  Button,
  Card,
  CardActions,
  CardHeader,
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core'
import { RouteComponentProps } from '@reach/router'
import Case from 'case'
import { Link } from 'gatsby'
import React, { FC, useLayoutEffect, useMemo } from 'react'
import { Helmet } from 'react-helmet'
import {
  ApiOperation,
  ApiResource,
  ApiSection,
} from '../../models/openapi.models'
import ApiReferenceMenu, {
  ApiReferenceMenuData,
} from '../Layout/ApiReferenceMenu'
import Layout from '../Layout/Layout'
import LayoutContainer from '../Layout/LayoutContainer'
import LayoutMain from '../Layout/LayoutMain'
import LayoutMenu from '../Layout/LayoutMenu'
import ApiOperationDisplay from '../Shared/ApiReference/ApiOperation'

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

  useLayoutEffect(() => {
    if (!props.location.hash) return
    const el = document.getElementById(props.location.hash.split('#')[1])
    if (!el) return
    el.scrollIntoView()
  }, [props.location.hash])

  const defaultDescription =
    'OrderCloud is a cloud-hosted B2B eCommerce platform exposed entirely via a RESTful API. It enables rapid development of custom, secure, and scalable B2B eCommerce solutions. Spin up a fully functional B2B app in minutes and customize it to limits of your imagination.'
  const pageInfo = useMemo(() => {
    const prefix = 'OrderCloud API'
    const { section, resource, operation, menuData } = pageContext
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
        operations: menuData
          .find(s => uri.includes(s.path))
          .resources.find(r => uri.includes(r.path)).operations,
      }
    }
    if (section) {
      return {
        title: `${prefix} | ${section.name}`,
        description: section.description,
        resources: menuData.find(s => uri.includes(s.path)).resources,
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
              {pageContext.section.description && (
                <Typography paragraph>
                  {pageContext.section.description}
                </Typography>
              )}
              <Grid container spacing={2}>
                {pageInfo.resources.map(r => (
                  <Grid key={r.path} item xs={12} md={6}>
                    <Card>
                      <CardHeader title={r.name} />
                      <CardActions>
                        <Button size="small" component={Link} to={r.path}>
                          Learn More
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
                <Grid item></Grid>
              </Grid>
            </React.Fragment>
          )}
          {!pageContext.operation && pageContext.resource && (
            <React.Fragment>
              <Typography variant="h1">{pageContext.resource.name}</Typography>
              {pageContext.resource.description && (
                <Typography paragraph>
                  {pageContext.resource.description}
                </Typography>
              )}
              <Grid container spacing={2}>
                {pageInfo.operations.map(o => (
                  <Grid key={o.path} item xs={12} md={6}>
                    <Card>
                      <CardHeader title={o.name} />
                      <CardActions>
                        <Button size="small" component={Link} to={o.path}>
                          Learn More
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
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
