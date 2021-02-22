import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      [theme.breakpoints.up('md')]: {
        flex: '1 1 80%',
        minHeight: '100vh',
        width: '80%',
        padding: theme.spacing(0, 4, 4, 4),
      },
    },
  })
)

const LayoutMain: React.FunctionComponent = (props: { children: any }) => {
  const classes = useStyles({})
  return <div className={classes.root}>{props.children}</div>
}

export default LayoutMain
