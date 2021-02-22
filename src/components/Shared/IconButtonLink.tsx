import React from 'react'
import IconButton, { IconButtonProps } from '@material-ui/core/IconButton'

interface IconButtonLinkProps extends IconButtonProps {
  to: string
}

class IconButtonLink extends React.Component<IconButtonLinkProps> {
  public buildLink = () =>
    React.forwardRef((props: any, ref: any) => {
      return <a {...props} href={props.to} ref={ref} />
    })
  public render() {
    return <IconButton component={this.buildLink()} {...this.props} />
  }
}

export default IconButtonLink
