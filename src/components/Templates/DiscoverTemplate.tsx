import { Theme, Typography } from '@material-ui/core'
import { graphql } from 'gatsby'
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer'
import React, { useLayoutEffect } from 'react'
import { Helmet } from 'react-helmet'
import '../../styles/doc-template.css'
import utility from '../../services/utility'
import DocFooter from '../Layout/DocFooter'
import Layout from '../Layout/Layout'
import LayoutContainer from '../Layout/LayoutContainer'
import LayoutMain from '../Layout/LayoutMain'
import LayoutMenu from '../Layout/LayoutMenu'
import { useDiscoverSections } from '../../hooks/useDiscoverSections'
import { RouteComponentProps } from '@reach/router'
import { EditOutlined } from '@material-ui/icons'
import ButtonlinkExternal from '../Shared/ButtonlinkExternal'
import DiscoverMenu from '../Layout/DiscoverMenu'

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

export default function Template(props: DocTemplateProps) {
  const doc = props.data // data from page query
  const articles = useDiscoverSections()
  const repoUrl =
    'https://github.com/ordercloud-api/oc-documentation/edit/development'
  const absolutePath = utility.resolvePath(doc.mdx.fileAbsolutePath)

  useLayoutEffect(() => {
    if (!props.location.hash) return
    const el = document.getElementById(props.location.hash.split('#')[1])
    if (!el) return
    window.scrollTo(0, el.offsetTop)
  }, [props.location.hash])

  return (
    <Layout location={props.location}>
      <Helmet title={`Four51 OrderCloud | ${doc.mdx.frontmatter.title}`} />
      <LayoutContainer>
        <LayoutMain>
          <ButtonlinkExternal
            style={{ float: 'right', marginTop: 40 }}
            variant="outlined"
            size="small"
            href={`${repoUrl}/content/discover${absolutePath}.mdx`}
          >
            <EditOutlined fontSize="inherit" /> Edit this doc
          </ButtonlinkExternal>
          <Typography variant="h1">{doc.mdx.frontmatter.title}</Typography>
          {doc.mdx.frontmatter.updatedOnDate && (
            <Typography color="textSecondary" variant="caption">
              Last Updated {doc.mdx.frontmatter.updatedOnDate}
            </Typography>
          )}
          <MDXRenderer>{doc.mdx.body}</MDXRenderer>
          {/* <DocFooter contents={sections} currentGuide={absolutePath} /> */}
        </LayoutMain>
        <LayoutMenu>
          <DiscoverMenu
            articles={articles}
            currentPath={absolutePath}
          ></DiscoverMenu>
        </LayoutMenu>
      </LayoutContainer>
    </Layout>
  )
}

export const query = graphql`
  query DiscoverTemplateByPath($nodeID: String!) {
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
