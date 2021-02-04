import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core'
import { graphql } from 'gatsby'
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer'
import React, { useLayoutEffect } from 'react'
import { Helmet } from 'react-helmet'
import '../../styles/doc-template.css'
import utility from '../../services/utility'
import DocFooter from '../Layout/DocFooter'
import DocMenu from '../Layout/DocMenu'
import Layout from '../Layout/Layout'
import LayoutContainer from '../Layout/LayoutContainer'
import LayoutMain from '../Layout/LayoutMain'
import LayoutMenu from '../Layout/LayoutMenu'
import { useDocsSections } from '../../hooks/useDocsSections'
import { RouteComponentProps } from '@reach/router'
import { EditOutlined } from '@material-ui/icons'
import ButtonlinkExternal from '../Shared/ButtonlinkExternal'

interface DocTemplateProps extends RouteComponentProps {
  data: {
    mdx: {
      body: string
      fileAbsolutePath: string
      frontmatter: {
        title: string
        updatedOnDate: number
      }
    }
  }
  theme: Theme
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    pageTitle: {
      marginBottom: theme.spacing(3),
    },
    editButton: {
      marginBottom: theme.spacing(3),
    },
    editButtonIcon: {
      marignRight: theme.spacing(1),
    },
  })
)

export default function Template(props: DocTemplateProps) {
  const doc = props.data // data from page query
  const sections = useDocsSections()
  const classes = useStyles()
  const repoUrl =
    'https://github.com/ordercloud-api/oc-documentation/edit/development'
  const absolutePath = utility.resolvePath(doc.mdx.fileAbsolutePath)

  useLayoutEffect(() => {
    if (!props.location.hash) return
    const el = document.getElementById(props.location.hash.split('#')[1])
    if (!el) return
    window.scrollTo(0, el.offsetTop - 120)
  }, [props.location.hash])

  return (
    <Layout location={props.location}>
      <Helmet title={`Four51 OrderCloud | ${doc.mdx.frontmatter.title}`} />
      <LayoutContainer>
        <LayoutMain>
          <Typography variant="h1" className={classes.pageTitle}>
            {doc.mdx.frontmatter.title}
          </Typography>
          <ButtonlinkExternal
            className={classes.editButton}
            variant="outlined"
            size="small"
            href={`${repoUrl}/content/docs${absolutePath}.mdx`}
          >
            <EditOutlined
              fontSize="inherit"
              className={classes.editButtonIcon}
            />
            Edit this doc
          </ButtonlinkExternal>
          {doc.mdx.frontmatter.updatedOnDate && (
            <Typography color="textSecondary" variant="caption">
              Last Updated {doc.mdx.frontmatter.updatedOnDate}
            </Typography>
          )}
          <MDXRenderer>{doc.mdx.body}</MDXRenderer>
          <DocFooter contents={sections} currentGuide={absolutePath} />
        </LayoutMain>
        <LayoutMenu>
          <DocMenu sections={sections} currentPath={props.location.pathname} />
        </LayoutMenu>
      </LayoutContainer>
    </Layout>
  )
}

export const query = graphql`
  query DocTemplateByPath($nodeID: String!) {
    mdx(id: { eq: $nodeID }) {
      body
      fileAbsolutePath
      frontmatter {
        title
        updatedOnDate(formatString: "MMMM Do, YYYY")
      }
    }
  }
`
