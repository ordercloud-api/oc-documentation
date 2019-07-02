import React from 'react';
import { Link } from 'gatsby';

const Footer = () => (
  <footer style={{
      background: 'linear-gradient(180deg, #045479 0%, #2D92C0 100%',
      height: '84px',
    }}
  >
    <Link to="/sample-markdown-format">Sample Markdown File</Link>
  </footer>
);

export default Footer