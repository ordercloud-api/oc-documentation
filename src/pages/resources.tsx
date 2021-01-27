import React from 'react'
import Layout from '../components/Layout/Layout'
import ResourcesComponent from '../components/Layout/Resources'
import { Helmet } from 'react-helmet'

export default () => (
  <Layout>
    <Helmet title={`Four51 OrderCloud | Resources`} />
    <ResourcesComponent />
  </Layout>
)
