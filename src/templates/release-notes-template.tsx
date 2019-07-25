import React from 'react'
import { Helmet } from 'react-helmet'
import Layout from '../components/Layout/Layout'
import { graphql } from 'gatsby'
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer'

import {
  createStyles,
  Typography,
  Grid,
  Container,
  Theme,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginBlockStart: '2rem',
      marginBlockEnd: '4rem',
    },
    body: {},
  })
)

interface TemplateComponentProps {
  data: {
    mdx: {
      body: string
      frontmatter: {
        title: string
      }
    }
  }
}

function TemplateComponent(props: TemplateComponentProps) {
  const { data } = props
  const classes = useStyles(props)
  return (
    <Layout>
      <Container maxWidth="lg">
        <Grid container className={classes.container} spacing={3}>
          <Grid item xs={9}>
            <Helmet
              title={`OrderCloud Release Notes - ${data.mdx.frontmatter.title}`}
            />
            <div className={classes.body}>
              <Typography variant="h2" component="h1">
                {data.mdx.frontmatter.title}
              </Typography>
              <Typography>
                <MDXRenderer>{data.mdx.body}</MDXRenderer>
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  )
}

export const pageQuery = graphql`
  query ReleaseNotesTemplateByPath($path: String!) {
    mdx(frontmatter: { path: { eq: $path } }) {
      body
      frontmatter {
        title
      }
    }
  }
`

export default TemplateComponent
