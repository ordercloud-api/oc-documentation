import React from 'react'
import {
  Typography,
  makeStyles,
  Theme,
  createStyles,
  Chip,
} from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    rolesList: {
      display: 'flex',
      flexFlow: 'row wrap',
      'margin-left': '-10px',
    },
    role: {
      margin: theme.spacing(0.5),
      textAlign: 'center',
    },
  })
)

interface ApiRolesProps {
  roles: string[]
}
const ApiRoles: React.FunctionComponent<ApiRolesProps> = (
  props: ApiRolesProps
) => {
  const { roles } = props
  const classes = useStyles({})
  return roles.length ? (
    <React.Fragment>
      <Typography variant="h2">Roles</Typography>
      <Typography>
        At least one of the roles below is required to access this endpoint
      </Typography>
      <div className={classes.rolesList}>
        {roles.map(role => (
          <Chip
            className={classes.role}
            key={role}
            color="secondary"
            variant="outlined"
            label={role}
          ></Chip>
        ))}
      </div>
    </React.Fragment>
  ) : null
}

export default ApiRoles
