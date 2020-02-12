import {
  Chip,
  createStyles,
  Grid,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from '@material-ui/core'
import { Business, People, Person } from '@material-ui/icons'
import React from 'react'
import {
  blackpearl,
  sherpablue,
  seafoam,
  sunset,
} from '../../../theme/ocPalette.constants'
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
    chipSpacing: {
      margin: theme.spacing(2, 0),
    },
    chipDark: {
      backgroundColor: sunset[500],
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
    containerChippers: { flex: 'none' },
    gridContainerChip: {
      display: 'flex',
      flexFlow: 'column nowrap',
      alignItems: 'center',
      justifyContent: 'center',
    },
    chipUserBadge: {
      height: 30,
      width: 30,
      position: 'relative',
      margin: theme.spacing(1, 1.5),
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 50,
      zIndex: 1,
      '&::after': {
        content: '""',
        position: 'absolute',
        zIndex: -1,
        width: 38,
        height: 38,
        borderRadius: 50,
        display: 'block',
        margin: -7.5,
        background: `linear-gradient( to top, ${sherpablue[400]} 0%, ${sherpablue[400]} 49%, ${seafoam[400]} 49%, ${seafoam[400]} 100%)`,
      },
      '& > span': {
        display: 'none',
      },
      '& > svg': {
        margin: 0,
        padding: theme.spacing(0.5),
        backgroundColor: sherpablue[100],
        borderRadius: 50,
        height: 30,
        width: 30,
      },
    },
    chipUserBadgeA: {
      '&::after': {
        background: `linear-gradient( to top, ${sherpablue[400]} 0%, ${sherpablue[400]} 49%, ${sherpablue[400]} 49%, ${sherpablue[400]} 100%)`,
      },
    },
    chipUserBadgeB: {
      '&::after': {
        background: `linear-gradient( to top, ${seafoam[400]} 0%, ${seafoam[400]} 49%, ${seafoam[400]} 49%, ${seafoam[400]} 100%)`,
      },
    },
    chipUserBadgeC: {
      '&::after': {
        background: `linear-gradient( to top, ${sunset[500]} 0%, ${sunset[500]} 49%, ${sunset[500]} 49%, ${sunset[500]} 100%)`,
      },
    },
    figureCaption: {
      position: 'absolute',
      bottom: theme.spacing(-3.5),
      right: 0,
      fontStyle: 'italic',
    },
  })
)

const OrgHierarchyImage5: React.FunctionComponent = () => {
  const classes = useStyles({})
  return (
    <React.Fragment>
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
        <Grid container justify="space-evenly" spacing={4}>
          <Grid item lg className={classes.gridContainerChip}>
            <Chip
              color="primary"
              classes={{
                label: classes.chipLabel,
              }}
              className={`${classes.chipUser} ${classes.chipSpacing}`}
              icon={<People />}
              label="User Group A"
            />

            <Chip
              color="secondary"
              classes={{
                label: classes.chipLabel,
              }}
              className={`${classes.chipUser} ${classes.chipSpacing}`}
              icon={<People />}
              label="User Group B"
            />

            <Chip
              classes={{
                label: classes.chipLabel,
              }}
              className={`${classes.chipUser} ${classes.chipSpacing} ${classes.chipDark}`}
              icon={<People />}
              label="User Group C"
            />
          </Grid>
          <Grid item lg className={classes.gridContainerChip}>
            <Grid
              container
              justify="center"
              className={classes.gridContainerChip}
              spacing={2}
            >
              <Grid item lg className={classes.containerChippers}>
                <Chip
                  color="primary"
                  size="small"
                  className={classes.chipUserBadge}
                  icon={<Person />}
                />
                <Chip
                  color="primary"
                  size="small"
                  className={`${classes.chipUserBadge} ${classes.chipUserBadgeC}`}
                  icon={<Person />}
                />
                <Chip
                  color="primary"
                  size="small"
                  className={`${classes.chipUserBadge} ${classes.chipUserBadgeB}`}
                  icon={<Person />}
                />
              </Grid>
              <Grid item lg className={classes.containerChippers}>
                <Chip
                  color="primary"
                  size="small"
                  className={`${classes.chipUserBadge} ${classes.chipUserBadgeA}`}
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
                  className={`${classes.chipUserBadge} ${classes.chipUserBadgeC}`}
                  icon={<Person />}
                />
              </Grid>
              <Grid item lg className={classes.containerChippers}>
                <Chip
                  color="primary"
                  size="small"
                  className={`${classes.chipUserBadge} ${classes.chipUserBadgeB}`}
                  icon={<Person />}
                />
                <Chip
                  color="primary"
                  size="small"
                  className={`${classes.chipUserBadge} ${classes.chipUserBadgeA}`}
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
        <Typography
          className={classes.figureCaption}
          color="textSecondary"
          variant="caption"
        >
          users can be assigned to multiple user groups
        </Typography>
      </Paper>
    </React.Fragment>
  )
}

export default OrgHierarchyImage5
