import {
  Avatar,
  Badge,
  Chip,
  Container,
  createStyles,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from '@material-ui/core/'
import { Book, Code, Description } from '@material-ui/icons'
import { graphql, Link, useStaticQuery } from 'gatsby'
import React, { Fragment, FunctionComponent, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet'
import Layout from '../components/Layout/Layout'
import LayoutContainer from '../components/Layout/LayoutContainer'
import LayoutMain from '../components/Layout/LayoutMain'
import LayoutMenu from '../components/Layout/LayoutMenu'
import utility from '../services/utility'
import { flatten, intersection } from 'lodash'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tagChipListItem: {
      marginRight: theme.spacing(0.5),
      marginBottom: theme.spacing(0.5),
    },
    tagChipBadge: {
      right: theme.spacing(0.5),
      top: theme.spacing(0.5),
    },
  })
)

interface DocumentAuthor {
  id: string
  name: string
  title: string
}

export interface DocumentFrontMatter {
  type: string
  title: string
  description: string
  publishDate: string
  updatedDate: string | null
  author: DocumentAuthor
  tags: string[]
}

interface DocumentNode {
  id: string
  fileAbsolutePath: string
  frontmatter: DocumentFrontMatter
}

interface QueryResult {
  allMdx: {
    totalCount: number
    edges: [
      {
        node: DocumentNode
      }
    ]
  }
}

interface KnowledgeBaseProps {
  location: any
}

const KnowledgeBase: FunctionComponent<KnowledgeBaseProps> = (
  props: KnowledgeBaseProps
) => {
  const classes = useStyles()
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const data: QueryResult = useStaticQuery(graphql`
    query {
      allMdx(
        sort: { order: DESC, fields: [frontmatter___publishDate] }
        filter: { fileAbsolutePath: { glob: "**/content/documents/**/*.mdx" } }
      ) {
        totalCount
        edges {
          node {
            id
            fileAbsolutePath
            frontmatter {
              type
              title
              description
              publishDate(formatString: "MMMM Do, YYYY")
              updatedDate(formatString: "MMMM Do, YYYY")
              author {
                id
                name
                title
              }
              tags
            }
          }
        }
      }
    }
  `)

  const availableTags = useMemo(() => {
    const tagsArray = data.allMdx.edges.map(n => n.node.frontmatter.tags)
    const flattenedTags = flatten(tagsArray)
    const result: any = {}
    flattenedTags.forEach(t => {
      if (result[t]) {
        result[t]++
      } else {
        result[t] = 1
      }
    })
    return Object.entries(result)
  }, [data.allMdx.edges])

  const handleTagToggle = (tag: string) => () => {
    setSelectedTags(s =>
      s.findIndex(t => t === tag) > -1 ? s.filter(t => t !== tag) : [...s, tag]
    )
  }

  const documentNodes = useMemo(() => {
    const nodes = data.allMdx.edges.map(n => n.node)
    if (selectedTags.length) {
      return nodes.filter(
        n => intersection(n.frontmatter.tags, selectedTags).length
      )
    }
    return nodes
  }, [data.allMdx.edges, selectedTags])

  return (
    <Layout location={props.location}>
      <Helmet
        title={`Knowledge Base | Four51 OrderCloud`}
        meta={[
          {
            name: 'description',
            content:
              'A central hub for articles and tutorials on various OrderCloud API resources and topics.',
          },
        ]}
      />
      <LayoutContainer>
        <LayoutMain>
          <Typography variant="h1">Knowledge Base</Typography>
          <DocumentList nodes={documentNodes}></DocumentList>
        </LayoutMain>
        <LayoutMenu>
          <Typography variant="h5" paragraph>
            Filter by tag:
          </Typography>
          <Container maxWidth="xs" disableGutters>
            {availableTags
              .sort((a: any, b: any) => b[1] - a[1])
              .map(t => (
                <Chip
                  color={selectedTags.includes(t[0]) ? 'secondary' : 'default'}
                  clickable
                  onClick={handleTagToggle(t[0])}
                  variant={selectedTags.includes(t[0]) ? 'default' : 'outlined'}
                  key={t[0]}
                  avatar={<Avatar>{t[1]}</Avatar>}
                  label={t[0]}
                  className={classes.tagChipListItem}
                />
              ))}
          </Container>
        </LayoutMenu>
      </LayoutContainer>
    </Layout>
  )
}

const useDocListStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(1),
    },
    listItemDescription: {
      marginBottom: theme.spacing(1),
    },
  })
)

interface DocumentListProps {
  nodes: DocumentNode[]
}

const DocumentList: FunctionComponent<DocumentListProps> = (
  props: DocumentListProps
) => {
  const { nodes } = props
  const classes = useDocListStyles()
  const documentListItem = (node: DocumentNode) => {
    return (
      <Paper elevation={2} className={classes.root}>
        <ListItem
          button
          component={Link}
          to={utility.resolvePath(node.fileAbsolutePath)}
          key={node.id}
          alignItems="flex-start"
        >
          <ListItemAvatar>
            <Avatar>
              {node.frontmatter.type === 'tutorial' ? (
                <Code />
              ) : (
                <Description />
              )}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={node.frontmatter.title}
            secondary={
              <Fragment>
                <Typography
                  variant="inherit"
                  display="block"
                  className={classes.listItemDescription}
                >
                  {node.frontmatter.description}
                </Typography>
                <Typography variant="caption" display="block">
                  {`${
                    node.frontmatter.updatedDate ? 'Updated' : 'Published'
                  } by ${node.frontmatter.author.name} on ${node.frontmatter
                    .updatedDate || node.frontmatter.publishDate}`}
                </Typography>
              </Fragment>
            }
          ></ListItemText>
        </ListItem>
      </Paper>
    )
  }
  return <List disablePadding>{nodes.map(documentListItem)}</List>
}

export default KnowledgeBase
