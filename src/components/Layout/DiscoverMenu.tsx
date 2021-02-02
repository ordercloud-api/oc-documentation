import {
  Collapse,
  createStyles,
  makeStyles,
  Typography,
  Theme,
} from '@material-ui/core'
import { ExpandLess, ExpandMore, OpenInNew } from '@material-ui/icons'
import { Link, withPrefix } from 'gatsby'
import React from 'react'
import { Article } from '../../models/tableOfContents.model'
import { seafoam } from '../../theme/ocPalette.constants'
import Case from 'case'

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
  return 0
  // return articles.findIndex(s => {
  //   return (
  //     s.guides.filter(g => {
  //       return withPrefix(g.path) === path || `${withPrefix(g.path)}/` === path
  //     }).length > 0
  //   )
  // })
}

export default function DiscoverMenu(props: DiscoverMenuProps) {
  const { articles, currentPath } = props
  // const { container, mobileOpen, onMobileClose } = props
  const classes = useStyles(props)
  const [activeIndex, setActiveIndex] = React.useState(
    findActiveArticle(articles, currentPath)
  )
  const handleSetActiveIndex = (i: number) => () => {
    setActiveIndex(activeIndex === i ? -1 : i)
  }

  return (
    <nav>
      {articles.map((article, aindex) => (
        <React.Fragment key={aindex}>
          <Typography
            className={`${classes.section} ${
              activeIndex === aindex ? classes.sectionActive : undefined
            }`}
            variant="h4"
            component="h5"
            onClick={handleSetActiveIndex(aindex)}
          >
            {`${article.title} `}
            {activeIndex === aindex ? <ExpandLess /> : <ExpandMore />}
          </Typography>
          <Collapse in={activeIndex === aindex} timeout="auto" unmountOnExit>
            <div className={classes.guides}>
              {article.headings.map((heading, hindex) => (
                <Typography
                  display="block"
                  key={`${aindex}_${hindex}`}
                  className={`${classes.guide}`}
                  // ${
                  //     currentPath.includes(guide.path)
                  //     ? classes.guideActive
                  //     : undefined
                  // }`}
                  to={`${article.path}#${Case.kebab(heading.value)}`}
                  variant="body1"
                  component={Link}
                >
                  {heading.value}
                </Typography>
              ))}
            </div>
          </Collapse>
        </React.Fragment>
      ))}
    </nav>
  )
}
