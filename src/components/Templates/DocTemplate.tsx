import React from 'react'
import { Helmet } from 'react-helmet'
import Layout from '../Layout/Layout'
import RightMenu, { drawerWidth } from '../Layout/RightMenu'
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
} from '@material-ui/core'
import utility from '../Shared/utility'
import { MenuRounded } from '@material-ui/icons'
import Footer from '../Layout/Footer'

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      width: `calc(100vw - ${drawerWidth}px)`,
      marginRight: drawerWidth,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    docContainer: {
      display: 'flex',
      position: 'relative',
      marginBlockStart: '2rem',
      marginBlockEnd: '4rem',
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

interface DocTemplateState {
  mobileOpen: boolean
}

const Template = withStyles(styles)(
  class extends React.Component<any, DocTemplateState> {
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
      const { data: post, classes, location } = this.props
      const sections = utility.getSectionsFromQuery(post)
      return (
        <Layout>
          {/* <OverlayMenu sections={sections} currentPath={location.pathname} /> */}
          <Container className={classes.docContainer} maxWidth="lg">
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
              <Helmet
                title={`OrderCloud Documentation - ${post.mdx.frontmatter.title}`}
              />
              <Typography variant="h2" component="h1">
                {post.mdx.frontmatter.title}
              </Typography>
              <Typography>
                <MDXRenderer>{post.mdx.body}</MDXRenderer>
              </Typography>
              <DocFooter
                contents={sections}
                currentGuide={post.mdx.frontmatter.path}
              />
            </div>
            <RightMenu
              mobileOpen={this.state.mobileOpen}
              onMobileClose={this.handleMobileClose}
              sections={sections}
              currentPath={location.pathname}
            />
          </Container>
          <Footer right={drawerWidth} />
        </Layout>
      )
    }
  }
)

export const pageQuery = graphql`
  query DocTemplateByPath($path: String!) {
    mdx(frontmatter: { path: { eq: $path } }) {
      body
      frontmatter {
        path
        title
      }
    }
    allMdx(sort: { order: ASC, fields: [frontmatter___priority] }) {
      totalCount
      edges {
        node {
          id
          headings {
            value
          }
          frontmatter {
            section
            title
            path
          }
        }
      }
    }
  }
`

export default Template
