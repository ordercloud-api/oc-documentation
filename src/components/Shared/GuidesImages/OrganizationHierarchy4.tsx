import {
  Chip,
  createStyles,
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
    surfaceLevel1: {
      margin: theme.spacing(9, 0),
      padding: theme.spacing(8, 6, 6, 6),
      borderRadius: theme.spacing(0.35),
      flexGrow: 1,
      position: 'relative',
      boxShadow: theme.shadows[3],
    },
    surfaceLevel2: {
      position: 'relative',
      padding: theme.spacing(4, 2, 2, 2),
      backgroundColor: mediumgrey[50],
      borderRadius: theme.spacing(0.35),
      boxShadow: theme.shadows[2],
      display: 'flex',
      flexFlow: 'column nowrap',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '24px',
      minHeight: 280,
    },
    surfaceLevel3: {
      width: '100%',
      position: 'relative',
      padding: theme.spacing(5, 2, 2, 2),
      backgroundColor: mediumgrey[100],
      display: 'flex',
      justifyContent: 'center',
      gap: '12px',
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
        color: theme.palette.text.secondary,
      },
    },
    chipOverlaying: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: 'max-content',
      boxShadow: 'unset',
      backgroundColor: 'transparent',
      padding: theme.spacing(0.5),
    },
    chipLabel: {
      fontFamily: theme.typography.h1.fontFamily,
      color: theme.palette.text.secondary,
      fontSize: '.75rem',
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    chipUserFull: {
      border: `1px solid ${mediumgrey[50]}`,
    },
    chipUserBadge: {
      height: theme.spacing(2),
      width: theme.spacing(2),
      padding: theme.spacing(2),
      boxShadow: theme.shadows[1],
      border: `1px solid ${mediumgrey[50]}`,
      borderRadius: 0,
      transition: 'box-shadow 1s ease',
      '& svg': {
        margin: 0,
      },
      '& span': {
        display: 'none' as 'none',
      },
    },
    chipContainerTransparent: {
      margin: theme.spacing(0, 4),
      textAlign: 'center' as 'center',
      display: 'flex' as 'flex',
      justifyContent: 'space-between',
      backgroundColor: 'transparent',
    },
  })
)

const OrgHierarchyImage4: React.FunctionComponent = () => {
  const classes = useStyles({})
  return (
    <Paper className={classes.surfaceLevel1}>
      <Chip
        classes={{
          label: classes.chipLabel,
        }}
        className={`${classes.chipBase} ${classes.chipOverlaying}`}
        icon={<Business />}
        label="Supplier"
      />
      <Grid container justify="center" spacing={4}>
        <Grid item lg className={classes.chipContainer}>
          <Paper className={classes.surfaceLevel2}>
            <Chip
              classes={{
                label: classes.chipLabel,
              }}
              className={`${classes.chipBase} ${classes.chipOverlaying}`}
              icon={<Group />}
              label="Supplier User Group"
            />
            <Grid container justify="center" spacing={2}>
              <Grid item lg className={classes.chipContainer}>
                <Chip
                  classes={{
                    label: classes.chipLabel,
                  }}
                  className={`${classes.chipBase} ${classes.chipUserFull}`}
                  icon={<Person />}
                  label="Supplier User"
                />
              </Grid>
              <Grid item lg className={classes.chipContainer}>
                <Chip
                  classes={{
                    label: classes.chipLabel,
                  }}
                  className={`${classes.chipBase} ${classes.chipUserFull}`}
                  icon={<Person />}
                  label="Supplier User"
                />
              </Grid>
              <Grid item lg className={classes.chipContainer}>
                <Chip
                  classes={{
                    label: classes.chipLabel,
                  }}
                  className={`${classes.chipBase} ${classes.chipUserFull}`}
                  icon={<Person />}
                  label="Supplier User"
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item lg className={classes.chipContainer}>
          <Paper className={classes.surfaceLevel2}>
            <Chip
              classes={{
                label: classes.chipLabel,
              }}
              className={`${classes.chipBase} ${classes.chipOverlaying}`}
              icon={<Group />}
              label="Supplier User Group"
            />
            <Grid container justify="center" spacing={2}>
              <Grid item lg className={classes.chipContainer}>
                <Chip
                  classes={{
                    label: classes.chipLabel,
                  }}
                  className={`${classes.chipBase} ${classes.chipUserFull}`}
                  icon={<Person />}
                  label="Supplier User"
                />
              </Grid>
              <Grid item lg className={classes.chipContainer}>
                <Chip
                  classes={{
                    label: classes.chipLabel,
                  }}
                  className={`${classes.chipBase} ${classes.chipUserFull}`}
                  icon={<Person />}
                  label="Supplier User"
                />
              </Grid>
              <Grid item lg className={classes.chipContainer}>
                <Chip
                  classes={{
                    label: classes.chipLabel,
                  }}
                  className={`${classes.chipBase} ${classes.chipUserFull}`}
                  icon={<Person />}
                  label="Supplier User"
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default OrgHierarchyImage4
