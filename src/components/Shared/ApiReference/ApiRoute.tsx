import React from 'react'
import { makeStyles, Theme, createStyles, Chip } from '@material-ui/core'
import { mediumgrey } from '../../../theme/ocPalette.constants'

interface ApiRouteProps {
  operation: any
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexFlow: 'row nowrap',
      alignItems: 'center',
      borderRadius: theme.shape.borderRadius,
      overflow: 'hidden',
      border: `1px solid ${mediumgrey[100]}`,
      height: theme.spacing(8),
      marginBottom: theme.spacing(3),
    },
    verb: {
      flex: '0 0 10%',
      textAlign: 'center',
      textTransform: 'uppercase',
    },
    path: {
      margin: 0,
      flex: '1',
      fontSize: theme.typography.h4.fontSize,
    },
  })
)

const ApiRoute: React.FunctionComponent<ApiRouteProps> = props => {
  const { operation } = props
  const classes = useStyles({})
  console.log(operation)
  return (
    <div className={classes.root}>
      <div className={classes.verb}>
        <Chip variant="outlined" label={operation.verb}></Chip>
      </div>
      <pre className={classes.path}>{operation.path}</pre>
    </div>
  )
}

export default ApiRoute
