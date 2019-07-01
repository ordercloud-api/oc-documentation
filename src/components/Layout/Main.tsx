import React from 'react';
import { Theme, withStyles, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { groupBy as _groupBy, forEach as _forEach } from 'lodash';

import { ListLink } from '../Shared/ListLink';
import { StaticQuery, graphql } from 'gatsby';


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

class Main extends React.Component<any> {
  public render() {
    const { tableOfContents } = this.props;
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
}

export default withStyles(styles, { withTheme: true })(() => (
  <StaticQuery query={graphql`query {
    allMarkdownRemark(
      sort: { order: ASC, fields: [frontmatter___section] }
    ) {
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
));