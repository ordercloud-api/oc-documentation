import React from 'react';
import { Typography, makeStyles, Theme, createStyles, Chip } from '@material-ui/core';

interface ApiRolesProps {
  roles: string[]
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    rolesList: {
      display: 'flex',
      flexFlow: 'row',
      'margin-left': '-10px'
    },
    role: {
      margin: theme.spacing(1),
      textAlign: 'center',
    },
  })
)

const ApiRoles: React.FunctionComponent<ApiRolesProps> = props => {
  const { roles } = props;
  const classes = useStyles({});
  return (
    roles.length ?
      <React.Fragment>
        <Typography variant="h4">Roles</Typography>
        <div className={classes.rolesList}>
          {roles.map(role =>
            <Chip className={classes.role} variant="outlined" label={role}></Chip>
          )}
        </div>
      </React.Fragment> : null
  )
}

export default ApiRoles;