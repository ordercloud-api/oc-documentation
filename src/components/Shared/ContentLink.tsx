import {
  Avatar,
  Box,
  ButtonBase,
  Card,
  CardActionArea,
  CardHeader,
  createStyles,
  Grid,
  IconProps,
  makeStyles,
  Paper,
  SvgIconTypeMap,
  Theme,
  Link as MaterialLink,
  Typography,
} from '@material-ui/core'
import { OverridableComponent } from '@material-ui/core/OverridableComponent'
import {
  BookmarkOutlined,
  CodeOutlined,
  MenuBookOutlined,
  School,
  SchoolOutlined,
} from '@material-ui/icons'
import { Link } from 'gatsby'
import React, {
  FunctionComponent,
  PropsWithChildren,
  ReactElement,
  useMemo,
} from 'react'
import { flame } from '../../theme/ocPalette.constants'

interface ContentLinkProps {
  icon?: ReactElement
  subtitle: string
  to: string
  type?: 'developer' | 'bookmark' | 'education'
  absolute?: boolean
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      paddingTop: '1rem',
      marginBottom: '1.5rem',
    },
    button: {
      justifyContent: 'stretch',
      borderRadius: theme.shape.borderRadius,
      border: `1px solid ${theme.palette.grey[400]}`,
    },
    avatar: {
      backgroundColor: flame[400],
    },
    link: {
      textDecoration: 'none',
    },
    innerContent: {
      padding: theme.spacing(1),
    },
    subtitle: {
      lineHeight: 1,
      color: theme.palette.grey[500],
    },
  })
)

const ContentLink: FunctionComponent<ContentLinkProps> = (
  props: PropsWithChildren<ContentLinkProps>
) => {
  const { children, type, to, absolute, subtitle } = props
  const classes = useStyles()

  const icon = useMemo(() => {
    switch (type) {
      case 'developer':
        return <CodeOutlined />
      case 'bookmark':
        return <BookmarkOutlined />
      case 'education':
        return <SchoolOutlined />
      default:
        return <MenuBookOutlined />
    }
  }, [type])

  const innerContent = useMemo(() => {
    return (
      <Box className={classes.innerContent} alignItems="center" display="flex">
        <Box flex="0 1 auto" mr={2}>
          <Avatar variant="rounded" className={classes.avatar}>
            {icon}
          </Avatar>
        </Box>
        <Box flex="1 1 auto" pr={1}>
          <Typography variant="overline" className={classes.subtitle}>
            {subtitle}
          </Typography>
          <Typography variant="h5" component="p">
            {children}
          </Typography>
        </Box>
      </Box>
    )
  }, [children, icon, subtitle])
  return (
    <div className={classes.root}>
      <ButtonBase
        component={absolute ? 'a' : Link}
        href={absolute ? to : undefined}
        to={absolute ? undefined : to}
        target={absolute ? '_blank' : undefined}
        className={classes.button}
      >
        {innerContent}
      </ButtonBase>
    </div>
  )
}

export default ContentLink
