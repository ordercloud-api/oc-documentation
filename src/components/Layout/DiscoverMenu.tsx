import {
  Collapse,
  createStyles,
  makeStyles,
  Typography,
  Theme,
} from '@material-ui/core'
import { ExpandLess, ExpandMore } from '@material-ui/icons'
import { Link } from 'gatsby'
import rsc from 'replace-special-characters'
import React from 'react'
import { Article } from '../../models/tableOfContents.model'
import { seafoam } from '../../theme/ocPalette.constants'
import Case from 'case'
import useActiveId from '../../hooks/useActiveId'

export const drawerWidthSpacingLg = 56
export const drawerWidthSpacing = drawerWidthSpacingLg - 20

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    section: {
      cursor: 'pointer',
      color: theme.palette.grey[500],
      display: 'flex',
      alignItems: 'center',
      marginBottom: theme.spacing(2),
      textDecoration: 'none',
    },
    sectionActive: {
      marginBottom: 0,
      color: theme.palette.getContrastText(theme.palette.background.paper),
    },
    guides: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    guide: {
      lineHeight: 1.75,
      textDecoration: 'none',
      color: theme.palette.getContrastText(theme.palette.background.paper),
    },
    guideActive: {
      fontWeight: 'bold',
      marginLeft: -theme.spacing(2.25),
      paddingLeft: theme.spacing(1.75),
      borderLeft: `${theme.spacing(0.5)}px solid ${seafoam[500]}`,
    },
    list: {
      margin: theme.spacing(3, 4, 0, 4),
      listStyle: 'none',
    },
    listItemLink: {
      ...theme.typography.body1,
      lineHeight: 1.75,
      color: theme.palette.getContrastText(theme.palette.background.default),
      textDecoration: 'none',
    },
    linkIcon: {
      marginLeft: theme.spacing(1),
      fontSize: 'inherit',
      color: theme.palette.text.hint,
    },
    activeSection: {
      fontWeight: 'bold',
      color: theme.palette.getContrastText(theme.palette.background.default),
    },
    active: {
      marginLeft: -theme.spacing(2.25),
      paddingLeft: theme.spacing(1.75),
      borderLeft: `${theme.spacing(0.5)}px solid ${
        theme.palette.secondary.light
      }`,
      '& > $listItemLink': {
        fontWeight: 'bold',
      },
    },
  })
)

interface DiscoverMenuProps {
  articles: Article[]
  currentPath: string
}

const findActiveArticle = (articles: Article[], path: string) => {
  return articles.findIndex(a => a.path === path)
}

const stripSpecialChars = (string: string) => {
  return string.replace(/[’]/gi, '')
}

const transformHeadingToId = (string: string) => {
  return Case.kebab(rsc(stripSpecialChars(string)))
}

export default function DiscoverMenu(props: DiscoverMenuProps) {
  const { articles, currentPath } = props

  const classes = useStyles(props)

  const activeIndex = React.useMemo(() => {
    return findActiveArticle(articles, currentPath)
  }, [articles, currentPath])

  const activeArticleHeadings = React.useMemo(() => {
    return articles[activeIndex].headings.map(h =>
      transformHeadingToId(h.value)
    )
  }, [articles, activeIndex])

  const activeId = useActiveId(activeArticleHeadings)

  return (
    <nav>
      {articles.map((article, aindex) => (
        <React.Fragment key={aindex}>
          <Typography
            className={`${classes.section} ${
              activeIndex === aindex ? classes.sectionActive : ''
            }`}
            variant="h4"
            to={article.path}
            component={Link}
          >
            {article.title}
          </Typography>
          <Collapse in={activeIndex === aindex} timeout="auto" unmountOnExit>
            <div className={classes.guides}>
              {article.headings.map((heading, hindex) => {
                const headingId = transformHeadingToId(heading.value)
                return (
                  <Typography
                    display="block"
                    key={`${aindex}_${hindex}`}
                    className={`${classes.guide} ${
                      activeId === headingId ? classes.guideActive : ''
                    }`}
                    // ${
                    //     currentPath.includes(guide.path)
                    //     ? classes.guideActive
                    //     : undefined
                    // }`}
                    to={`${article.path}#${headingId}`}
                    variant="body1"
                    component={Link}
                  >
                    {heading.value}
                  </Typography>
                )
              })}
            </div>
          </Collapse>
        </React.Fragment>
      ))}
    </nav>
  )
}
