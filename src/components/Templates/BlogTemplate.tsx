import { Typography, Theme, Avatar, Box } from '@material-ui/core'
import { graphql } from 'gatsby'
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer'
import React, { useLayoutEffect } from 'react'
import { Helmet } from 'react-helmet'
import Layout from '../Layout/Layout'
import LayoutContainer from '../Layout/LayoutContainer'
import LayoutMain from '../Layout/LayoutMain'
import LayoutMenu from '../Layout/LayoutMenu'
import Case from 'case'
import { makeStyles, createStyles } from '@material-ui/styles'

interface BlogComponentProps {
  location: any
  data: {
    mdx: {
      body: string
      frontmatter: {
        title: string
        tags: string
        authors: string
        jobTitle: string
        summary: string
        publishDate: number
        updatedOnDate: number
      }
    }
  }
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    gutterBottom: {
      marginBottom: '4rem',
    },
    cardAuthorWrapper: {
      width: 70,
      height: 70,
      marginRight: '1rem',
    },
    cardAuthorImage: {
      objectPosition: 'top',
    },
  })
)

function BlogComponent(props: BlogComponentProps) {
  const classes = useStyles({})
  const { data, location } = props
  const authorImage = `/images/blog/authors/${Case.kebab(
    data.mdx.frontmatter.authors
  )}.jpg`

  useLayoutEffect(() => {
    if (!props.location.hash) return
    const el = document.getElementById(props.location.hash.split('#')[1])
    if (!el) return
    window.scrollTo(0, el.offsetTop)
  }, [props.location.hash])

  return (
    <Layout location={location}>
      <Helmet
        title={`OrderCloud Blog | ${data.mdx.frontmatter.title}`}
        meta={[
          {
            name: 'description',
            content: data.mdx.frontmatter.summary,
          },
        ]}
      />
      <LayoutContainer>
        <LayoutMain>
          <Typography variant="h1">{data.mdx.frontmatter.title}</Typography>
          <Typography color="textSecondary">
            {data.mdx.frontmatter.publishDate}
          </Typography>
          {data.mdx.frontmatter.updatedOnDate && (
            <Typography color="textSecondary" variant="caption">
              Updated On {data.mdx.frontmatter.updatedOnDate}
            </Typography>
          )}
          <MDXRenderer>{data.mdx.body}</MDXRenderer>
        </LayoutMain>
        <LayoutMenu>
          <Box display="flex" alignItems="center">
            <Avatar
              className={classes.cardAuthorWrapper}
              classes={{
                img: classes.cardAuthorImage,
              }}
              src={authorImage}
            />
            <div>
              <Typography variant="h4">
                {data.mdx.frontmatter.authors}
              </Typography>
              <Typography variant="caption">
                {data.mdx.frontmatter.jobTitle}
              </Typography>
            </div>
          </Box>
        </LayoutMenu>
      </LayoutContainer>
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogByPath($nodeID: String!) {
    mdx(id: { eq: $nodeID }) {
      body
      frontmatter {
        title
        tags
        authors
        jobTitle
        summary
        publishDate(formatString: "MMMM Do, YYYY")
        updatedOnDate(formatString: "MMMM Do, YYYY")
      }
    }
  }
`

export default BlogComponent
