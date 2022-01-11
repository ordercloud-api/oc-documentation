'use strict'
const path = require('path')

require('ts-node').register({
  compilerOptions: {
    module: 'commonjs',
    target: 'es2017',
  },
})

exports.createPages = require('./gatsby-create-pages').createPages
exports.onCreateWebpackConfig = ({ getConfig, actions }) => {
  // lets us import components into mdx files
  // https://github.com/ChristopherBiscardi/gatsby-mdx/issues/176#issuecomment-429569578
  const currentConfig = getConfig();
  const devtool = currentConfig.mode === 'production' ? false : currentConfig.devtool;
  actions.setWebpackConfig({
    devtool,
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
  })
}

exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions
  const typeDefs = [
    'type Mdx implements Node { frontmatter: Frontmatter }',
    schema.buildObjectType({
      name: 'Frontmatter',
      fields: {
        author: {
          type: 'AuthorJson',
          resolve: (source, args, context, info) => {
            return context.nodeModel.getNodeById({
              id: source.author,
              type: 'AuthorJson',
            })
          },
        },
      },
    }),
  ]
  createTypes(typeDefs)
}
