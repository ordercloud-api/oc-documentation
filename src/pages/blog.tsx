import React from 'react'
import {
  Theme,
  createStyles,
  makeStyles,
  Container,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardActions,
  CardContent,
  Avatar,
  IconButton,
  Icon,
  Tooltip,
} from '@material-ui/core/'
import { Share } from '@material-ui/icons'
import { graphql, useStaticQuery, Link } from 'gatsby'
import { Helmet } from 'react-helmet'
import utility from '../utility'
import Layout from '../components/Layout/Layout'
import placeholderImg from '../assets/images/placeholder__blog.jpg'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardBase: {
      transition: '0.3s',
      maxWidth: 304,
      margin: 'auto',
      boxShadow: '0 0 20px 0 rgba(0,0,0,0.12)',
      '&:hover': {
        transform: 'translateY(-3px)',
        boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)',
      },
    },
    cardImg: {
      paddingTop: '56.25%',
      position: 'relative',
      '&::after': {
        content: '" "',
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: '100%',
        borderBottom: '32px solid #ffffff',
        borderLeft: '400px solid transparent',
      },
    },
    cardRibbon: {
      position: 'absolute',
      top: theme.spacing(2),
      left: theme.spacing(2),
      backgroundColor: theme.palette.primary.main,
      color: '#ffffff !important',
      padding: '2px 8px',
      boxShadow: '0 2px 12px 2px rgba(0,0,0,0.5)',
      borderTopLeftRadius: 2,
      borderBottomLeftRadius: 2,
    },
    cardAuthor: {
      position: 'absolute',
      right: '12%',
      bottom: 4,
      transform: 'translateY(20%)',
      width: 48,
      height: 48,
      zIndex: 1,
      '&:after': {
        content: '" "',
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: '100%',
      },
    },
    cardTitle: {
      lineHeight: '1.4',
    },
    MuiCardContentRoot: {
      textAlign: 'left',
      padding: theme.spacing(3),
    },
    MuiCardActionsRoot: {
      padding: `0 ${theme.spacing(3)} ${theme.spacing(3)}`,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  })
)

interface PageData {
  allMdx: {
    totalCount: number
    edges: [
      {
        node: {
          id: string
          fileAbsolutePath: string
          frontmatter: {
            title: string
            date: string
            tags: string
            authors: string
            summary: string
          }
        }
      }
    ]
  }
}

interface BlogListProps {}

export default function BlogListComponent(props: BlogListProps) {
  const classes = useStyles(props)
  const data: PageData = useStaticQuery(graphql`
    query {
      allMdx(
        sort: { order: DESC, fields: [frontmatter___date] }
        filter: { fileAbsolutePath: { glob: "**/content/blog/**/*.mdx" } }
      ) {
        totalCount
        edges {
          node {
            id
            fileAbsolutePath
            frontmatter {
              title
              date(formatString: "dddd MMMM Do, YYYY")
              tags
              authors
              summary
            }
          }
        }
      }
    }
  `)
  return (
    <Layout>
      <Container maxWidth="lg">
        <Helmet title={`OrderCloud Blog`} />
        <Grid container className={classes.container} spacing={3}>
          {data.allMdx.edges.map(edge => {
            return (
              <Grid item xs={3}>
                <Card className={classes.cardBase}>
                  <CardMedia className={classes.cardImg} image={placeholderImg}>
                    <div className={classes.cardRibbon}>
                      <Typography variant="body2">Ribbon Boye</Typography>
                    </div>
                    <Avatar
                      className={classes.cardAuthor}
                      src={
                        'https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1234&q=80'
                      }
                    />
                  </CardMedia>
                  <CardContent className={classes.MuiCardContentRoot}>
                    <Link to={utility.resolvePath(edge.node.fileAbsolutePath)}>
                      <Typography className={classes.cardTitle} variant="h6">
                        {edge.node.frontmatter.title}
                      </Typography>
                    </Link>
                    <Typography
                      variant="body2"
                      dangerouslySetInnerHTML={{
                        __html: edge.node.frontmatter.summary,
                      }}
                    />
                  </CardContent>
                  <CardActions className={classes.MuiCardActionsRoot}>
                    <Typography variant={'caption'}>
                      {edge.node.frontmatter.date}
                    </Typography>
                    <div>
                      <Tooltip title="Share" placement="left">
                        <IconButton>
                          <Share />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </CardActions>
                </Card>
              </Grid>
            )
          })}
        </Grid>
      </Container>
    </Layout>
  )
}
