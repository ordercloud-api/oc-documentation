'use strict'
const path = require('path')

require('source-map-support').install()
require('ts-node').register({
  compilerOptions: {
    module: 'commonjs',
    target: 'es2017',
  },
})

exports.createPages = require('./gatsby-create-pages').createPages
exports.onCreateWebpackConfig = ({ actions }) => {
  // lets us import components into mdx files
  // https://github.com/ChristopherBiscardi/gatsby-mdx/issues/176#issuecomment-429569578
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
  })
}



exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions
  createTypes(`
    type Mdx implements Node {
      frontmatter: MdxFrontmatter
    }

    type MdxFrontmatter {
      author: AuthorJson @link(from: "author" by:"username")
    }

    type AuthorJson implements Node {
      id: ID!
      username: String!
      name: String!
      title: String! 
    }`
  )
}
