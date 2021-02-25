import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core'
import { RouteComponentProps } from '@reach/router'
import { graphql } from 'gatsby'
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer'
import React, { useLayoutEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useDocsSections } from '../../hooks/useDocsSections'
import utility from '../../services/utility'
import '../../styles/doc-template.css'
import DocFooter from '../Layout/DocFooter'
import DocMenu from '../Layout/DocMenu'
import Layout from '../Layout/Layout'
import LayoutContainer from '../Layout/LayoutContainer'
import LayoutMain from '../Layout/LayoutMain'
import LayoutMenu from '../Layout/LayoutMenu'
import SuggestEditButton from '../Shared/SuggestEditButton'

interface DocTemplateProps extends RouteComponentProps {
  data: {
    mdx: {
      body: string
      fileAbsolutePath: string
      frontmatter: {
        title: string
        section: string
        description: string
        priority: number
      }
    }
  }
  theme: Theme
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    pageSection: {
      paddingTop: '1.75rem',
      color: theme.palette.grey[500],
    },
    pageTitle: {
      paddingTop: 0,
      marginBottom: theme.spacing(3),
    },
    pageDescription: {
      fontWeight: 'bold',
      marginBottom: theme.spacing(3),
      // fontSize: theme.typography.h6.fontSize,
      fontStyle: 'italic',
      color: theme.palette.grey[700],
    },
  })
)

export default function Template(props: DocTemplateProps) {
  const doc = props.data // data from page query
  const sections = useDocsSections()
  const classes = useStyles()
  const absolutePath = utility.resolvePath(doc.mdx.fileAbsolutePath)

  useLayoutEffect(() => {
    if (!props.location.hash) return
    setTimeout(() => {
      const el = document.getElementById(props.location.hash.split('#')[1])
      if (!el) return
      window.scrollTo(0, utility.getOffsetTop(el))
    }, 300)
  }, [props.location.hash])

  return (
    <Layout location={props.location}>
      <Helmet title={`${doc.mdx.frontmatter.title} | Four51 OrderCloud`} />
      <LayoutContainer>
        <LayoutMain>
          <Typography variant="h5" className={classes.pageSection}>
            {`Learn > ${doc.mdx.frontmatter.section}`}
          </Typography>
          <Typography variant="h1" className={classes.pageTitle}>
            {doc.mdx.frontmatter.title}
          </Typography>
          <Typography className={classes.pageDescription}>
            {doc.mdx.frontmatter.description}
          </Typography>
          <SuggestEditButton path={absolutePath} />
          {/* {doc.mdx.frontmatter.updatedOnDate && (
            <Typography color="textSecondary" variant="caption">
              Last Updated {doc.mdx.frontmatter.updatedOnDate}
            </Typography>
          )} */}
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
        section
        title
        description
        priority
      }
    }
  }
`
