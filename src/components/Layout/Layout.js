import React from 'react';
import Header from './Header';
import Footer from './Footer';

export default ({ children }) => (
  <div style={{ margin: `3rem auto`, maxWidth: `60%`, padding: `0 1rem` }}>
    <Header siteTitle="OrderCloud Documentation" />
    {children}
    <Footer />
  </div>
)