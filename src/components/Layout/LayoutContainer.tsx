import React from 'react'
import { Container, makeStyles, createStyles, Theme } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      [theme.breakpoints.up('md')]: {
        paddingLeft: 0,
        display: 'flex',
        flexFlow: 'row nowrap',
      },
    },
  })
)

const LayoutContainer: React.FunctionComponent = (props: { children: any }) => {
  const classes = useStyles({})
  return <Container className={classes.root}>{props.children}</Container>
}

export default LayoutContainer
