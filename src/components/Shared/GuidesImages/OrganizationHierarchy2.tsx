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
import globalGraphicsStyles from './GlobalGraphicsStyles'

const useStyles = makeStyles((theme: Theme) => {
  return createStyles(globalGraphicsStyles(theme))
})

const OrgHierarchyImage2 = props => {
  const classes = useStyles(props)
  return (
    <Paper className={classes.root}>
      <Chip
        color="primary"
        classes={{
          label: classes.chipLabel,
        }}
        className={classes.chip}
        icon={<Business />}
        label="Seller Organization"
      />
      <Grid container justify="center" spacing={2}>
        <Grid item sm className={classes.containerChip}>
          <Paper className={classes.adminUserGroup}>
            <Chip
              color="primary"
              classes={{
                label: classes.chipLabel,
              }}
              className={classes.chip}
              icon={<Group />}
              label="Admin User Group"
            />
            <Grid container justify="center" spacing={2}>
              <Grid item sm className={classes.containerChip}>
                <Chip
                  color="primary"
                  classes={{
                    label: classes.chipLabel,
                  }}
                  className={classes.chipUser}
                  icon={<Person />}
                  label="User"
                />
              </Grid>
              <Grid item sm className={classes.containerChip}>
                <Chip
                  color="primary"
                  classes={{
                    label: classes.chipLabel,
                  }}
                  className={classes.chipUser}
                  icon={<Person />}
                  label="User"
                />
              </Grid>
              <Grid item sm className={classes.containerChip}>
                <Chip
                  color="primary"
                  classes={{
                    label: classes.chipLabel,
                  }}
                  className={classes.chipUser}
                  icon={<Person />}
                  label="User"
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item sm className={classes.containerChip}>
          <Paper className={classes.adminUserGroup}>
            <Chip
              color="primary"
              classes={{
                label: classes.chipLabel,
              }}
              className={classes.chip}
              icon={<Group />}
              label="Buyer Organization"
            />
            <Grid container justify="center" spacing={2}>
              <Grid item sm className={classes.containerChip}>
                <Chip
                  color="primary"
                  classes={{
                    label: classes.chipLabel,
                  }}
                  className={classes.chipUser}
                  icon={<Person />}
                  label="User"
                />
              </Grid>
              <Grid item sm className={classes.containerChip}>
                <Chip
                  color="primary"
                  classes={{
                    label: classes.chipLabel,
                  }}
                  className={classes.chipUser}
                  icon={<Person />}
                  label="User"
                />
              </Grid>
              <Grid item sm className={classes.containerChip}>
                <Chip
                  color="primary"
                  classes={{
                    label: classes.chipLabel,
                  }}
                  className={classes.chipUser}
                  icon={<Person />}
                  label="User"
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item sm className={classes.containerChip}>
          <Paper className={classes.adminUserGroup}>
            <Chip
              color="primary"
              classes={{
                label: classes.chipLabel,
              }}
              className={classes.chip}
              icon={<Group />}
              label="Supplier Organization"
            />
            <Grid container justify="center" spacing={2}>
              <Grid item sm className={classes.containerChip}>
                <Chip
                  color="primary"
                  classes={{
                    label: classes.chipLabel,
                  }}
                  className={classes.chipUser}
                  icon={<Person />}
                  label="User"
                />
              </Grid>
              <Grid item sm className={classes.containerChip}>
                <Chip
                  color="primary"
                  classes={{
                    label: classes.chipLabel,
                  }}
                  className={classes.chipUser}
                  icon={<Person />}
                  label="User"
                />
              </Grid>
              <Grid item sm className={classes.containerChip}>
                <Chip
                  color="primary"
                  classes={{
                    label: classes.chipLabel,
                  }}
                  className={classes.chipUser}
                  icon={<Person />}
                  label="User"
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default OrgHierarchyImage2
