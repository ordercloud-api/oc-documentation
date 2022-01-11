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
import { sherpablue } from '../../../theme/ocPalette.constants'
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
    secondaryContainer: {
      position: 'relative' as 'relative',
      padding: theme.spacing(6, 3),
      backgroundColor: sherpablue[200],
      display: 'flex' as 'flex',
      justifyContent: 'space-between' as 'space-between',
    },
  })
)

const OrgHierarchyImage3: React.FunctionComponent = () => {
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
        label="Buyer"
      />
      <Grid container justifyContent="center" spacing={4}>
        <Grid item lg className={classes.containerChip}>
          <Paper className={classes.secondaryContainer}>
            <Chip
              color="primary"
              classes={{
                label: classes.chipLabel,
              }}
              className={classes.chip}
              icon={<Group />}
              label="Buyer User Group"
            />
            <Grid container justifyContent="center" spacing={2}>
              <Grid item lg className={classes.containerChip}>
                <Chip
                  color="primary"
                  classes={{
                    label: classes.chipLabel,
                  }}
                  className={classes.chipUser}
                  icon={<Person />}
                  label="Buyer User"
                />
              </Grid>
              <Grid item lg className={classes.containerChip}>
                <Chip
                  color="primary"
                  classes={{
                    label: classes.chipLabel,
                  }}
                  className={classes.chipUser}
                  icon={<Person />}
                  label="Buyer User"
                />
              </Grid>
              <Grid item lg className={classes.containerChip}>
                <Chip
                  color="primary"
                  classes={{
                    label: classes.chipLabel,
                  }}
                  className={classes.chipUser}
                  icon={<Person />}
                  label="Buyer User"
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item lg className={classes.containerChip}>
          <Paper className={classes.secondaryContainer}>
            <Chip
              color="primary"
              classes={{
                label: classes.chipLabel,
              }}
              className={classes.chip}
              icon={<Group />}
              label="Buyer User Group"
            />
            <Grid container justifyContent="center" spacing={2}>
              <Grid item lg className={classes.containerChip}>
                <Chip
                  color="primary"
                  classes={{
                    label: classes.chipLabel,
                  }}
                  className={classes.chipUser}
                  icon={<Person />}
                  label="Buyer User"
                />
              </Grid>
              <Grid item lg className={classes.containerChip}>
                <Chip
                  color="primary"
                  classes={{
                    label: classes.chipLabel,
                  }}
                  className={classes.chipUser}
                  icon={<Person />}
                  label="Buyer User"
                />
              </Grid>
              <Grid item lg className={classes.containerChip}>
                <Chip
                  color="primary"
                  classes={{
                    label: classes.chipLabel,
                  }}
                  className={classes.chipUser}
                  icon={<Person />}
                  label="Buyer User"
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default OrgHierarchyImage3
