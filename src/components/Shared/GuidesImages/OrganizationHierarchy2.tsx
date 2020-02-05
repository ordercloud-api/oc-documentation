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
      margin: theme.spacing(0.5),
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
      paddingRight: 4,
    },
    containerChip: {
      position: 'relative' as 'relative',
      textAlign: 'center' as 'center',
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
      padding: theme.spacing(9.25, 3, 6, 3), // need to cheat the top spacing by 26px for the floating chips
      backgroundColor: sherpablue[200],
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '100%',
      '& > div:not($chipCentered)': {
        margin: theme.spacing(1),
      },
      [theme.breakpoints.down('xs')]: {
        flexFlow: 'column nowrap', // mobile? snap to column.
      },
      [theme.breakpoints.up('md')]: {
        flexFlow: 'column nowrap', // small laptop? snap to column.
      },
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
      <Grid container justify="center" spacing={3}>
        {/* first card container */}
        <Grid item xs={12} lg={4} className={classes.containerChip}>
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
            {/* first card's chip grid */}
            <Chip
              color="primary"
              classes={{
                label: classes.chipLabel,
              }}
              className={classes.chipUser}
              icon={<Person />}
              label="User"
            />
            <Chip
              color="primary"
              classes={{
                label: classes.chipLabel,
              }}
              className={classes.chipUser}
              icon={<Person />}
              label="User"
            />
            <Chip
              color="primary"
              classes={{
                label: classes.chipLabel,
              }}
              className={classes.chipUser}
              icon={<Person />}
              label="User"
            />
          </Paper>
        </Grid>
        <Grid item xs={12} lg={4} className={classes.containerChip}>
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
            <div>
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
            </div>
            <div>
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
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} lg={4} className={classes.containerChip}>
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
            <div>
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
            </div>
            <div>
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
            </div>
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default OrgHierarchyImage2
