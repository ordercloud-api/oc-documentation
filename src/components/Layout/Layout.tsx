import React from 'react'
import Header from './Header'
import { ThemeProvider } from '@material-ui/styles'
import ORDERCLOUD_THEME from '../../theme/theme.constants'
import {
  Hidden,
  Box,
  Theme,
  makeStyles,
  createStyles,
  Typography,
  IconButton,
  Table,
  TableRow,
  TableCell,
} from '@material-ui/core'
import LinkIcon from '@material-ui/icons/Link'
import MobileNav from './MobileNav'
import { MDXProvider } from '@mdx-js/react'
import { Link } from 'gatsby'
import IconButtonLink from '../Shared/IconButtonLink'
import { FileCopy } from '@material-ui/icons'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    pageWrapper: {
      backgroundColor: 'white',
      marginTop: theme.spacing(9), // spacing from top of page on mobile (due to horiz menu)
      [theme.breakpoints.up('md')]: {
        marginLeft: theme.spacing(7.5), // vertical nav width spacing
        marginTop: 0, // no horizontal nav to worry about
      },
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
  if (props.className === 'anchor') {
    return (
      <div className={classes.root}>
        <IconButtonLink {...props} to={props.href}>
          <LinkIcon />
        </IconButtonLink>
      </div>
    )
  }
  return <Link {...props} to={props.href} />
}

export default props => {
  const classes = useStyles(props)
  return (
    <React.Fragment>
      <ThemeProvider theme={ORDERCLOUD_THEME}>
        <Header siteTitle="OrderCloud Documentation" />
        <div className={classes.pageWrapper}>
          <MDXProvider
            components={{
              h1: props => <Typography {...props} variant="h1" />,
              h2: props => <Typography {...props} variant="h2" />,
              h3: props => <Typography {...props} variant="h3" />,
              h4: props => <Typography {...props} variant="h4" />,
              h5: props => <Typography {...props} variant="h5" />,
              h6: props => <Typography {...props} variant="h6" />,
              p: props => <Typography {...props} variant="body1" />,
              ol: props => (
                <Typography {...props} component="ol" variant="body1" />
              ),
              ul: props => (
                <Typography {...props} component="ul" variant="body1" />
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
        <Hidden mdUp>
          <MobileNav />
        </Hidden>
      </ThemeProvider>
    </React.Fragment>
  )
}
