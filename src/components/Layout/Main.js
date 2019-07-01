import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { groupBy as _groupBy, forEach as _forEach } from 'lodash';

import { ListLink } from '../Shared/ListLink';
import { StaticQuery } from 'gatsby';

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


export function Main({tableOfContents}) {
  const classes = useStyles();
  const sectionsWithGuides = _groupBy(tableOfContents.allMarkdownRemark.edges, 'node.frontmatter.section');
  let contentsArray = [];
  _forEach(sectionsWithGuides, (section, title) => contentsArray = [...contentsArray, {title: title, sections: section.map((s) => s.node)}]);
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
        { contentsArray.map((section, index) => {
          return (
            <Grid item xs={12} sm={6} key={index}>
              <Paper className={classes.paper}>
                <h2>{section.title}</h2>
                <ul>
                  { section.sections.map((s) => {
                    return (
                      <ListLink key={s.id} guideProps={{ path: s.frontmatter.path, title: s.frontmatter.title}} />
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

export default () => (
  <StaticQuery query={graphql`query {
    allMarkdownRemark {
      totalCount
      edges {
        node {
          id
          frontmatter {
            section
            title
            path
          }
        }
      }
    }
  }`} render={data => (
    <Main tableOfContents={data}/>
  )}/>
)