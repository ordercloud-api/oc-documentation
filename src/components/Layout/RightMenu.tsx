import React from 'react'
import { Section, Guide } from '../Shared/models/section.model'
import { Link } from '../Shared/Link'

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
} from '@material-ui/core'
import { ExpandLess, ExpandMore } from '@material-ui/icons'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
    sectionTitle: {
      textTransform: 'uppercase',
    },
  })
)
/**
 * TODO: (possible enhancements)
 * 1. Make it sticky
 * 2. Make it responsive
 * 3. Style it better, need something that distinguishes the headings from the guides a bit more
 * 4. remove underline from guide links
 * 5. Make the scroll less jarring
 * 6. Figure out how to keep sections expanded if user manually expanded (possibly cookies)
 * 7. Fix: expanding a section shouldn't make the width jump around
 */

interface RightMenuProps {
  sections: Section[]
  currentPath: string
}
export default function RightMenu(props: RightMenuProps) {
  const { sections, currentPath } = props
  const classes = useStyles(props)
  return (
    <div>
      {sections.map(section => {
        return (
          <SectionMenu
            key={section.title}
            section={section}
            currentPath={currentPath}
          />
        )
      })}
    </div>
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
    <List component="nav" className={classes.root}>
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
      className={classes.nested}
      component={Link}
      to={guideSectionLink}
    >
      <ListItemText primary={heading} />
    </ListItem>
  )
}
