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
  List,
  Container,
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
import Jumbotron from '../Shared/Jumbotron'
import ListItemLink from '../Shared/ListItemLink'

interface ApiReferenceProps extends RouteComponentProps {
  pageContext: {
    currentPath: string
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
    paperList: {
      flexGrow: 1,
      [theme.breakpoints.up('md')]: {
        columns: 2,
      },
    },
    apiRefGrid: {
      position: 'relative',
      zIndex: 2,
      marginTop: -theme.spacing(8),
    },
    apiRefCard: {
      display: 'flex',
      flexFlow: 'column nowrap',
      height: '100%',
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
    const { section, resource, operation, menuData, currentPath } = pageContext
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
          .find(s => currentPath.includes(s.path))
          .resources.find(r => currentPath.includes(r.path)).operations,
      }
    }
    if (section) {
      return {
        title: `${prefix} | ${section.name}`,
        description: section.description,
        resources: menuData.find(s => currentPath.includes(s.path)).resources,
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
      {!pageContext.section && (
        <React.Fragment>
          <Jumbotron heading="API Reference" text={defaultDescription} />
          <Container>
            <Grid container spacing={3} className={classes.apiRefGrid}>
              {pageContext.menuData.map(s => (
                <Grid key={s.path} item xs={12} sm={6} md={4}>
                  <Card className={classes.apiRefCard}>
                    <CardHeader
                      title={
                        <Typography style={{ paddingTop: 0 }} variant="h3">
                          {s.name}
                        </Typography>
                      }
                    />
                    <List
                      disablePadding={true}
                      dense={true}
                      className={classes.paperList}
                    >
                      {s.resources.map(r => (
                        <ListItemLink key={r.path} to={r.path}>
                          {r.name}
                        </ListItemLink>
                      ))}
                    </List>
                    <CardActions>
                      <Button
                        size="small"
                        color="secondary"
                        component={Link}
                        to={s.path}
                      >
                        Learn More
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </React.Fragment>
      )}
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
          ) : null}
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
                        <Button
                          size="small"
                          component={Link}
                          to={r.path}
                          color="secondary"
                        >
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
                        <Button
                          size="small"
                          component={Link}
                          to={o.path}
                          color="secondary"
                        >
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
        {pageContext.section && (
          <LayoutMenu>
            <ApiReferenceMenu data={pageContext.menuData} uri={uri} />
          </LayoutMenu>
        )}
      </LayoutContainer>
    </Layout>
  )
}

export default ApiReference
