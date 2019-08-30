import {
  Box,
  createStyles,
  Fab,
  Hidden,
  Theme,
  Typography,
  withStyles,
} from '@material-ui/core'
import { MenuRounded } from '@material-ui/icons'
import { graphql } from 'gatsby'
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer'
import React from 'react'
import { Helmet } from 'react-helmet'
import { DocsQuery } from '../../models/docsQuery'
import '../../styles/doc-template.css'
import utility from '../../utility'
import DocFooter from '../Layout/DocFooter'
import Footer from '../Layout/Footer'
import Layout from '../Layout/Layout'
import RightMenu, {
  drawerWidthSpacing,
  drawerWidthSpacingLg,
} from '../Layout/RightMenu'
import DocSearch from '../Shared/DocSearch'

const styles = (theme: Theme) =>
  createStyles({
    searchBox: {
      position: 'absolute',
      right: theme.spacing(3),
      top: theme.spacing(3),
    },
    docBody: {
      backgroundColor: 'white',
      marginTop: theme.spacing(10),
      [theme.breakpoints.up('md')]: {
        marginTop: 0,
        marginBottom: theme.spacing(56),
        marginRight: theme.spacing(drawerWidthSpacing),
      },
      [theme.breakpoints.up('lg')]: {
        marginRight: theme.spacing(drawerWidthSpacingLg),
      },
    },
    docBodyPadding: {
      maxWidth: '100%',
      flexWrap: 'wrap',
      padding: theme.spacing(0, 2, 2),
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(0, 5, 5),
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
      const gitHubUrl =
        'https://github.com/ordercloud-api/oc-documentation/tree/development/content/docs'
      const { data: post, classes, location, theme } = this.props
      const sections = utility.getSectionsFromDocsQuery(post)
      return (
        <Layout>
          <Helmet
            title={`${post.mdx.frontmatter.title} - OrderCloud Documentation`}
          />
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
            <DocSearch
              darkMode={false}
              classes={{ searchBox: classes.searchBox }}
            />
            <Box className={classes.docBodyPadding}>
              <Box
                display="flex"
                justifyContent="space-between"
                align-items="center"
              >
                <Typography variant="h1">
                  {post.mdx.frontmatter.title}
                </Typography>
                {/* <Button
                  size="small"
                  style={{ alignSelf: 'center' }}
                  variant="outlined"
                  href={`${gitHubUrl}${utility.resolvePath(
                    post.mdx.fileAbsolutePath
                  )}.mdx`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Edit
                    fontSize="inherit"
                    style={{ marginRight: theme.spacing(1) }}
                  ></Edit>
                  Edit Doc
                </Button> */}
              </Box>
              <MDXRenderer>{post.mdx.body}</MDXRenderer>
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
            depth
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
