import React, { useEffect } from 'react'
import { Section, Guide } from '../../models/section.model'
import { Link, withPrefix } from 'gatsby'

import {
  List,
  ListItemText,
  ListItem,
  Theme,
  createStyles,
  StyledComponentProps,
  Collapse,
  makeStyles,
  Typography,
  Drawer,
  Hidden,
  useTheme,
} from '@material-ui/core'
import { ExpandLess, ExpandMore } from '@material-ui/icons'

export const drawerWidthSpacingLg = 56
export const drawerWidthSpacing = drawerWidthSpacingLg - 20

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
    },
    drawer: {
      [theme.breakpoints.up('lg')]: {
        width: theme.spacing(drawerWidthSpacingLg),
        flexShrink: 0,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: theme.spacing(drawerWidthSpacingLg),
      maxWidth: '100vw',
      [theme.breakpoints.up('lg')]: {
        maxWidth: 'none',
      },
      [theme.breakpoints.down('md')]: {
        width: theme.spacing(drawerWidthSpacing),
      },
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    sectionTitle: {
      textTransform: 'uppercase',
      letterSpacing: theme.spacing(0.2),
      fontWeight: 600,
      color: theme.palette.grey[700],
    },
    active: {
      backgroundColor: theme.palette.grey[200],
    },
    activeHeading: {
      backgroundColor: theme.palette.grey[200],
    },
    guideAnchorLinks: (props: any) => {
      let offset = props.depth - 1
      if (offset > 1) {
        offset = offset * 0.75
      }
      return {
        paddingLeft: theme.spacing(offset * 5.5),
      }
    },
    guideAnchorLinkIcon: {
      display: 'flex',
      alignItems: 'center',
      marginRight: theme.spacing(0.5),
    },
  })
)
/**
 * TODO: (possible enhancements)
 * 1. Make it sticky @esitarz
 * 2. Make it responsive @esitarz
 * 3. Style it better, need something that distinguishes the headings from the guides a bit more
 * 4. remove underline from guide links
 * 5. Make the scroll less jarring @cramirez
 * 6. Figure out how to keep sections expanded if user manually expanded (possibly cookies)
 * 7. Fix: expanding a section shouldn't make the width jump around @esitarz
 */

interface RightMenuProps {
  sections: Section[]
  currentPath: string
  mobileOpen: boolean
  onMobileClose: (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void
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

export default function RightMenu(props: RightMenuProps) {
  const { sections, currentPath, mobileOpen, onMobileClose } = props
  // const { container, mobileOpen, onMobileClose } = props
  const classes = useStyles(props)
  const theme = useTheme()
  const [activeHeading, setActiveHeading] = React.useState('')
  const [activeIndex, setActiveIndex] = React.useState(
    findActiveSection(sections, currentPath)
  )
  const handleSetActiveIndex = (i: number) => {
    setActiveIndex(activeIndex === i ? -1 : i)
  }

  const onScroll = (event: Event, headings: NodeListOf<HTMLElement>) => {
    let smallest, elementId
    Array.from(headings).forEach(h => {
      let diff = window.scrollY - h.offsetTop
      if (diff < 0) diff = -diff
      if (
        typeof smallest === 'undefined' ||
        (typeof smallest === 'number' && diff < smallest)
      ) {
        smallest = diff
        elementId = h.id
      }
    })
    setActiveHeading(elementId)
  }

  useEffect(() => {
    // smooth scroll to section link on page load
    if (window.location.hash && !activeHeading) {
      window.setTimeout(() => {
        // kind of hacky but sommetimes especially on a long page the dom
        // won't fully load and offset is off, this waits 400ms for dom to load fully
        let top = document.getElementById(window.location.hash.substr(1))
          .offsetTop
        window.scrollTo({
          top: top,
          behavior: `smooth`,
        })
      }, 400)
    }
  }, [])

  useEffect(() => {
    // set active section on scroll
    const headings = document.querySelectorAll(
      'h1,h2,h3,h4,h5,h6'
    ) as NodeListOf<HTMLElement>
    const onScrollWithHeadings = event => onScroll(event, headings)
    window.addEventListener('scroll', onScrollWithHeadings)
    return () => {
      window.removeEventListener('scroll', onScrollWithHeadings)
    }
  }, [])

  const drawer = (
    <React.Fragment>
      {sections.map((section, index) => (
        <SectionMenu
          key={section.title}
          section={section}
          currentPath={currentPath}
          activeHeading={activeHeading}
          activeIndex={activeIndex}
          onClick={handleSetActiveIndex}
          index={index}
        />
      ))}
    </React.Fragment>
  )

  return (
    <nav>
      <Hidden smDown implementation="css">
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="right"
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden mdUp implementation="css">
        <Drawer
          className={classes.drawer}
          variant="temporary"
          open={mobileOpen}
          onClose={onMobileClose}
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="right"
        >
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  )
}

interface SectionMenuProps {
  section: Section
  currentPath: string
  activeHeading: string
  activeIndex: number
  onClick: (i: number) => void
  index: number
}
function SectionMenu(props: SectionMenuProps) {
  const {
    section,
    currentPath,
    activeHeading,
    activeIndex,
    onClick,
    index,
  } = props
  const classes = useStyles(props)

  function handleClick() {
    onClick(index)
  }

  return (
    <List dense={false} className={classes.root} disablePadding>
      <ListItem
        button
        onClick={handleClick}
        className={activeIndex === index ? classes.active : ''}
      >
        <ListItemText
          className={classes.sectionTitle}
          primary={section.title}
        ></ListItemText>
        {activeIndex === index ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={activeIndex === index} timeout="auto" unmountOnExit>
        {section.guides.map((guide, index) => (
          <GuideMenu
            key={guide.id}
            guide={guide}
            currentPath={currentPath}
            activeHeading={activeHeading}
            index={index}
          />
        ))}
      </Collapse>
    </List>
  )
}

function buildLink(to: string) {
  return React.forwardRef((props: any, ref: any) => {
    return <Link {...props} to={to} innerRef={ref} />
  })
}

interface GuideMenuProps extends StyledComponentProps {
  guide: Guide
  currentPath: string
  activeHeading: string
  index: number
}
function GuideMenu(props: GuideMenuProps) {
  const { guide, currentPath, activeHeading, index } = props
  const classes = useStyles(props)
  const isActive = currentPath.includes(guide.path)
  const [open, setOpen] = React.useState(isActive)

  function handleToggleDrawer() {
    setOpen(!open)
  }

  return (
    <List dense={true} component="div" disablePadding>
      <ListItem component={buildLink(guide.path)} button>
        <ListItemText>{guide.frontmatter.title}</ListItemText>
        {open ? (
          <ExpandLess onClick={handleToggleDrawer} />
        ) : (
          <ExpandMore onClick={handleToggleDrawer} />
        )}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List dense={true} component="div" disablePadding>
          {guide.headings.map(heading => (
            <GuideHeading
              key={`guide_heading${heading.value}`}
              guidePath={guide.path}
              heading={heading}
              activeHeading={activeHeading || guide.headings[0].value}
            />
          ))}
        </List>
      </Collapse>
    </List>
  )
}

interface GuideHeadingProps {
  guidePath: string
  heading: {
    value: string
    depth: number
  }
  activeHeading: string
}
function GuideHeading(props: GuideHeadingProps) {
  const { heading, activeHeading, guidePath } = props
  const classes = useStyles({ depth: heading.depth })
  const slugify = (path: string) =>
    path
      .toLowerCase()
      .replace(/[!@#$%^&*()=_+|;':",.<>?'’]/g, '') // remove punctuation
      .replace(/  +/g, ' ') // replace multiple whitespaces by just one
      .replace(/ /g, '-') // replace spaces with hypens

  const guideSectionLink = buildGuideSectionLink(
    guidePath,
    slugify(heading.value)
  )
  function buildGuideSectionLink(guidePath: string, heading: string): string {
    const guideSectionPath = '#' + heading
    return guidePath + guideSectionPath
  }
  return (
    <ListItem
      className={`${classes.guideAnchorLinks} ${
        slugify(activeHeading) === slugify(heading.value)
          ? classes.activeHeading
          : ''
      }`}
      key={guidePath}
      button
      component={buildLink(guideSectionLink)}
    >
      <ListItemText primary={heading.value} />
    </ListItem>
  )
}
