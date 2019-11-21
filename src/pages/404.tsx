import React from 'react'

import Layout from '../components/Layout/Layout'
import SEO from '../components/seo'
import svg404 from '../assets/svg/404-graphic.svg'
import '../components/layout.css'
import { Link } from 'gatsby'

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <div className="container__404">
      <div className="card__404">
        <img src={svg404} alt="svg img" />
        <h1>404</h1>
        <h3>Page Not Found</h3>
        <Link to="/console">go home</Link>
      </div>
    </div>
  </Layout>
)

export default NotFoundPage
