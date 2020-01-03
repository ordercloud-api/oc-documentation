import React from 'react'
import { Link } from 'gatsby'
import Button, { ButtonProps } from '@material-ui/core/Button'

interface ButtonLinkProps extends ButtonProps {
  to: string
}

const ButtonLink: React.FunctionComponent<ButtonLinkProps> = (
  props: ButtonLinkProps
) => {
  const to = props.to
  return (
    <Button
      component={React.forwardRef((linkProps: any, ref: any) => {
        return <Link {...linkProps} to={to} ref={ref} />
      })}
      {...props}
    />
  )
}

export default ButtonLink
