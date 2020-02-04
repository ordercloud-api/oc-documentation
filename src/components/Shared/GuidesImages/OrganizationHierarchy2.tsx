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
import { sherpablue } from '../../../theme/ocPalette.constants'

// if you override any styles from GlobalGrpahicStyles, you need to pull in the entire declaration

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
    chipUserBadge: {
      height: theme.spacing(2),
      width: theme.spacing(2),
      padding: theme.spacing(2),
      borderRadius: theme.spacing(7),
      border: `1px solid ${sherpablue[50]}`,
      '& svg': {
        margin: 0,
      },
      '& span': {
        display: 'none' as 'none',
      },
    },
    chipLabel: {
      fontFamily: theme.typography.h1.fontFamily,
      fontSize: theme.typography.body2.fontSize,
      textTransform: 'uppercase' as 'uppercase',
      letterSpacing: 2,
      paddingTop: 2,
    },
    containerChip: {
      position: 'relative' as 'relative',
      textAlign: 'center' as 'center',
      justifyContent: 'space-between',
      flex: 1,
    },
    containerChipTransparent: {
      margin: theme.spacing(0, 4),
      textAlign: 'center' as 'center',
      display: 'flex' as 'flex',
      justifyContent: 'space-between',
      backgroundColor: 'transparent',
    },
    secondaryContainer: {
      position: 'relative' as 'relative',
      padding: theme.spacing(6, 3),
      backgroundColor: sherpablue[200],
      display: 'flex' as 'flex',
      justifyContent: 'space-between' as 'space-between',
      flex: 1,
      height: '100%',
    },
    tertiaryContainer: {
      position: 'relative' as 'relative',
      padding: theme.spacing(3),
      backgroundColor: sherpablue[300],
      display: 'flex' as 'flex',
      justifyContent: 'space-between' as 'space-between',
    },
  })
)

const OrgHierarchyImage2 = props => {
  const classes = useStyles(props)
  return (
    // outermost parent
    <Paper className={classes.Paper}>
      <Chip
        color="primary"
        classes={{
          label: classes.chipLabel,
        }}
        className={classes.chip}
        icon={<Business />}
        label="Seller Organization"
      />
      {/* container of three cards */}
      <Grid container justify="center" spacing={4}>
        {/* first card container */}
        <Grid item lg className={classes.containerChip}>
          {/* first card surface */}
          <Paper className={classes.secondaryContainer}>
            {/* absolutely positioned chip */}
            <Chip
              color="primary"
              size="small"
              classes={{
                label: classes.chipLabel,
              }}
              className={`${classes.chip} ${classes.chipCentered}`}
              icon={<Group />}
              label="Admin User Group"
            />
            {/* first card chip grid */}
            <Grid container justify="center" spacing={2}>
              <Grid item lg className={classes.containerChip}>
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
              <Grid item lg className={classes.containerChip}>
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
              <Grid item lg className={classes.containerChip}>
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
        <Grid item lg className={classes.containerChip}>
          <Paper className={classes.secondaryContainer}>
            <Chip
              color="primary"
              size="small"
              classes={{
                label: classes.chipLabel,
              }}
              className={`${classes.chip} ${classes.chipCentered}`}
              icon={<Group />}
              label="Buyer Organization"
            />
            <Grid container justify="center" direction="column" spacing={4}>
              <Grid item lg className={classes.containerChip}>
                <Paper className={classes.tertiaryContainer}>
                  <Chip
                    color="primary"
                    size="small"
                    classes={{
                      label: classes.chipLabel,
                    }}
                    className={`${classes.chip} ${classes.chipCentered}`}
                    icon={<Group />}
                    label="User Group"
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
                  <Chip
                    color="primary"
                    size="small"
                    className={classes.chipUserBadge}
                    icon={<Person />}
                  />
                </Paper>
              </Grid>
              <Grid item lg className={classes.containerChipTransparent}>
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
              <Grid item lg className={classes.containerChipTransparent}>
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
          </Paper>
        </Grid>
        <Grid item lg className={classes.containerChip}>
          <Paper className={classes.secondaryContainer}>
            <Chip
              color="primary"
              size="small"
              classes={{
                label: classes.chipLabel,
              }}
              className={`${classes.chip} ${classes.chipCentered}`}
              icon={<Group />}
              label="Supplier Organization"
            />
            <Grid container justify="center" direction="column" spacing={4}>
              <Grid item lg className={classes.containerChipTransparent}>
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
              <Grid item lg className={classes.containerChipTransparent}>
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
              <Grid item lg className={classes.containerChip}>
                <Paper className={classes.tertiaryContainer}>
                  <Chip
                    color="primary"
                    size="small"
                    classes={{
                      label: classes.chipLabel,
                    }}
                    className={`${classes.chip} ${classes.chipCentered}`}
                    icon={<Group />}
                    label="User Group"
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
                  <Chip
                    color="primary"
                    size="small"
                    className={classes.chipUserBadge}
                    icon={<Person />}
                  />
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default OrgHierarchyImage2
