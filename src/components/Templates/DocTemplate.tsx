import { Theme, Typography } from '@material-ui/core'
import { graphql, useStaticQuery } from 'gatsby'
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer'
import React from 'react'
import { Helmet } from 'react-helmet'
import { DocsQuery } from '../../models/docsQuery'
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

interface DocTemplateProps extends RouteComponentProps {
  data: {
    mdx: {
      body: string
      fileAbsolutePath: string
      frontmatter: {
        title: string
      }
    }
  }
  theme: Theme
}

export default function Template(props: DocTemplateProps) {
  const doc = props.data // data from page query
  const sections = useDocsSections()

  return (
    <Layout location={props.location}>
      <Helmet
        title={`${doc.mdx.frontmatter.title} - OrderCloud Documentation`}
      />
      <LayoutContainer>
        <LayoutMain>
          <Typography variant="h1">{doc.mdx.frontmatter.title}</Typography>
          <MDXRenderer>{doc.mdx.body}</MDXRenderer>
          <DocFooter
            contents={sections}
            currentGuide={utility.resolvePath(doc.mdx.fileAbsolutePath)}
          />
        </LayoutMain>
        <LayoutMenu>
          <DocMenu sections={sections} currentPath={location.pathname} />
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
      }
    }
  }
`
