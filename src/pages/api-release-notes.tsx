import React from 'react'
import {
  Theme,
  createStyles,
  makeStyles,
  List,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
} from '@material-ui/core/'
import { graphql, useStaticQuery, Link } from 'gatsby'
import { Helmet } from 'react-helmet'
import utility from '../utility'
import Layout from '../components/Layout/Layout'
import { mediumgrey } from '../theme/ocPalette.constants'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
    body: {
      paddingTop: theme.spacing(11),
      [theme.breakpoints.up('md')]: {
        paddingTop: theme.spacing(5),
        paddingLeft: theme.spacing(7),
      },
    },
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
    cardText: {},
    cardBody: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
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
      <Container maxWidth="lg">
        <Grid container className={classes.container} spacing={3}>
          <Grid item xs={9}>
            <Helmet title={`OrderCloud Release Notes`} />
            <div className={classes.body}>
              <div className={classes.header}>
                <Typography
                  variant="h2"
                  component="h1"
                  className={classes.title}
                >
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
            </div>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  )
}
