import React from 'react'
import { Button, makeStyles, Theme, createStyles } from '@material-ui/core'
import { ButtonProps } from '@material-ui/core/Button'
import classNames from 'classnames'
import { darken } from '@material-ui/core/styles'
import { Link } from 'gatsby'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: (props: any) => {
      const contrastColor = theme.palette.getContrastText(props.color)
      return {
        backgroundColor: `${
          props.variant === 'contained' ? props.color : undefined
        }`,
        borderColor: `${
          props.variant === 'outlined' ? props.color : undefined
        }`,
        color: `${props.variant === 'contained' ? contrastColor : props.color}`,
        transition: theme.transitions.create(['color', 'background', 'border']),
        '&:hover': {
          backgroundColor: `${
            props.variant === 'contained'
              ? darken(
                  props.color,
                  theme.palette.tonalOffset.valueOf() as number
                )
              : props.color
          }`,
          color: `${props.variant === 'outlined' ? contrastColor : undefined}`,
        },
      }
    },
  })
)


interface CustomButtonLinkProps extends CustomButtonProps {
  to: string
  component?: any
}
export const CustomButtonLink: React.FunctionComponent<CustomButtonLinkProps> = (
  props: CustomButtonLinkProps
) => {
  const to = props.to
  return (
    <CustomButton
      component={React.forwardRef((props: any, ref: any) => {
        return <Link {...props} to={to} ref={ref} />
      })}
      {...props}
    />
  )
}

interface CustomButtonProps extends ButtonProps {
  color: any
}
export const CustomButton: React.FunctionComponent<CustomButtonProps> = (
  props: CustomButtonProps
) => {
  const { color, ...rest } = props
  const classes = useStyles({ color: color, variant: props.variant })
  return (
    <Button
      {...rest}
      className={classNames(classes.root, props.className)}
    ></Button>
  )
}
