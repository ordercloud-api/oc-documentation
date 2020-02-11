import {
  Chip,
  createStyles,
  Grid,
  makeStyles,
  Paper,
  Theme,
} from '@material-ui/core'
import { Business, Group, Person, People } from '@material-ui/icons'
import React from 'react'
import { sherpablue, blackpearl } from '../../../theme/ocPalette.constants'
import globalGraphicsStyles from './GlobalGraphicsStyles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    ...globalGraphicsStyles(theme),
    chip: {
      zIndex: 2,
      padding: theme.spacing(1.5, 1),
      border: `1px solid ${sherpablue[50]}`,
      borderRadius: theme.spacing(7),
      position: 'absolute' as 'absolute',
      top: theme.spacing(-2),
      width: 'max-content',
    },
    chipDark: {
      backgroundColor: blackpearl[500],
      color: '#fff',
      '& > svg': {
        color: '#fff',
      },
    },
    secondaryContainer: {
      position: 'relative' as 'relative',
      padding: theme.spacing(6, 3),
      backgroundColor: 'transparent',
      display: 'flex' as 'flex',
      justifyContent: 'space-between' as 'space-between',
    },
    containerChipper: { flex: 'none' },
    gridContainerChip: {
      flexFlow: 'column nowrap',
    },
  })
)

const OrgHierarchyImage5: React.FunctionComponent = () => {
  const classes = useStyles({})
  return (
    <Paper className={classes.Paper}>
      <Chip
        color="primary"
        classes={{
          label: classes.chipLabel,
        }}
        className={classes.chip}
        icon={<Business />}
        label="Company"
      />
      <Grid container justify="center" spacing={4}>
        <Grid item lg className={classes.containerChip}>
          <Grid container justify="center" spacing={2}>
            <Grid item lg className={classes.containerChip}>
              <Chip
                color="primary"
                classes={{
                  label: classes.chipLabel,
                }}
                className={classes.chipUser}
                icon={<People />}
                label="User Group A"
              />
            </Grid>
            <Grid item lg className={classes.containerChip}>
              <Chip
                color="secondary"
                classes={{
                  label: classes.chipLabel,
                }}
                className={classes.chipUser}
                icon={<People />}
                label="User Group B"
              />
            </Grid>
            <Grid item lg className={classes.containerChip}>
              <Chip
                classes={{
                  label: classes.chipLabel,
                }}
                className={`${classes.chipUser} + ${classes.chipDark}`}
                icon={<People />}
                label="User Group C"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg className={classes.containerChip}>
          <Grid
            container
            justify="center"
            className={classes.gridContainerChip}
            spacing={2}
          >
            <Grid item lg className={classes.containerChipper}>
              <Chip
                color="primary"
                size="small"
                className={classes.chipUserBadge}
                icon={<Person />}
              />
              <Chip
                color="primary"
                size="small"
                className={classes.chipUserBadge}
                icon={<Person />}
              />
              <Chip
                color="primary"
                size="small"
                className={classes.chipUserBadge}
                icon={<Person />}
              />
            </Grid>
            <Grid item lg className={classes.containerChipper}>
              <Chip
                color="primary"
                size="small"
                className={classes.chipUserBadge}
                icon={<Person />}
              />
              <Chip
                color="primary"
                size="small"
                className={classes.chipUserBadge}
                icon={<Person />}
              />
              <Chip
                color="primary"
                size="small"
                className={classes.chipUserBadge}
                icon={<Person />}
              />
            </Grid>
            <Grid item lg className={classes.containerChipper}>
              <Chip
                color="primary"
                size="small"
                className={classes.chipUserBadge}
                icon={<Person />}
              />
              <Chip
                color="primary"
                size="small"
                className={classes.chipUserBadge}
                icon={<Person />}
              />
              <Chip
                color="primary"
                size="small"
                className={classes.chipUserBadge}
                icon={<Person />}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default OrgHierarchyImage5
