import {
  Avatar,
  Box,
  Breadcrumbs,
  Chip,
  Container,
  createStyles,
  Hidden,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { History, RouteComponentProps } from '@reach/router'
import { graphql, Link } from 'gatsby'
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer'
import React, { useLayoutEffect, Fragment } from 'react'
import { Helmet } from 'react-helmet'
import useActiveId from '../../hooks/useActiveId'
import { useRelatedDocuments } from '../../hooks/useRelatedDocuments'
import { Heading } from '../../models/tableOfContents.model'
import { DocumentFrontMatter } from '../../pages/knowledge-base'
import utility from '../../services/utility'
import '../../styles/doc-template.css'
import { seafoam } from '../../theme/ocPalette.constants'
import { transformHeadingToId } from '../Layout/DiscoverMenu'
import Layout from '../Layout/Layout'
import { filter } from 'lodash'
import LayoutContainer from '../Layout/LayoutContainer'
import LayoutMain from '../Layout/LayoutMain'
import LayoutMenu from '../Layout/LayoutMenu'
import IconButtonLink from '../Shared/IconButtonLink'
import SuggestEditButton from '../Shared/SuggestEditButton'

interface KnowledgeBaseTemplateProps extends RouteComponentProps {
  data: {
    mdx: {
      body: string
      fileAbsolutePath: string
      headings: Heading[]
      frontmatter: DocumentFrontMatter
    }
  }
  history: History
  theme: Theme
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    pageSuperTitle: {
      paddingTop: '1.75rem',
      color: theme.palette.grey[500],
    },
    heading: {
      textDecoration: 'none',
      lineHeight: 1.15,
      marginBottom: theme.spacing(1),
      color: theme.palette.getContrastText(theme.palette.background.paper),
    },
    heading2: {},
    heading3: {
      marginLeft: theme.spacing(2),
    },
    heading4: {
      marginLeft: theme.spacing(4),
    },
    heading5: {
      marginLeft: theme.spacing(6),
    },
    heading6: {
      marginLeft: theme.spacing(8),
    },
    activeHeading: {
      fontWeight: 'bold',
      marginLeft: -theme.spacing(2.25),
      paddingLeft: theme.spacing(1.75),
      borderLeft: `${theme.spacing(0.5)}px solid ${seafoam[500]}`,
      '& .MuiTypography-root': {
        fontWeight: 'bold',
      },
    },
    renderBox: {
      paddingBottom: theme.spacing(20),
    },
    backButton: {
      float: 'right',
      marginTop: theme.spacing(2),
      marginLeft: theme.spacing(1),
    },
    tagChipListItem: {
      marginRight: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    menuHeader: {
      marginBottom: theme.spacing(1),
    },
    menuSection: {
      marginBottom: theme.spacing(3),
    },
    relatedDocument: {
      lineHeight: 1.15,
      marginBottom: theme.spacing(1),
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  })
)

export default function KnowledgeBaseTemplate(
  props: KnowledgeBaseTemplateProps
) {
  const { location, data } = props
  const doc = data // data from page query
  // const articles = useDiscoverSections()
  const classes = useStyles()
  const absolutePath = utility.resolvePath(doc.mdx.fileAbsolutePath)
  const relatedDocuments = filter(
    useRelatedDocuments(
      doc.mdx.frontmatter.tags.filter(t => t !== 'Best Practices')
    ),
    d => d.fileAbsolutePath !== doc.mdx.fileAbsolutePath
  )

  useLayoutEffect(() => {
    if (!props.location.hash) return
    setTimeout(() => {
      const el = document.getElementById(props.location.hash.split('#')[1])
      if (!el) return
      window.scrollTo(0, utility.getOffsetTop(el))
    }, 300)
  }, [props.location.hash])

  const headings = React.useMemo(() => {
    return doc.mdx.headings.map(h => ({
      ...h,
      id: transformHeadingToId(h.value),
    }))
  }, [doc.mdx.headings])

  const activeId = useActiveId(headings.map(h => h.id))

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
          <IconButtonLink
            className={classes.backButton}
            to={`/knowledge-base${
              location.state &&
              location.state.selectedTags &&
              location.state.selectedTags.length
                ? `?t=${location.state.selectedTags.join(',')}`
                : ''
            }`}
          >
            <Close />
          </IconButtonLink>
          <Hidden mdDown>
            <Breadcrumbs>
              <Link to="/">Home</Link>
              <Link to="/knowledge-base">Knowledge Base</Link>
            </Breadcrumbs>
          </Hidden>
          <Typography variant="h1">{doc.mdx.frontmatter.title}</Typography>
          <SuggestEditButton path={absolutePath} />
          <Box display="flex" mb={3} alignItems="center">
            <Avatar
              alt={doc.mdx.frontmatter.author.name}
              src={`/images/authors/${doc.mdx.frontmatter.author.id}.jpg`}
            ></Avatar>
            <div style={{ paddingLeft: 8 }}>
              <Typography color="textSecondary">
                {`${
                  doc.mdx.frontmatter.updatedDate ? 'Updated' : 'Published'
                } by ${doc.mdx.frontmatter.author.name}`}
              </Typography>
              <Typography color="textSecondary">
                {doc.mdx.frontmatter.updatedDate ||
                  doc.mdx.frontmatter.publishDate}
              </Typography>
            </div>
          </Box>
          <div className={classes.renderBox}>
            <MDXRenderer>{doc.mdx.body}</MDXRenderer>
          </div>
        </LayoutMain>
        <LayoutMenu>
          <Container maxWidth="xs" disableGutters>
            <Typography variant="h5" className={classes.menuHeader}>
              Contents
            </Typography>
            <div className={classes.menuSection}>
              {headings.map((heading, hindex) => {
                return (
                  <div
                    key={hindex}
                    className={`${
                      activeId === heading.id ? classes.activeHeading : ''
                    }`}
                  >
                    <Typography
                      display="block"
                      className={`${classes.heading} ${
                        classes[`heading${heading.depth}`]
                      }`}
                      to={`${absolutePath}#${heading.id}`}
                      variant="body1"
                      component={Link}
                    >
                      {heading.value}
                    </Typography>
                  </div>
                )
              })}
            </div>
            <Typography variant="h5" className={classes.menuHeader}>
              Tags
            </Typography>
            <div className={classes.menuSection}>
              {doc.mdx.frontmatter.tags.map(t => (
                <Chip
                  clickable
                  component={Link}
                  to={`/knowledge-base?t=${t}`}
                  variant="outlined"
                  key={t}
                  label={t}
                  className={classes.tagChipListItem}
                />
              ))}
            </div>
            {Boolean(relatedDocuments.length) && (
              <Fragment>
                <Typography variant="h5" className={classes.menuHeader}>
                  Related Reading
                </Typography>
                <div className={classes.menuSection}>
                  {relatedDocuments.map(t => (
                    <Typography
                      className={classes.relatedDocument}
                      component={Link}
                      state={{
                        selectedTags:
                          location.state && location.state.selectedTags,
                      }}
                      to={utility.resolvePath(t.fileAbsolutePath)}
                      key={t.id}
                      display="block"
                    >
                      {t.frontmatter.title}
                    </Typography>
                  ))}
                </div>
              </Fragment>
            )}
          </Container>
        </LayoutMenu>
      </LayoutContainer>
    </Layout>
  )
}

export const query = graphql`
  query KnowledgeBaseTemplateByPath($nodeID: String!) {
    mdx(id: { eq: $nodeID }) {
      body
      headings {
        depth
        value
      }
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
`
