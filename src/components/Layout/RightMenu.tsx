import React, { useEffect } from 'react'
import { Section, Guide } from '../../models/section.model'
import { Link } from 'gatsby'

const svgIcon = (
  <svg
    aria-hidden="true"
    focusable="false"
    height="16"
    version="1.1"
    viewBox="0 0 16 16"
    width="16"
  >
    <path
      fill-rule="evenodd"
      d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
    ></path>
  </svg>
)

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

export const drawerWidth = 451

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
    },
    drawer: {
      [theme.breakpoints.up('lg')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      marginLeft: drawerWidth,
      [theme.breakpoints.up('md')]: {
        width: `calc(100% - ${drawerWidth}px)`,
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
      width: drawerWidth,
      maxWidth: '100vw',
      [theme.breakpoints.up('lg')]: {
        maxWidth: 'none',
      },
      [theme.breakpoints.down('md')]: {
        width: `calc(${drawerWidth}px - ${theme.spacing(20)}px)`,
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
      '&::before': {
        content: `''`,
        fontFamily: `'FontAwesome'`,
        position: `absolute`,
        top: `-3px`,
        left: `3%`,
        color: `${theme.palette.primary.light}`,
        fontSize: `22px`,
      },
    },
    guideAnchorLinks: {
      paddingLeft: theme.spacing(5.5),
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
        return g.path === path || g.path + '/' === path
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
      if (!smallest || (smallest && diff < smallest)) {
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
        <ListItemText>
          <Typography className={classes.sectionTitle}>
            {section.title}
          </Typography>
        </ListItemText>
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

interface GuideMenuProps extends StyledComponentProps {
  guide: Guide
  currentPath: string
  activeHeading: string
  index: number
}
function GuideMenu(props: GuideMenuProps) {
  const { guide, currentPath, activeHeading, index } = props
  const classes = useStyles(props)
  const isActive = guide.path.includes(currentPath)
  const [open, setOpen] = React.useState(isActive)

  function handleToggleDrawer() {
    setOpen(!open)
  }
  useEffect(() => {
    if (!activeHeading) {
      let headingUrlParam = window.location.hash.substring(1)
      guide.headings.forEach(h => {
        let formattedHeading = h.value
          .toLowerCase()
          .replace(/ /g, '-')
          .replace(/[!@#$%^&*()=_+|;':",.<>?'’]/g, '')
        if (formattedHeading === headingUrlParam) {
          setOpen(true)
        }
      })
    }
  }, [guide, activeHeading, setOpen])

  return (
    <List dense={true} component="div" disablePadding>
      <ListItem component={Link} to={guide.path} button>
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
              heading={heading.value}
              activeHeading={activeHeading}
            />
          ))}
        </List>
      </Collapse>
    </List>
  )
}

interface GuideHeadingProps {
  guidePath: string
  heading: string
  activeHeading: string
}
function GuideHeading(props: GuideHeadingProps) {
  const { heading, activeHeading, guidePath } = props
  const classes = useStyles(props)
  const headingLink = heading
    .toLowerCase()
    .replace(/[!@#$%^&*()=_+|;':",.<>?'’]/g, '') // remove punctuation
    .replace(/  +/g, ' ') // replace multiple whitespaces by just one
    .replace(/ /g, '-') // replace spaces with hypens
  const guideSectionLink = buildGuideSectionLink(guidePath, headingLink)
  function buildGuideSectionLink(guidePath: string, heading: string): string {
    const guideSectionPath = '#' + heading
    return guidePath + guideSectionPath
  }
  return (
    <ListItem
      className={`${classes.guideAnchorLinks} ${
        activeHeading === headingLink ? classes.activeHeading : ''
      }`}
      key={guidePath}
      button
      component={props => <Link {...props} to={guideSectionLink}></Link>}
    >
      <span className={classes.guideAnchorLinkIcon}>{svgIcon}</span>
      <ListItemText primary={heading} />
    </ListItem>
  )
}
