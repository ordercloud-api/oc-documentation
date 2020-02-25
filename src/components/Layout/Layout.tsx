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
  Divider,
} from '@material-ui/core'
import LinkIcon from '@material-ui/icons/Link'
import { MDXProvider } from '@mdx-js/react'
import IconButtonLink from '../Shared/IconButtonLink'
import { Helmet } from 'react-helmet'
import Footer from './Footer'
import { seafoam } from '../../theme/ocPalette.constants'
import AlertContainer from '../Shared/Alert'
import { RouteComponentProps } from '@reach/router'
import { useDocsSections } from '../../hooks/useDocsSections'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    pageWrapper: {
      backgroundColor: 'white',
      minHeight: `calc(100vh - ${navHeight}px)`,
      [theme.breakpoints.up('md')]: {
        marginBottom: theme.spacing(51),
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
  const sections = useDocsSections()
  return (
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
        <Header location={props.location} />
        <div className={classes.pageWrapper}>
          <MDXProvider
            components={{
              h1: h1Props => (
                <Typography
                  {...h1Props}
                  className={classes.heading}
                  variant="h1"
                />
              ),
              h2: h2Props => (
                <Typography
                  {...h2Props}
                  className={classes.heading}
                  variant="h2"
                />
              ),
              h3: h3Props => (
                <Typography
                  {...h3Props}
                  className={classes.heading}
                  variant="h3"
                />
              ),
              h4: h4Props => (
                <Typography
                  {...h4Props}
                  className={classes.heading}
                  variant="h4"
                />
              ),
              h5: h5Props => (
                <Typography
                  {...h5Props}
                  className={classes.heading}
                  variant="h5"
                />
              ),
              h6: h6Props => (
                <Typography
                  {...h6Props}
                  className={classes.heading}
                  variant="h6"
                />
              ),
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
              p: pProps => <Typography {...pProps} paragraph variant="body1" />,
              ol: olProps => (
                <Typography paragraph variant="body1">
                  <ol {...olProps} />
                </Typography>
              ),
              ul: ulProps => (
                <Typography paragraph variant="body1" component="span">
                  <ul {...ulProps} />
                </Typography>
              ),
              a: aProps => <LayoutLink {...aProps} />,
              table: tableProps => <Table {...tableProps} />,
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
      <Footer sections={sections}></Footer>
    </ThemeProvider>
  )
}
