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

const drawerWidth = '100vw'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
    },
    drawer: {
      [theme.breakpoints.up('md')]: {
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
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    sectionTitle: {
      textTransform: 'uppercase',
    },
  })
)

interface OverlayMenuProps {
  sections: Section[]
  currentPath: string
  container: Element
  mobileOpen: boolean
  onMobileClose: (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void
}

export default function OverlayMenu(props: OverlayMenuProps) {
  const { sections, currentPath } = props
  const classes = useStyles(props)
  const theme = useTheme()

  const menu = (
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
    <Hidden xsDown implementation="css">
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="right"
      >
        {menu}
      </Drawer>
    </Hidden>
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
    <List className={classes.root}>
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
    <List component="div" disablePadding>
      <ListItem>
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
        <List component="div" disablePadding>
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
