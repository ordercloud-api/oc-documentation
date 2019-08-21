import {
  Container,
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Typography,
  Hidden,
} from '@material-ui/core'
import { graphql } from 'gatsby'
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer'
import React from 'react'
import { Helmet } from 'react-helmet'
import Layout from '../Layout/Layout'
import DocSearch from '../Shared/DocSearch'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    body: {},
    searchBox: {
      width: '100%',
      marginTop: theme.spacing(3),
    },
  })
)

interface ReleaseNotesComponentProps {
  data: {
    mdx: {
      body: string
      frontmatter: {
        apiVersion: string
        date: number
      }
    }
  }
}

function ReleaseNotesComponent(props: ReleaseNotesComponentProps) {
  const { data } = props
  const classes = useStyles(props)
  return (
    <Layout>
      <Helmet
        title={`OrderCloud Release Notes - ${data.mdx.frontmatter.apiVersion}`}
      />
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item md={9}>
            <div className={classes.body}>
              <Typography variant="h1">
                API v{data.mdx.frontmatter.apiVersion} Release Notes
              </Typography>
              <MDXRenderer>{data.mdx.body}</MDXRenderer>
            </div>
          </Grid>
          <Grid item md={3}>
            <Hidden smDown>
              <DocSearch
                darkMode={false}
                classes={{ searchBox: classes.searchBox }}
              />
            </Hidden>
            <Typography variant="h5">Other Release Notes</Typography>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  )
}

export const pageQuery = graphql`
  query ReleaseNotesTemplateByPath($nodeID: String!) {
    mdx(id: { eq: $nodeID }) {
      body
      frontmatter {
        apiVersion
        date
      }
    }
  }
`

export default ReleaseNotesComponent
