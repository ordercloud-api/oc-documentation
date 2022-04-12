import React from 'react'

import Layout from '../components/Layout/Layout'
import SEO from '../components/seo'
import svg404lady from '../assets/svg/lady.svg'
import svg404cloud from '../assets/svg/cloud.svg'
import '../components/layout.css'
import { Link } from 'gatsby'

// Need to manually hide the placeholder overlay on 404
document.querySelector('#placeholder').classList.add('hide')

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <div className="container__404">
      <div className="card__404">
        <div>
          <img src={svg404lady} className="levitate" alt="svg img" />
          <img src={svg404cloud} alt="svg img" />
        </div>
        <h1>404</h1>
        <h3>Page Not Found</h3>
        <Link to="/">Go Home</Link>
      </div>
    </div>
  </Layout>
)

export default NotFoundPage
