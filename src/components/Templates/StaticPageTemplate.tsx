import {
  Container,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core'
import { History, RouteComponentProps } from '@reach/router'
import { graphql } from 'gatsby'
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer'
import React from 'react'
import { Helmet } from 'react-helmet'
import '../../styles/doc-template.css'
import { seafoam } from '../../theme/ocPalette.constants'
import Layout from '../Layout/Layout'

export interface StaticPageFrontmatter {
  title: string
  description: string
}

interface StaticPageTemplateProps extends RouteComponentProps {
  data: {
    mdx: {
      body: string
      fileAbsolutePath: string
      frontmatter: StaticPageFrontmatter
    }
  }
  history: History
  theme: Theme
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    renderBox: {
      paddingBottom: theme.spacing(20),
    },
  })
)

export default function StaticPageTemplate(props: StaticPageTemplateProps) {
  const { data } = props
  const doc = data // data from page query
  const classes = useStyles()

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
      <Container maxWidth="md">
        <Typography variant="h1">{doc.mdx.frontmatter.title}</Typography>
        <div className={classes.renderBox}>
          <MDXRenderer>{doc.mdx.body}</MDXRenderer>
        </div>
      </Container>
    </Layout>
  )
}

export const query = graphql`
  query StaticPageTemplateByPath($nodeID: String!) {
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
