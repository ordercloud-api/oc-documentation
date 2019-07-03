import React from 'react';
import { Link } from 'gatsby';
import { createStyles, Theme, withStyles } from '@material-ui/core';

const styles = (theme: Theme) => 
  createStyles({
    listItem: {
        display: 'inline-block', 
        marginRight: '1rem'
    }
  });

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

class ListLink extends React.Component<any> {
    public render() {
        const { guideProps, classes } = this.props;
        return (
            <li className={classes.listItem}>
                <Link to={guideProps.path}>{humanizePath(guideProps.title)}</Link>
            </li>
        )
    }
}

export default withStyles(styles)(ListLink);
  