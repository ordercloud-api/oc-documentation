import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      [theme.breakpoints.up('md')]: {
        flex: '1 1 60%',
        minHeight: '100vh',
        width: '60%',
        padding: theme.spacing(0, 4, 4, 3),
      },
      [theme.breakpoints.up('lg')]: {
        paddingRight: theme.spacing(8),
      },
    },
  })
)

const LayoutMain: React.FunctionComponent = (props: { children: any }) => {
  const classes = useStyles({})
  return <div className={classes.root}>{props.children}</div>
}

export default LayoutMain
