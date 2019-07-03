import { Link } from 'gatsby';
import React from 'react';
import { Theme, createStyles, withStyles } from '@material-ui/core';

const styles = (theme: Theme) => 
  createStyles({
    header: {
      background: 'linear-gradient(180deg, #2D92C0 0%, #045479 100%)',
      marginBottom: '1.45rem',
    },
    titleContainer: {
      margin: '0 auto',
      maxWidth: 960,
      padding: '1.45rem 1.0875rem',
    },
    title: {
      margin: 0, 
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
    },
    titleLink: {
      color: 'white',
      textDecoration: 'none',
    }
  });

class Header extends React.Component<any> {
  public render() {
    const { siteTitle, classes } = this.props;
    return (
      <header className={classes.header}>
        <div className={classes.titleContainer}>
          <h1 className={classes.title}>
            <Link to="/" className={classes.titleLink}>
              {siteTitle}
            </Link>
          </h1>
        </div>
      </header>
    )
  }
}

export default withStyles(styles)(Header);
