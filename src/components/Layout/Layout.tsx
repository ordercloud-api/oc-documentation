import {
  Box,
  createStyles,
  CssBaseline,
  Divider,
  makeStyles,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  Theme,
  Typography,
  TypographyVariant,
} from '@material-ui/core'
import LinkIcon from '@material-ui/icons/Link'
import { ThemeProvider } from '@material-ui/styles'
import { MDXProvider } from '@mdx-js/react'
import { RouteComponentProps } from '@reach/router'
import { Link } from 'gatsby'
import React from 'react'
import { Helmet } from 'react-helmet'
import { Provider } from 'react-redux'
import { seafoam } from '../../theme/ocPalette.constants'
import ORDERCLOUD_THEME from '../../theme/theme.constants'
import AlertContainer from '../Shared/Alert'
import CodeExample, { codeExampleStore } from '../Shared/CodeExample'
import ContentLink from '../Shared/ContentLink'
import IconButtonLink from '../Shared/IconButtonLink'
import { PortalLink } from '../Shared/PortalLink'
import Footer from './Footer'
import Header, { navHeight, navHeightMobile } from './Header2'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    pageWrapper: {
      backgroundColor: '#f6f6f6',
      minHeight: `calc(100vh - ${navHeightMobile}px)`,
      [theme.breakpoints.up('md')]: {
        marginBottom: theme.spacing(0),
        minHeight: `calc(100vh - ${navHeight}px)`,
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
    },
    headingSpan: {
      display: 'block',
      marginTop: -120,
      paddingBottom: 120,
      pointerEvents: 'none',
    },
    containerMain: {
      zIndex: 1,
      position: 'relative',
    },
    tableContainer: {
      marginBottom: theme.spacing(3),
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

export const LayoutLink = (props: any) => {
  const classes = layoutLinkStyles({})
  if (!props.href) {
    console.error(
      'LayoutLink error - no href was provided. You can find it in the template by searching for [BAD LINK] in your browser.',
      props
    )
    return <Typography variant="button">[BAD LINK] {props.children}</Typography>
  }
  if (props.className === 'anchor' || props.href.indexOf('#') === 0) {
    return (
      <div className={classes.root}>
        <IconButtonLink {...props} to={props.href}>
          <LinkIcon />
        </IconButtonLink>
      </div>
    )
  }
  return <a href={props.href}>{props.children}</a>
}

interface LayoutProps extends RouteComponentProps {
  children: any
}

export default (props: LayoutProps) => {
  const classes = useStyles(props)
  const buildHeader = (variant: TypographyVariant) => (hProps: any) => {
    return (
      <Typography className={classes.heading} variant={variant}>
        <span id={hProps.id} className={classes.headingSpan}></span>
        {hProps.children}
      </Typography>
    )
  }

  return (
    <Provider store={codeExampleStore}>
      <ThemeProvider theme={ORDERCLOUD_THEME}>
        <Helmet
          meta={[
            {
              property: 'og:image',
              content: '/images/meta/meta_thumbnail.jpg',
            },
            {
              name: 'viewport',
              content:
                'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
            },
            {
              name: 'description',
              content:
                'OrderCloud powers custom eCommerce (B2B, B2C, B2X), order management, and B2B marketplace applications for some of the world’s most well-known brands - processing over 25 million transactions and over $5 billion in revenue annually.',
            },
          ]}
        >
          <html />
          <body className={classes.body} />
        </Helmet>
        <CssBaseline />
        <AlertContainer />
        <div className={classes.containerMain}>
          <Header />
          {/* <Header location={props.location} /> */}
          <div className={classes.pageWrapper}>
            <MDXProvider
              components={{
                Link,
                PortalLink,
                ContentLink,
                CodeExample,
                h1: buildHeader('h1'),
                h2: buildHeader('h2'),
                h3: buildHeader('h3'),
                h4: buildHeader('h4'),
                h5: buildHeader('h5'),
                h6: buildHeader('h6'),
                blockquote: blockquoteProps => (
                  <Box
                    paddingX={2}
                    paddingTop={2}
                    paddingBottom="1px"
                    marginBottom={2}
                    bgcolor={seafoam[100]}
                    borderRadius={4}
                  >
                    {blockquoteProps.children}
                  </Box>
                ),
                p: pProps => (
                  <Typography {...pProps} paragraph variant="body1" />
                ),
                ol: olProps => (
                  <Typography
                    paragraph
                    variant="body1"
                    component="span"
                    display="block"
                  >
                    <ol {...olProps} />
                  </Typography>
                ),
                ul: ulProps => (
                  <Typography
                    paragraph
                    variant="body1"
                    component="span"
                    display="block"
                  >
                    <ul {...ulProps} />
                  </Typography>
                ),
                a: aProps => <LayoutLink {...aProps} />,
                table: tableProps => (
                  <TableContainer
                    component={Paper}
                    className={classes.tableContainer}
                  >
                    <Table {...tableProps} />
                  </TableContainer>
                ),
                tr: trProps => <TableRow {...trProps} />,
                th: thProps => (
                  <TableCell variant="head">{thProps.children}</TableCell>
                ),
                td: tdProps => (
                  <TableCell variant="body">{tdProps.children}</TableCell>
                ),
                hr: hrProps => <Divider {...hrProps} />,
              }}
            >
              {props.children}
            </MDXProvider>
          </div>
        </div>
        <Footer />
      </ThemeProvider>
    </Provider>
  )
}
