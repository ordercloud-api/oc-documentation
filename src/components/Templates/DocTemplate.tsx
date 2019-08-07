import React from 'react'
import { Helmet } from 'react-helmet'
import Layout from '../Layout/Layout'
import RightMenu, {
  drawerWidthSpacing,
  drawerWidthSpacingLg,
} from '../Layout/RightMenu'
import '../../styles/doc-template.css'
import { graphql } from 'gatsby'
import DocFooter from '../Layout/DocFooter'
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer'
import {
  withStyles,
  createStyles,
  Theme,
  Typography,
  Container,
  Fab,
  Hidden,
  Box,
} from '@material-ui/core'
import utility from '../../utility'
import { MenuRounded } from '@material-ui/icons'
import Footer from '../Layout/Footer'
import { DocsQuery } from '../../models/docsQuery'

const styles = (theme: Theme) =>
  createStyles({
    docBody: {
      backgroundColor: 'white',
      marginRight: theme.spacing(9),
      [theme.breakpoints.up('md')]: {
        marginBottom: theme.spacing(56),
        marginRight: theme.spacing(drawerWidthSpacing),
      },
      [theme.breakpoints.up('lg')]: {
        marginRight: theme.spacing(drawerWidthSpacingLg),
      },
    },
    docBodyPadding: {
      padding: theme.spacing(0),
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(5),
      },
      [theme.breakpoints.up('lg')]: {
        paddingLeft: theme.spacing(15),
        paddingRight: theme.spacing(15),
      },
      [theme.breakpoints.up('xl')]: {
        paddingLeft: theme.spacing(35),
        paddingRight: theme.spacing(35),
      },
    },
    fab: {
      zIndex: theme.zIndex.drawer + 1,
      position: 'fixed',
      bottom: theme.spacing(9),
      right: theme.spacing(2),
    },
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    },
  })

interface DocTemplateProps {
  data: DocsQuery
  classes: any
  location: any
  theme: Theme
}
interface DocTemplateState {
  mobileOpen: boolean
}

const Template = withStyles(styles, { withTheme: true })(
  class extends React.Component<DocTemplateProps, DocTemplateState> {
    public state: DocTemplateState = {
      mobileOpen: false,
    }
    public handleMobileToggle = (event: React.MouseEvent) => {
      this.setState(state => ({
        mobileOpen: !state.mobileOpen,
      }))
    }
    public handleMobileClose = () => {
      this.setState({
        mobileOpen: false,
      })
    }

    public render() {
      const { data: post, classes, location, theme } = this.props
      const sections = utility.getSectionsFromDocsQuery(post)
      return (
        <Layout>
          {/* <OverlayMenu sections={sections} currentPath={location.pathname} /> */}
          <Hidden mdUp implementation="js">
            <Fab
              onClick={this.handleMobileToggle}
              className={classes.fab}
              color="primary"
              aria-label="Overlaying Menu For Mobile"
            >
              <MenuRounded />
            </Fab>
          </Hidden>
          <div className={classes.docBody}>
            <Box className={classes.docBodyPadding}>
              <Helmet
                title={`${post.mdx.frontmatter.title} - OrderCloud Documentation`}
              />
              <Typography variant="h2" component="h1">
                {post.mdx.frontmatter.title}
              </Typography>
              <Typography>
                <MDXRenderer>{post.mdx.body}</MDXRenderer>
              </Typography>
              <DocFooter
                contents={sections}
                currentGuide={utility.resolvePath(post.mdx.fileAbsolutePath)}
              />
            </Box>
          </div>
          <RightMenu
            mobileOpen={this.state.mobileOpen}
            onMobileClose={this.handleMobileClose}
            sections={sections}
            currentPath={location.pathname}
          />
          <Footer
            sections={sections}
            right={theme.spacing(drawerWidthSpacingLg)}
          />
        </Layout>
      )
    }
  }
)

export const pageQuery = graphql`
  query DocTemplateByPath($nodeID: String!) {
    mdx(id: { eq: $nodeID }) {
      body
      fileAbsolutePath
      frontmatter {
        title
      }
    }
    allMdx(
      sort: { order: ASC, fields: [frontmatter___priority] }
      filter: { fileAbsolutePath: { glob: "**/content/docs/**/*.mdx" } }
    ) {
      totalCount
      edges {
        node {
          id
          fileAbsolutePath
          headings {
            value
          }
          frontmatter {
            section
            title
          }
        }
      }
    }
  }
`

export default Template
