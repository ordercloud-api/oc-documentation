import React from 'react';
import { Theme, withStyles, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { groupBy as _groupBy, forEach as _forEach } from 'lodash';

import ListLink from '../Shared/ListLink';
import { StaticQuery, graphql } from 'gatsby';
import utility from '../Shared/utility';
import { Button } from '@material-ui/core';
import { Link } from '@reach/router';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      height: `300px`
    },
  });

const Main = withStyles(styles)(
  class extends React.Component<any> {

    public render() {
      const { tableOfContents, classes } = this.props;
      const sections = utility.getSectionsFromQuery(tableOfContents);

      return (
        <div className={classes.root}>
          <Grid container spacing={3}>
            {sections.map((section, index) =>
              section.title === 'Getting Started' ?
                <Grid item xs={12} sm={12} key={index}>
                  {section.guides.filter((g) => !g.frontmatter.hidden).length > 0 ?
                    <Paper className={classes.paper}>
                      <h2>Welcome to OrderCloud</h2>
                      <ul>
                        {section.guides.filter((c) => !c.frontmatter.hidden).map((s) => {
                          return (
                            <ListLink key={s.id} guideProps={{ path: s.frontmatter.path, title: s.frontmatter.title }} />
                          )
                        })}
                      </ul>
                    </Paper>
                    : null}
                </Grid>
                : <Grid item xs={12} sm={6} key={index}>
                  {section.guides.filter((c) => !c.frontmatter.hidden).length > 0 ?
                    <Paper className={classes.paper}>
                      <h2>{section.title}</h2>
                      <ul>
                        {section.guides.filter((c) => !c.frontmatter.hidden).map((s) => {
                          return (
                            <ListLink key={s.id} guideProps={{ path: s.frontmatter.path, title: s.frontmatter.title }} />
                          )
                        })}
                      </ul>
                    </Paper>
                    : null}
                </Grid>
            )}
            <Grid item xs={12} sm={6}>
              <Paper className={classes.paper}>
                <h2>API Reference</h2>
                <Link to="/api-reference">View Docs</Link>
              </Paper>
            </Grid>
          </Grid>
        </div>
      )
    }
  }
)


export default (() => (
  <StaticQuery query={graphql`query {
    allMdx(
      sort: { order: ASC, fields: [frontmatter___priority] }
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            section
            title
            path
            hidden
          }
        }
      }
    }
  }`} render={data => (
      <Main tableOfContents={data} />
    )} />
));