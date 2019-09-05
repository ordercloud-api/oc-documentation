import React from 'react'
import { Button, makeStyles, Theme, createStyles } from '@material-ui/core'
import { ButtonProps } from '@material-ui/core/Button'
import classNames from 'classnames'
import { darken, lighten, fade } from '@material-ui/core/styles'
import { Link } from 'gatsby'

interface CustomButtonProps extends ButtonProps {
  color: any
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: (props: any) => {
      return {
        backgroundColor: `${
          props.variant === 'contained' ? props.color : undefined
        }`,
        borderColor: `${
          props.variant === 'outlined' ? props.color : undefined
        }`,
        color: `${
          props.variant === 'contained'
            ? theme.palette.getContrastText(props.color)
            : props.color
        }`,
        transition: theme.transitions.create(['color', 'background', 'border']),
        '&:hover': {
          backgroundColor: `${
            props.variant === 'contained'
              ? darken(props.color, theme.palette.tonalOffset)
              : fade(lighten(props.color, theme.palette.tonalOffset), 0.5)
          }`,
          color: `${
            props.variant === 'outlined'
              ? theme.palette.getContrastText(props.color)
              : undefined
          }`,
        },
      }
    },
  })
)

export const CustomButton: React.FunctionComponent<
  CustomButtonProps
> = props => {
  const classes = useStyles({ color: props.color, variant: props.variant })
  return (
    <Button
      {...props}
      className={classNames(classes.root, props.className)}
    ></Button>
  )
}

interface CustomButtonLinkProps extends CustomButtonProps {
  to: string
}

export const CustomButtonLink: React.FunctionComponent<
  CustomButtonLinkProps
> = (props: any) => {
  return (
    <CustomButton
      component={React.forwardRef((props: any, ref: any) => {
        return <Link {...props} to={props.to} ref={ref} />
      })}
      {...props}
    />
  )
}
