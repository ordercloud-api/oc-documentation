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
import { mediumgrey, sitecore } from '../../../theme/ocPalette.constants'

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
    chipContainer: {
      position: 'relative',
      textAlign: 'center',
    },
    chipBase: {
      padding: theme.spacing(2.5, 1.5),
      borderRadius: 0,
      boxShadow: theme.shadows[1],
      backgroundColor: mediumgrey[50],
      '& svg': {
        fontSize: '1.5em',
        color: theme.palette.text.secondary,
      },
    },
    chipUserFull: {
      border: `1px solid ${mediumgrey[50]}`,
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
    },
    chipGroupA: {
      backgroundColor: sitecore['teal'],
      border: 'none',
      '& .MuiChip-label': {
        color: '#fff',
      },
      '& > svg': {
        color: '#fff',
      },
    },
    chipGroupB: {
      backgroundColor: sitecore['red'],
      border: 'none',
      '& .MuiChip-label': {
        color: '#fff',
      },
      '& > svg': {
        color: '#fff',
      },
    },
    chipGroupC: {
      backgroundColor: sitecore['violet'],
      border: 'none',
      '& .MuiChip-label': {
        color: '#fff',
      },
      '& > svg': {
        color: 'white',
      },
    },
    containerChippers: { flex: 'none' },
    gridContainerChip: {
      display: 'flex',
      flexFlow: 'column nowrap',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '16px',
    },
    chipUserBadge: {
      height: 33,
      width: 33,
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
        top: 3,
        left: 3,
        zIndex: -1,
        width: 43,
        height: 43,
        borderRadius: 0,
        display: 'block',
        margin: -8,
        background: `linear-gradient( to top, ${sitecore['red']} 0%, ${sitecore['red']} 49%, ${sitecore['teal']} 49%, ${sitecore['teal']} 100%)`,
      },
      '& > span': {
        display: 'none',
      },
      '& > svg': {
        margin: 0,
        padding: theme.spacing(0.5),
        backgroundColor: mediumgrey[50],
        color: theme.palette.text.secondary,
        boxShadow: theme.shadows[1],
        borderRadius: 0,
        height: 36,
        width: 36,
      },
    },
    chipUserBadgeA: {
      '&::after': {
        background: `linear-gradient( to top, ${sitecore['red']} 0%, ${sitecore['red']} 49%, ${sitecore['red']} 49%, ${sitecore['red']} 100%)`,
      },
    },
    chipUserBadgeB: {
      '&::after': {
        background: `linear-gradient( to top, ${sitecore['teal']} 0%, ${sitecore['teal']} 49%, ${sitecore['teal']} 49%, ${sitecore['teal']} 100%)`,
      },
    },
    chipUserBadgeC: {
      '&::after': {
        background: `linear-gradient( to top, ${sitecore['violet']} 0%, ${sitecore['violet']} 49%, ${sitecore['violet']} 49%, ${sitecore['violet']} 100%)`,
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
    <Paper className={classes.surfaceLevel1}>
      <Chip
        color="primary"
        classes={{
          label: classes.chipLabel,
        }}
        className={`${classes.chipBase} ${classes.chipOverlaying}`}
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
            className={`${classes.chipBase} ${classes.chipUserFull} ${classes.chipGroupA}`}
            icon={<People />}
            label="User Group A"
          />

          <Chip
            color="secondary"
            classes={{
              label: classes.chipLabel,
            }}
            className={`${classes.chipBase} ${classes.chipUserFull} ${classes.chipGroupB}`}
            icon={<People />}
            label="User Group B"
          />

          <Chip
            classes={{
              label: classes.chipLabel,
            }}
            className={`${classes.chipBase} ${classes.chipUserFull} ${classes.chipGroupC}`}
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
  )
}

export default OrgHierarchyImage5
