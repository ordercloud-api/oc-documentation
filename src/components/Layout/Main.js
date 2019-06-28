import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { ListLink } from '../Shared/ListLink';

const tableOfContents = require('../../pages/table-of-contents.json');

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: `300px`
  },
}));

export default function Main() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            Welcome to OrderCloud
            <Button>Intro to OrderCloud</Button>
            <Button>Quick Start Guide</Button>
          </Paper>
        </Grid>
        { tableOfContents.sections.map((section, index) => {
          return (
            <Grid item xs={12} sm={6} key={index}>
              <Paper className={classes.paper}>
                {section.title}
                <ul>
                  { section.guides.map((guide, key) => {
                    return (
                      <ListLink key={key} guideProps={{ path: `${section.path}${guide}`, title: guide}} />
                    )
                  }) }
                </ul>
              </Paper>
            </Grid>
          )
        }) }
      </Grid>
    </div>
  )
}