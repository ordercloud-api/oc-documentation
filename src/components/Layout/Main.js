import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Link } from 'gatsby';

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

  const sections = [
    { 
      title: 'Main Concepts',
      path: '/main-concepts',
      guides: ['/organizational-structure', '/assignments', '/me-resource', '/security-profiles', '/catalog-structure', '/product-visibility', '/authentication']  
    },
    {
      title: 'Features',
      path: '/features',
      guides: ['feature1', 'feature2']
    }
  ];

  function humanizePath(path) {
    // TODO: there's got to be a regex to handle this in one go
    // remove slashes
    // remove hyphens
    // title case
    const stringWithoutSlashes = path.replace(/^\/|\/$/g, ''); 
    const stringWithoutHyphens = stringWithoutSlashes.replace(/-|\s/g, ' ');
    return stringWithoutHyphens.split(' ')
      .map(w => w[0].toUpperCase() + w.substr(1).toLowerCase())
      .join(' ');
  }

  const ListLink = props => (
    <li style={{ display: `inline-block`, marginRight: `1rem` }}>
      <Link to={props.guideProps.path}>{humanizePath(props.guideProps.title)}</Link>
    </li>
  )

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
        { sections.map((section, index) => {
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