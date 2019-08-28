import React from 'react'
import { Container, makeStyles, Theme, createStyles } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      [theme.breakpoints.up('md')]: {
        overflow: 'hidden',
        display: 'flex',
        flexFlow: 'row nowrap',
      },
    },
  })
)

const LayoutContainer: React.FunctionComponent = props => {
  const classes = useStyles({})
  return <Container className={classes.root}>{props.children}</Container>
}

export default LayoutContainer
