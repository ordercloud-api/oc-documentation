import React from 'react'
import Header, { navHeight } from './Header'
import { ThemeProvider } from '@material-ui/styles'
import ORDERCLOUD_THEME from '../../theme/theme.constants'
import {
  Box,
  Theme,
  makeStyles,
  createStyles,
  Typography,
  Table,
  TableRow,
  TableCell,
  CssBaseline,
} from '@material-ui/core'
import LinkIcon from '@material-ui/icons/Link'
import { MDXProvider } from '@mdx-js/react'
import { useStaticQuery, graphql } from 'gatsby'
import utility from '../../utility'
import IconButtonLink from '../Shared/IconButtonLink'
import { Helmet } from 'react-helmet'
import Footer from './Footer'
import { seafoam } from '../../theme/ocPalette.constants'
import AlertContainer from '../Shared/Alert'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    pageWrapper: {
      backgroundColor: 'white',
      marginTop: navHeight, // spacing from top of page on mobile (due to horiz menu)
      minHeight: `calc(100vh - ${navHeight}px)`,
      [theme.breakpoints.up('md')]: {
        marginBottom: theme.spacing(52.25),
      },
      '& img': {
        maxWidth: '100%',
      },
    },
    body: {
      height: ' 100%',
      maxWidth: '100vw',
      overflowX: 'hidden',
    },
    heading: {
      position: 'relative',
      top: -theme.spacing(10),
      marginTop: theme.spacing(11),
      marginBottom: -theme.spacing(8),
    },
    containerMain: {
      zIndex: 1,
      position: 'relative',
    },
  })
)

const layoutLinkStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      float: 'left',
      display: 'inline-block',
      marginTop: -theme.spacing(1),
      marginLeft: -theme.spacing(8),
      paddingRight: theme.spacing(2),
    },
  })
)

const LayoutLink: React.FunctionComponent = (props: any) => {
  const classes = layoutLinkStyles({})
  if (!props.href) {
    console.error(
      'LayoutLink error - no href was provided. You can find it in the template by searching for [BAD LINK] in your browser.',
      props
    )
    return <Typography variant="button">[BAD LINK] {props.children}</Typography>
  }
  if (props.className === 'anchor') {
    return (
      <div className={classes.root}>
        <IconButtonLink {...props} to={props.href}>
          <LinkIcon />
        </IconButtonLink>
      </div>
    )
  }
  return <a href={props.href} children={props.children} />
}

export default props => {
  const classes = useStyles(props)
  const data = useStaticQuery(graphql`
    query {
      allMdx(
        sort: { order: ASC, fields: [frontmatter___priority] }
        filter: { fileAbsolutePath: { glob: "**/content/docs/**/*.mdx" } }
      ) {
        totalCount
        edges {
          node {
            id
            fileAbsolutePath
            frontmatter {
              section
              title
              hidden
            }
          }
        }
      }
    }
  `)
  const sections = utility.getSectionsFromDocsQuery(data)
  return (
    <ThemeProvider theme={ORDERCLOUD_THEME}>
      <Helmet
        meta={[
          {
            name: 'viewport',
            content:
              'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
          },
        ]}
      >
        <html className={classes.html} />
        <body className={classes.body} />
      </Helmet>
      <CssBaseline />
      <AlertContainer />
      <div className={classes.containerMain}>
        <Header
          location={props.location}
          siteTitle="OrderCloud Documentation"
        />
        <div className={classes.pageWrapper}>
          <MDXProvider
            components={{
              h1: props => (
                <Typography
                  {...props}
                  className={classes.heading}
                  variant="h1"
                />
              ),
              h2: props => (
                <Typography
                  {...props}
                  className={classes.heading}
                  variant="h2"
                />
              ),
              h3: props => (
                <Typography
                  {...props}
                  className={classes.heading}
                  variant="h3"
                />
              ),
              h4: props => (
                <Typography
                  {...props}
                  className={classes.heading}
                  variant="h4"
                />
              ),
              h5: props => (
                <Typography
                  {...props}
                  className={classes.heading}
                  variant="h5"
                />
              ),
              h6: props => (
                <Typography
                  {...props}
                  className={classes.heading}
                  variant="h6"
                />
              ),
              blockquote: props => (
                <Box
                  paddingX={2}
                  paddingTop={2}
                  paddingBottom="1px"
                  marginBottom={2}
                  bgcolor={seafoam[100]}
                  borderRadius={4}
                >
                  {props.children}
                </Box>
              ),
              p: props => <Typography {...props} paragraph variant="body1" />,
              ol: props => (
                <Typography paragraph variant="body1">
                  <ol {...props} />
                </Typography>
              ),
              ul: props => (
                <Typography paragraph variant="body1">
                  <ul {...props} />
                </Typography>
              ),
              a: LayoutLink,
              table: props => <Table {...props} />,
              tr: props => <TableRow {...props} />,
              th: props => (
                <TableCell variant="head" align={props.align || undefined}>
                  {props.children}
                </TableCell>
              ),
              td: props => (
                <TableCell variant="body" align={props.align || undefined}>
                  {props.children}
                </TableCell>
              ),
            }}
          >
            {props.children}
          </MDXProvider>
        </div>
      </div>
      <Footer sections={sections}></Footer>
    </ThemeProvider>
  )
}
