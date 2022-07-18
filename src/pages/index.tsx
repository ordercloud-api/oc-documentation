import React from 'react'
import Layout from '../components/Layout/Layout'
import Main from '../components/Layout/Main'
import { Helmet } from 'react-helmet'

export default () => (
  <Layout>
    <Helmet>
      <title>Sitecore OrderCloud</title>
      <link
        rel="icon"
        type="image/png"
        href="https://mss-p-006-delivery.stylelabs.cloud/api/public/content/e496fb48ca514bb2a06a48e7337b68d9"
        sizes="16x16"
      />
    </Helmet>
    <Main />
  </Layout>
)
