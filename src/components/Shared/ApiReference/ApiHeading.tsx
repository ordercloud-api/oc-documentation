import React, { useMemo } from 'react'
import {
  TypographyProps,
  Typography,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core'
import IconButtonLink from '../IconButtonLink'
import { Link } from '@material-ui/icons'
import Case from 'case'

interface ApiHeadingProps extends TypographyProps {
  title: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    iconButton: (props: any) => {
      const top = (() => {
        switch (props.variant) {
          case 'h1':
            return theme.spacing(4)
          case 'h2':
            return theme.spacing(3)
          case 'h3':
            return theme.spacing(2)
          default:
            return 0
        }
      })()
      return {
        top,
        position: 'absolute',
        left: 'auto',
        right: '100%',
        opacity: 0,
        transition: theme.transitions.create('opacity', {
          duration: theme.transitions.duration.shorter,
        }),
      }
    },
    root: {
      position: 'relative',
      ['&:hover > $iconButton']: {
        opacity: 1,
      },
    },
    headingSpan: {
      display: 'block',
      marginTop: -120,
      paddingBottom: 120,
    },
  })
)

const ApiHeading = (props: ApiHeadingProps) => {
  const classes = useStyles(props)
  const { title } = props
  const hash = useMemo(() => {
    return Case.kebab(props.title)
  }, [title])
  return (
    <div className={classes.root}>
      <IconButtonLink to={`#${hash}`} className={classes.iconButton}>
        <Link />
      </IconButtonLink>
      <Typography {...props}>
        <span id={hash} className={classes.headingSpan}></span>
        {title}
      </Typography>
    </div>
  )
}

export default ApiHeading
