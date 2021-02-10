import React from 'react'
import Link from '@material-ui/core/Link'
import Button, { ButtonProps } from '@material-ui/core/Button'
import { createStyles, makeStyles, Theme } from '@material-ui/core'

interface ButtonLinkProps extends ButtonProps {
  href: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:hover': {
        textDecoration: 'none',
      },
    },
  })
)

const ButtonLink: React.FunctionComponent<ButtonLinkProps> = (
  props: ButtonLinkProps
) => {
  const href = props.href
  const classes = useStyles()
  return (
    <Button
      classes={classes}
      component={React.forwardRef((linkProps: any, ref: any) => {
        return <Link {...linkProps} href={href} target="_blank" ref={ref} />
      })}
      {...props}
    />
  )
}

export default ButtonLink
