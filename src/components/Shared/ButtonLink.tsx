import React from 'react'
import { Link } from 'gatsby'
import Button, { ButtonProps } from '@material-ui/core/Button'

interface ButtonLinkProps extends ButtonProps {
  to: string
}

const ButtonLink: React.FunctionComponent<ButtonLinkProps> = props => {
  return (
    <Button
      component={React.forwardRef((props: any, ref: any) => {
        return <Link {...props} to={props.to} ref={ref} />
      })}
      {...props}
    />
  )
}

export default ButtonLink
