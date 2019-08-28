import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minHeight: '100vh',
      overflow: 'hidden',
      flex: '1',
    },
  })
)

const LayoutMain: React.FunctionComponent = props => {
  const classes = useStyles({})
  return (
    <div className={classes.root}>
      <div>{props.children}</div>
    </div>
  )
}

export default LayoutMain
