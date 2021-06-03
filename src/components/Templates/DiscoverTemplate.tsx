import {
  Breadcrumbs,
  Box,
  createStyles,
  Link,
  makeStyles,
  Theme,
  Typography,
  Hidden,
} from '@material-ui/core'
import { RouteComponentProps } from '@reach/router'
import { graphql } from 'gatsby'
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer'
import React, { useLayoutEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useDiscoverSections } from '../../hooks/useDiscoverSections'
import utility from '../../services/utility'
import '../../styles/doc-template.css'
import DiscoverMenu from '../Layout/DiscoverMenu'
import DiscoverFooter from '../Layout/DiscoverFooter'
import Layout from '../Layout/Layout'
import LayoutContainer from '../Layout/LayoutContainer'
import LayoutMain from '../Layout/LayoutMain'
import LayoutMenu from '../Layout/LayoutMenu'
import SuggestEditButton from '../Shared/SuggestEditButton'

interface DiscoverTemplateProps extends RouteComponentProps {
  data: {
    mdx: {
      body: string
      fileAbsolutePath: string
      frontmatter: {
        title: string
        description: string
        updatedOnDate: number
      }
    }
  }
  theme: Theme
}

const useStyles = makeStyles((theme: Theme) => createStyles({}))

export default function Template(props: DiscoverTemplateProps) {
  const doc = props.data // data from page query
  const articles = useDiscoverSections()
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
      <Helmet
        title={`${doc.mdx.frontmatter.title} | Sitecore OrderCloud`}
        meta={[
          {
            name: 'description',
            content: doc.mdx.frontmatter.description,
          },
        ]}
      />
      <LayoutContainer>
        <LayoutMain>
          <Hidden mdDown>
            <Breadcrumbs>
              <Link href="/">Home</Link>
              <Typography>Discover</Typography>
            </Breadcrumbs>
          </Hidden>
          <Typography variant="h1">{doc.mdx.frontmatter.title}</Typography>
          <MDXRenderer>{doc.mdx.body}</MDXRenderer>
          <DiscoverFooter contents={articles} currentGuide={absolutePath} />
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
        description
      }
    }
  }
`
