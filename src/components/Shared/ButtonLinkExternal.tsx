import React from 'react'
import Link from '@material-ui/core/Link'
import Button, { ButtonProps } from '@material-ui/core/Button'

interface ButtonLinkProps extends ButtonProps {
  href: string
}

const ButtonLink: React.FunctionComponent<ButtonLinkProps> = (
  props: ButtonLinkProps
) => {
  const href = props.href
  return (
    <Button
      component={React.forwardRef((linkProps: any, ref: any) => {
        return <Link {...linkProps} href={href} target="_blank" ref={ref} />
      })}
      {...props}
    />
  )
}

export default ButtonLink
