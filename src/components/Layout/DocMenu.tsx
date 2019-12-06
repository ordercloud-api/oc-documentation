import { Collapse, createStyles, makeStyles, Theme, Typography } from '@material-ui/core'
import { ExpandLess, ExpandMore } from '@material-ui/icons'
import { Link, withPrefix } from 'gatsby'
import React from 'react'
import { Section } from '../../models/section.model'
import { grey } from '@material-ui/core/colors'

export const drawerWidthSpacingLg = 56
export const drawerWidthSpacing = drawerWidthSpacingLg - 20

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    section: {
      marginBottom: theme.spacing(3),
    },
    sectionButton: {
      ...theme.typography.button,
      color: grey[500],
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
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
    activeSection: {
      fontWeight: 'bold',
      color: theme.palette.getContrastText(theme.palette.background.default),
    },
    active: {
      marginLeft: -theme.spacing(2.5),
      paddingLeft: theme.spacing(2),
      borderLeft: `${theme.spacing(0.5)}px solid ${
        theme.palette.secondary.light
        }`,
      '& > $listItemLink': {
        fontWeight: 'bold',
      },
    },
  })
)

interface DocMenuProps {
  sections: Section[]
  currentPath: string
}

const findActiveSection = (sections: Section[], path: string) => {
  return sections.findIndex(s => {
    return (
      s.guides.filter(g => {
        return withPrefix(g.path) === path || withPrefix(g.path) + '/' === path
      }).length > 0
    )
  })
}

export default function DocMenu(props: DocMenuProps) {
  const { sections, currentPath } = props
  // const { container, mobileOpen, onMobileClose } = props
  const classes = useStyles(props)
  const [activeIndex, setActiveIndex] = React.useState(
    findActiveSection(sections, currentPath)
  )
  const handleSetActiveIndex = (i: number) => (event: React.MouseEvent) => {
    setActiveIndex(activeIndex === i ? -1 : i)
  }

  return (
    <nav>
      {sections.map((section, sindex) => (
        <div className={classes.section} key={sindex}>
          <div
            className={`${classes.sectionButton} ${
              activeIndex === sindex ? classes.activeSection : undefined
              }`}
            onClick={handleSetActiveIndex(sindex)}
          >
            {`${section.title} `}
            {activeIndex === sindex ? <ExpandLess /> : <ExpandMore />}
          </div>
          <Collapse in={activeIndex === sindex} timeout="auto" unmountOnExit>
            <ul className={classes.list}>
              {section.guides.map((guide, gindex) => (
                <li
                  key={`${sindex}_${gindex}`}
                  className={`${
                    currentPath.includes(guide.path)
                      ? classes.active
                      : undefined
                    }`}
                >
                  <Link className={classes.listItemLink} to={guide.path}>
                    <Typography variant="body2">{guide.frontmatter.title}</Typography>
                  </Link>
                </li>
              ))}
            </ul>
          </Collapse>
        </div>
      ))}
    </nav>
  )
}
