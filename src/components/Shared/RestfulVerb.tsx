import React from 'react'
import { Theme, withStyles } from '@material-ui/core/styles'

import {
  deeppurple,
  lilacpurple,
  raghebred,
  spanishgreen,
} from '../../theme/ocPalette.constants'
import { Typography, createStyles } from '@material-ui/core'

interface DTProps {
  verb: string
  classes: any
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      fontSize: theme.typography.h5.fontSize,
      marginRight: theme.spacing(1),
      width: 100,
      textAlign: 'center',
    },
    get: {
      color: spanishgreen[500],
      borderColor: spanishgreen[500],
    },
    post: {
      color: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,
    },
    patch: {
      color: lilacpurple[900],
      borderColor: lilacpurple[900],
    },
    put: {
      color: deeppurple[500],
      borderColor: deeppurple[500],
    },
    delete: {
      color: raghebred[300],
      borderColor: raghebred[300],
    },
  })

class RestfulVerb extends React.Component<DTProps, {}> {
  public render() {
    const { classes, verb } = this.props
    return (
      <Typography
        className={`${classes[verb.toLocaleLowerCase()]} ${classes.root}`}
        variant="button"
      >
        {verb.toLocaleUpperCase()}
      </Typography>
    )
  }
}

export default withStyles(styles)(RestfulVerb)
