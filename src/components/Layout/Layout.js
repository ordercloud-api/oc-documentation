import React from 'react';
import Header from './Header';
import Footer from './Footer';

export default ({ children }) => (
  <div>
    <Header siteTitle="OrderCloud Documentation" />
      {children}
    <Footer />
  </div>
)