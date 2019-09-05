import React from 'react'
import { Link } from 'gatsby'
import Chip, { ChipProps } from '@material-ui/core/Chip'
import { makeStyles, Theme, createStyles } from '@material-ui/core'

interface ChipLinkProps extends ChipProps {
  to: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      cursor: 'pointer',
      transition: theme.transitions.create('border'),
      border: '1px solid transparent',
      '&:hover': {
        // background: theme.palette.primary.light,
        border: `1px solid ${theme.palette.getContrastText(
          theme.palette.primary.main
        )}`,
      },
    },
  })
)

const ChipLink: React.FunctionComponent<ChipLinkProps> = props => {
  const classes = useStyles({})
  return (
    <Chip
      component={React.forwardRef((props: any, ref: any) => {
        return <Link {...props} href={props.to} ref={ref} />
      })}
      {...props}
      classes={{ root: classes.root }}
    />
  )
}

export default ChipLink
