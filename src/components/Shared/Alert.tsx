import React, { useState, useEffect } from 'react'

import {
  IconButton,
  Snackbar,
  SnackbarContent,
  withStyles,
  makeStyles,
  createStyles,
  Theme,
} from '@material-ui/core'
import classNames from 'classnames'

import CloseIcon from '@material-ui/icons/Close'
import ErrorIcon from '@material-ui/icons/Error'

import amber from '@material-ui/core/colors/amber'
import green from '@material-ui/core/colors/green'

let openSnackbarFn

const styles = theme => ({
  success: {
    backgroundColor: green[700],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warn: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
  margin: {
    margin: theme.spacing(1),
  },
})

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    success: {
      backgroundColor: green[700],
    },
    error: {
      backgroundColor: theme.palette.error.dark,
    },
    info: {
      backgroundColor: theme.palette.primary.dark,
    },
    warn: {
      backgroundColor: amber[700],
    },
    icon: {
      fontSize: 20,
    },
    iconVariant: {
      opacity: 0.9,
      marginRight: theme.spacing(1),
    },
    message: {
      display: 'flex',
      alignItems: 'center',
    },
    margin: {
      margin: theme.spacing(1),
    },
  })
)

interface AlertContainerProps {
  classes: any
}

function AlertContainer(props: AlertContainerProps) {
  const classes = useStyles(props)
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [type, setType] = useState('')

  useEffect(() => {
    openSnackbarFn = function(type: string, message: string) {
      setIsOpen(true)
      setType(type)
      setMessage(message)
    }
  }, [])

  const handleSnackbarClose = () => {
    setIsOpen(false)
    setMessage('')
    setType('')
  }

  return (
    <Snackbar
      onClose={handleSnackbarClose}
      open={isOpen}
      autoHideDuration={5000}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <SnackbarContent
        className={classNames(classes[type], classes.margin)}
        message={
          <span id="client-snackbar" className={classes.message}>
            <ErrorIcon
              className={classNames(classes.icon, classes.iconVariant)}
            />
            {message}
          </span>
        }
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={handleSnackbarClose}
          >
            <CloseIcon className={classes.icon} />
          </IconButton>,
        ]}
      />
    </Snackbar>
  )
}

export const Alert = {
  success: (message: string) => {
    openSnackbarFn('success', message)
  },
  info: (message: string) => {
    openSnackbarFn('info', message)
  },
  warn: (message: string) => {
    openSnackbarFn('warn', message)
  },
  error: (message: string) => {
    openSnackbarFn('error', message)
  },
}

export default withStyles(styles)(AlertContainer)
