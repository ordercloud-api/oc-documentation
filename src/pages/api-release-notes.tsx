import {
  Button,
  Card,
  CardContent,
  Container,
  createStyles,
  List,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core/'
import { graphql, Link, useStaticQuery } from 'gatsby'
import React from 'react'
import { Helmet } from 'react-helmet'
import Layout from '../components/Layout/Layout'
import DocSearch from '../components/Shared/DocSearch'
import { mediumgrey } from '../theme/ocPalette.constants'
import utility from '../utility'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    searchBox: {
      position: 'absolute',
      right: 0,
      top: theme.spacing(3),
    },
    body: {
      paddingTop: theme.spacing(11),
      [theme.breakpoints.up('md')]: {
        paddingTop: theme.spacing(5),
        paddingLeft: theme.spacing(7),
      },
      [theme.breakpoints.down('sm')]: {
        marginLeft: theme.spacing(-4.5),
      },
    },
    card: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    link: {
      textDecoration: 'none',
    },
    header: {
      marginBottom: theme.spacing(0),
      [theme.breakpoints.up('lg')]: {
        marginBottom: theme.spacing(3),
      },
    },
    title: {
      marginBottom: theme.spacing(1),
    },
    subtitle: {
      color: mediumgrey[400],
    },
    container: {},
    cardText: {},
    cardRightContainer: {
      float: 'right',
    },
    releaseDate: {
      verticalAlign: 'bottom',
      display: 'inline',
      color: mediumgrey[400],
    },
    viewDetailsBtn: {
      marginLeft: theme.spacing(2),
    },
    cardBody: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      '&:last-child': {
        // DESIGN: where does this originate from? why do we need to override this in the first place?
        paddingBottom: theme.spacing(2),
      },
    },
  })
)

interface PageData {
  allMdx: {
    totalCount: number
    edges: [
      {
        node: {
          fileAbsolutePath: string
          id: string
          frontmatter: {
            apiVersion: string
            date: string
          }
        }
      }
    ]
  }
}

interface ReleaseNotesListProps {}

export default function ReleaseNotesListComponent(
  props: ReleaseNotesListProps
) {
  const classes = useStyles(props)
  const data: PageData = useStaticQuery(graphql`
    query {
      allMdx(
        sort: { order: DESC, fields: [frontmatter___date] }
        filter: {
          fileAbsolutePath: { glob: "**/content/release-notes/**/*.mdx" }
        }
      ) {
        edges {
          node {
            id
            fileAbsolutePath
            frontmatter {
              apiVersion
              date(formatString: "dddd MMMM Do, YYYY")
            }
          }
        }
      }
    }
  `)
  return (
    <Layout>
      <Helmet title={`OrderCloud Release Notes`} />
      <Container maxWidth="lg">
        <DocSearch
          darkMode={false}
          classes={{ searchBox: classes.searchBox }}
        />
        <div className={classes.header}>
          <Typography variant="h1" className={classes.title}>
            Release Notes
          </Typography>
          <Typography variant="subtitle1" className={classes.subtitle}>
            Catch up on what's new in the OrderCloud API
          </Typography>
        </div>
        <List component="nav">
          {data.allMdx.edges.map(edge => {
            const frontmatter = edge.node.frontmatter
            return (
              <Card className={classes.card}>
                <CardContent className={classes.cardBody}>
                  <div className={classes.cardText}>
                    <Typography variant="h6">
                      {`API v${frontmatter.apiVersion}`}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      className={classes.releaseDate}
                    >
                      {`released on ${frontmatter.date}`}
                    </Typography>
                  </div>
                  <Link
                    to={utility.resolvePath(edge.node.fileAbsolutePath)}
                    className={classes.link}
                  >
                    <Button
                      variant="contained"
                      size="small"
                      color="secondary"
                      className={classes.viewDetailsBtn}
                    >
                      View Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </List>
      </Container>
    </Layout>
  )
}
