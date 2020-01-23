import React from 'react'
import {
  makeStyles,
  Theme,
  createStyles,
  Grid,
  Paper,
  Chip,
} from '@material-ui/core'
import BusinessIcon from '@material-ui/icons/Business'
import UserIcon from '@material-ui/icons/VerifiedUser'
import { blackpearl, sherpablue } from '../../../theme/ocPalette.constants'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(8, 0, 16, 0),
      flexGrow: 1,
      padding: theme.spacing(6, 3),
      backgroundColor: sherpablue[50],
      position: 'relative',
    },
    chip: {
      padding: theme.spacing(2, 1),
      borderRadius: theme.spacing(7),
      position: 'absolute',
      top: theme.spacing(-2),
      width: 'max-content',
    },
    chipUser: {
      padding: theme.spacing(2, 1),
      borderRadius: theme.spacing(7),
    },
    chipLabel: {
      fontFamily: theme.typography.h1.fontFamily,
      fontSize: theme.typography.h5.fontSize,
      textTransform: 'uppercase',
      letterSpacing: 2,
      paddingTop: 2,
    },
    userGroup: {
      position: 'relative',
      padding: theme.spacing(6, 3),
      backgroundColor: sherpablue[100],
    },
    ContainerChip: {
      position: 'relative',
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      backgroundColor: 'transparent',
    },
  })
)

const OrgHierarchyImage1: React.FunctionComponent = () => {
  const classes = useStyles({})
  return (
    <Paper className={classes.root}>
      <Chip
        color="primary"
        classes={{
          label: classes.chipLabel,
        }}
        className={classes.chip}
        icon={<BusinessIcon />}
        label="Company"
      />
      <Paper className={classes.userGroup}>
        <Chip
          color="primary"
          classes={{
            label: classes.chipLabel,
          }}
          className={classes.chip}
          icon={<BusinessIcon />}
          label="User Group"
        />
        <Grid container spacing={3}>
          <Grid item sm className={classes.ContainerChip}>
            <Chip
              color="primary"
              classes={{
                label: classes.chipLabel,
              }}
              className={classes.chipUser}
              icon={<UserIcon />}
              label="User"
            />
          </Grid>
          <Grid item sm className={classes.ContainerChip}>
            <Chip
              color="primary"
              classes={{
                label: classes.chipLabel,
              }}
              className={classes.chipUser}
              icon={<UserIcon />}
              label="User"
            />
          </Grid>
          <Grid item sm className={classes.ContainerChip}>
            <Chip
              color="primary"
              classes={{
                label: classes.chipLabel,
              }}
              className={classes.chipUser}
              icon={<UserIcon />}
              label="User"
            />
          </Grid>
        </Grid>
      </Paper>
    </Paper>
  )
}

export default OrgHierarchyImage1
