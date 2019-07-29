import React from 'react'
import { Section, Guide } from '../Shared/models/section.model'
import { Link } from 'gatsby'

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
  Divider,
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
      color: theme.palette.grey[400],
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

export default function RightMenu(props: RightMenuProps) {
  const { sections, currentPath, mobileOpen, onMobileClose } = props
  // const { container, mobileOpen, onMobileClose } = props
  const classes = useStyles(props)
  const theme = useTheme()

  const drawer = (
    <React.Fragment>
      {sections.map(section => (
        <SectionMenu
          key={section.title}
          section={section}
          currentPath={currentPath}
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
}
function SectionMenu(props: SectionMenuProps) {
  const { section, currentPath } = props
  const classes = useStyles(props)
  const hasActiveGuide = section.guides
    .map(g => g.frontmatter.path)
    .includes(currentPath)
  const [open, setOpen] = React.useState(hasActiveGuide)

  function handleClick() {
    setOpen(!open)
  }

  return (
    <List dense={true} className={classes.root}>
      <ListItem button onClick={handleClick}>
        <ListItemText>
          <Typography className={classes.sectionTitle}>
            {section.title}
          </Typography>
        </ListItemText>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {section.guides.map(guide => (
          <GuideMenu key={guide.id} guide={guide} currentPath={currentPath} />
        ))}
      </Collapse>
      <Divider />
    </List>
  )
}

interface GuideMenuProps extends StyledComponentProps {
  guide: Guide
  currentPath: string
}
function GuideMenu(props: GuideMenuProps) {
  const { guide, currentPath } = props
  const classes = useStyles(props)
  const isActive = guide.frontmatter.path.includes(currentPath)
  const [open, setOpen] = React.useState(isActive)

  function handleToggleDrawer() {
    setOpen(!open)
  }

  return (
    <List dense={true} component="div" disablePadding>
      <ListItem button>
        <ListItemText>
          <Link to={guide.frontmatter.path}>{guide.frontmatter.title}</Link>
        </ListItemText>
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
              key={`guide_heading${heading}`}
              guidePath={guide.frontmatter.path}
              heading={heading.value}
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
}
function GuideHeading(props: GuideHeadingProps) {
  const { heading, guidePath } = props
  const classes = useStyles(props)
  const guideSectionLink = buildGuideSectionLink(guidePath, heading)

  function buildGuideSectionLink(guidePath: string, heading: string): string {
    const guideSectionPath =
      '#' +
      heading
        .toLowerCase()
        .replace(/[!@#$%^&*()=_+|;':",.<>?'’]/g, '') // remove punctuation
        .replace(/  +/g, ' ') // replace multiple whitespaces by just one
        .replace(/ /g, '-') // replace spaces with hypens
    return guidePath + guideSectionPath
  }

  return (
    <ListItem
      key={guidePath}
      button
      component={props => <Link {...props} to={guideSectionLink}></Link>}
    >
      <ListItemText primary={heading} />
    </ListItem>
  )
}
