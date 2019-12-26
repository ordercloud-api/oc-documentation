import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex: '1',
      minHeight: '100vh',
      padding: theme.spacing(0, 4, 4, 4),
    },
  })
)

const LayoutMain: React.FunctionComponent = (props: { children: any }) => {
  const classes = useStyles({})
  return <div className={classes.root}>{props.children}</div>
}

export default LayoutMain
