import { createStyles, makeStyles, Typography, Theme } from '@material-ui/core'
import { Link, withPrefix } from 'gatsby'
import React from 'react'
import { Section } from '../../models/section.model'
import { seafoam } from '../../theme/ocPalette.constants'

export const drawerWidthSpacingLg = 56
export const drawerWidthSpacing = drawerWidthSpacingLg - 20

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    section: {
      color: theme.palette.grey[500],
      display: 'flex',
      alignItems: 'center',
      marginBottom: 0,
      paddingTop: 0,
    },
    sectionActive: {
      color: theme.palette.getContrastText(theme.palette.background.paper),
    },
    guides: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(2),
    },
    guide: {
      lineHeight: 1,
      paddingTop: theme.spacing(0.5),
      paddingBottom: theme.spacing(1),
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

interface DocMenuProps {
  sections: Section[]
  currentPath: string
}

const findActiveSection = (sections: Section[], path: string) => {
  return sections.findIndex(s => {
    return (
      s.guides.filter(g => {
        return withPrefix(g.path) === path || `${withPrefix(g.path)}/` === path
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
  const handleSetActiveIndex = (i: number) => () => {
    setActiveIndex(activeIndex === i ? -1 : i)
  }

  return (
    <nav>
      {sections.map((section, sindex) => (
        <React.Fragment key={sindex}>
          <Typography
            className={`${classes.section} ${
              activeIndex === sindex ? classes.sectionActive : undefined
            }`}
            variant="h4"
            component="h5"
          >
            {section.title}
          </Typography>
          <div className={classes.guides}>
            {section.guides.map((guide, gindex) => (
              <Typography
                display="block"
                key={`${sindex}_${gindex}`}
                className={`${classes.guide} ${
                  currentPath.includes(guide.path)
                    ? classes.guideActive
                    : undefined
                }`}
                to={guide.path}
                variant="body1"
                component={Link}
              >
                {guide.frontmatter.title}
              </Typography>
            ))}
          </div>
        </React.Fragment>
      ))}
    </nav>
  )
}
