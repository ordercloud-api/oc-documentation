import React from 'react'
import {
  Theme,
  withStyles,
  createStyles,
  Paper,
  Grid,
  Typography,
  Container,
  List,
  Box,
  makeStyles,
} from '@material-ui/core/'
import { graphql, useStaticQuery } from 'gatsby'

const useStyles = makeStyles((theme: Theme) => createStyles({}))

interface LandingPageData {
  allMdx: {
    totalCount: number
    edges: [
      {
        node: {
          id: string
          frontmatter: {
            title: string
            author: string
            date: number
            path: string
          }
        }
      }
    ]
  }
}

interface LandingPageProps {}

export default function LandingPageComponent(props: LandingPageProps) {
  const styles = useStyles(props)

  // TODO: we need to filter to only get release notes data and sort by date
  const data: LandingPageData = useStaticQuery(graphql`
    query {
      allMdx(sort: { order: ASC, fields: [frontmatter___priority] }) {
        totalCount
        edges {
          node {
            id
            frontmatter {
              title
              author
              date
              path
            }
          }
        }
      }
    }
  `)
  return <div>YAY HERESS THE LANDING PAGESSS</div>
}
