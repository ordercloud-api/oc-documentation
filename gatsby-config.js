/* eslint-disable @typescript-eslint/camelcase */
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})
const docsQuery = `{
  docs: allMdx(sort: {order: ASC, fields: [frontmatter___priority]}, filter: {fileAbsolutePath: {glob: "**/content/docs/**/*.mdx"}}) {
    edges {
      node {
        objectID: id
        fileAbsolutePath
        frontmatter {
          section
          title
          hidden
          summary
          authors
        }
        excerpt(pruneLength:5000)
      }
    }
  }
}
`
const blogQuery = `{
  blogs: allMdx(sort: {order: ASC, fields: [frontmatter___priority]}, filter: {fileAbsolutePath: {glob: "**/content/blog/*.mdx"}}) {
    edges {
      node {
        objectID: id
        fileAbsolutePath
        timeToRead
        frontmatter {
          title
          authors
          date
          tags
        }
        excerpt(pruneLength:5000)
      }
    }
  }
}`

const flatten = arr => {
  return arr.map(({ node: { frontmatter, ...rest } }) => ({
    ...frontmatter,
    ...rest,
  }))
}

const settings = {
  attributesToSnippet: [`excerpt:20`],
}

const queries = [
  {
    query: docsQuery,
    transformer: ({ data }) => flatten(data.docs.edges),
    indexName: process.env.GATSBY_ALGOLIA_INDEX_NAME,
    settings,
  },
  {
    query: blogQuery,
    transformer: ({ data }) => flatten(data.blogs.edges),
    indexName: process.env.GATSBY_ALGOLIA_INDEX_NAME,
    settings,
  },
]
const toExport = {
  siteMetadata: {
    title: `OrderCloud Documentation`,
    description: `Documentation for OrderCloud's B2B eCommerce API`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-catch-links`,
    `gatsby-transformer-json`,
    `gatsby-plugin-material-ui`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-typescript`,
    `gatsby-plugin-typescript-checker`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/content`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `ordercloud documenation`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/assets/images/four51-badge--orange.svg`,
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.mdx', '.md'],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-autolink-headers`,
            //  TODO: we may want to consider these design options below to add our own icon or class
            //  options: {
            //    icon: `<svg aria-hidden="true" height="20" version="1.1" viewBox="0 0 16 16" width="20"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>`,
            //    className: `custom-class`
            //  }
          },
          `gatsby-remark-prismjs`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590, // must be set
            },
          },
        ],
      },
    },
  ],
}

module.exports = toExport
if (process.env.GATSBY_ALGOLIA_ADMIN_API_KEY) {
  // for local development, don't store GATSBY_ALGOLIA_ADMIN_API_KEY
  // because it will rebuild the algolia index
  toExport.plugins.push({
    resolve: `gatsby-plugin-algolia`,
    options: {
      appId: process.env.GATSBY_ALGOLIA_APP_ID,
      apiKey: process.env.GATSBY_ALGOLIA_ADMIN_API_KEY,
      indexName: process.env.GATSBY_ALGOLIA_INDEX_NAME, // for all queries
      queries,
      chunkSize: 10000, // default: 1000
    },
  })
}
