require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})
const docsQuery = `{
  allMdx(sort: {order: ASC, fields: [frontmatter___priority]}, filter: {fileAbsolutePath: {glob: "**/content/docs/**/*.mdx"}}) {
    nodes {
      id
      fileAbsolutePath
      frontmatter {
        section
        title
        hidden
        summary
        authors
      }
      rawBody
    }
  }
}
`
const blogQuery = `{
  allMdx(sort: {order: ASC, fields: [frontmatter___priority]}, filter: {fileAbsolutePath: {glob: "**/content/blog/*.mdx"}}) {
    nodes {
      id
      fileAbsolutePath
      timeToRead
      frontmatter {
        title
        authors
        date
        tags
      }
      rawBody
    }
  }
}`
const queries = [
  {
    query: docsQuery,
    // 1. Break each post into an array of searchable text
    // 2. return a flattened array of all
    transformer: ({ data }) => {
      let paragraphs = []
      data.allMdx.nodes.map(doc => {
        let chunk = doc.rawBody
          // replace anything starting and ending with `---` with nothing (remove frontmatter from .mdx files)
          .replace(/---([\S\s]*?)---/g, '')
          // remove heading markup
          .replace(/#([\S\s]*?)#/g, '')
          // remove html tags, anything between < >
          .replace(/<([\S\s]*?)>/g, '')
          // remove table markup
          .replace(/\|([\S\s]*?)\|/g, '')
          // remove any comments ex: ![TODO: ...]
          .replace(/!\[([\S\s]*?)\]/g, '')
          // remove any markup links
          .replace(/\[([\S\s]*?)\)/g, '')
          // remove anything in a code block, between triple back tics
          .replace(/```([\S\s]*?)```/g, '')
          // remove the back tics in in-line code expamples
          .replace(/`/g, '')
          // remove any bolding asterisks
          .replace(/\*\*/g, '')
          // remove any single #
          .replace(/#/g, '')
          // remove links in parens
          .replace(/\(\.\.([\S\s]*?)\)/g, '')
          // remove gatsby import
          .replace(/import { Link } from 'gatsby'/g, '')
          // trim off excess white spaces
          .trim()
          // replace paragraph breaks with a space
          .replace(/(\r\n|\n|\r)/gm, '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
          .split('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
        chunk = chunk.filter(c => c != '')
        console.log(chunk)
        chunk.map(c => {
          paragraphs.push({
            id: doc.id,
            category: 'Docs',
            title: doc.frontmatter.title,
            fileAbsolutePath: doc.fileAbsolutePath,
            excerpt: c,
          })
        })
      })
      return paragraphs
    },
  },
  {
    query: blogQuery,
    // 1. Break each post into an array of searchable text
    // 2. return a flattened array of all
    transformer: ({ data }) => {
      let paragraphs = []
      data.allMdx.nodes.map(post => {
        let chunk = post.rawBody
          // replace anything starting and ending with `---` with nothing (remove frontmatter from .mdx files)
          .replace(/---([\S\s]*?)---/g, '')
          // remove heading markup
          .replace(/#([\S\s]*?)#/g, '')
          // remove html tags, anything between < >
          .replace(/<([\S\s]*?)>/g, '')
          // remove table markup
          .replace(/\|([\S\s]*?)\|/g, '')
          // remove any comments ex: ![TODO: ...]
          .replace(/!\[([\S\s]*?)\]/g, '')
          // remove any markup links
          .replace(/\[([\S\s]*?)\)/g, '')
          // remove anything in a code block, between triple back tics
          .replace(/```([\S\s]*?)```/g, '')
          // remove the back tics in in-line code expamples
          .replace(/`/g, '')
          // remove any bolding asterisks
          .replace(/\*\*/g, '')
          // remove any single #
          .replace(/#/g, '')
          // remove links in parens
          .replace(/\(\.\.([\S\s]*?)\)/g, '')
          // remove gatsby import
          .replace(/import { Link } from 'gatsby'/g, '')
          // trim off excess white spaces
          .trim()
          // replace paragraph breaks with a space
          .replace(/(\r\n|\n|\r)/gm, '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
          .split('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
        chunk = chunk.filter(c => c != '')
        console.log(chunk)
        chunk.map(c => {
          paragraphs.push({
            id: post.id,
            category: 'Blog',
            title: post.frontmatter.title,
            authors: post.frontmatter.authors,
            timeToRead: post.timeToRead,
            date: post.frontmatter.date,
            tags: post.frontmatter.tags,
            fileAbsolutePath: post.fileAbsolutePath,
            excerpt: c,
          })
        })
      })
      return paragraphs
    },
  },
]
module.exports = {
  siteMetadata: {
    title: `OrderCloud Documentation`,
    description: `Documentation for OrderCloud's B2B eCommerce API`,
    author: `@gatsbyjs`,
  },
  pathPrefix: '/documentation',
  plugins: [
    `gatsby-plugin-catch-links`,
    `gatsby-transformer-json`,
    `gatsby-plugin-material-ui`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-typescript`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.GATSBY_ALGOLIA_API_KEY,
        indexName: process.env.GATSBY_ALGOLIA_INDEX_NAME, // for all queries
        queries,
        chunkSize: 10000, // default: 1000
      },
    },
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
