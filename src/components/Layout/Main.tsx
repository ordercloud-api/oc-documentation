import React from 'react';
import { Theme, withStyles, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { groupBy as _groupBy, forEach as _forEach } from 'lodash';

import ListLink from '../Shared/ListLink';
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

  const Main = withStyles(styles)(
    class extends React.Component<any> {
      public render() {
        const { tableOfContents, classes } = this.props;
        const sectionsWithGuides = _groupBy(tableOfContents.allMarkdownRemark.edges, 'node.frontmatter.section');
        let contentsArray = [];
        _forEach(sectionsWithGuides, (section, title) => contentsArray = [...contentsArray, {title: title, sections: section.map((s) => s.node)}]);
        return (
          <div className={classes.root}>
            <Grid container spacing={3}>
              { contentsArray.map((section, index) => {
                return (
                  <Grid item xs={12} sm={section.title != 'Getting Started' ? 6 : 12} key={index}>
                    <Paper className={classes.paper}>
                      <h2>{section.title === 'Getting Started' ? "Welcome to OrderCloud" : section.title}</h2>
                      <ul>
                        { section.sections.filter((c) => !c.frontmatter.hidden).map((s) => {
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
  )


export default (() => (
  <StaticQuery query={graphql`query {
    allMarkdownRemark(
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
    <Main tableOfContents={data}/>
  )}/>
));