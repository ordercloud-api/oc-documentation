import React from 'react';
import { Link } from 'gatsby';

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

export function ListLink(props) {
    return (
        <li style={{ display: `inline-block`, marginRight: `1rem` }}>
            <Link to={props.guideProps.path}>{humanizePath(props.guideProps.title)}</Link>
        </li>
    )
}

  