import {
  Chip,
  createStyles,
  Fade,
  Grid,
  makeStyles,
  Paper,
  Theme,
} from '@material-ui/core'
import { Business, Group, Person } from '@material-ui/icons'
import React from 'react'
import { mediumgrey } from '../../../theme/ocPalette.constants'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(9, 0),
      padding: theme.spacing(10, 8, 8, 8),
      borderRadius: theme.spacing(0.35),
      flexGrow: 1,
      position: 'relative',
      boxShadow: theme.shadows[3],
    },
    userGroup: {
      position: 'relative',
      padding: theme.spacing(12, 8),
      backgroundColor: mediumgrey[50],
      borderRadius: theme.spacing(0.35),
      boxShadow: theme.shadows[2],
    },
    chipContainer: {
      position: 'relative',
      textAlign: 'center',
    },
    chipBase: {
      padding: theme.spacing(2.5, 1.5),
      borderRadius: 0,
      boxShadow: theme.shadows[1],
      backgroundColor: mediumgrey[100],
      '& svg': {
        fontSize: '1.5em',
      },
    },
    chipOverlaying: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: 'max-content',
      boxShadow: 'unset',
      backgroundColor: 'transparent',
    },
    chipLabel: {
      fontFamily: theme.typography.h1.fontFamily,
      fontSize: '.75rem',
      color: theme.palette.text.secondary,
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
  })
)

const OrgHierarchyImage1: React.FunctionComponent = () => {
  const classes = useStyles({})
  return (
    <Fade in={true} timeout={750}>
      <Paper className={classes.root}>
        <Chip
          classes={{
            label: classes.chipLabel,
          }}
          className={`${classes.chipBase} ${classes.chipOverlaying}`}
          icon={<Business />}
          label="Company"
        />
        <Paper className={classes.userGroup}>
          <Chip
            classes={{
              label: classes.chipLabel,
            }}
            className={`${classes.chipBase} ${classes.chipOverlaying}`}
            icon={<Group />}
            label="User Group"
          />
          <Grid container justify="center" spacing={2}>
            <Grid item sm className={classes.chipContainer}>
              <Chip
                classes={{
                  label: classes.chipLabel,
                }}
                className={classes.chipBase}
                icon={<Person />}
                label="User"
              />
            </Grid>
            <Grid item sm className={classes.chipContainer}>
              <Chip
                classes={{
                  label: classes.chipLabel,
                }}
                className={classes.chipBase}
                icon={<Person />}
                label="User"
              />
            </Grid>
            <Grid item sm className={classes.chipContainer}>
              <Chip
                classes={{
                  label: classes.chipLabel,
                }}
                className={classes.chipBase}
                icon={<Person />}
                label="User"
              />
            </Grid>
          </Grid>
        </Paper>
      </Paper>
    </Fade>
  )
}

export default OrgHierarchyImage1
