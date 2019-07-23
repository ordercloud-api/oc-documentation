const path = require("path")

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  const docTemplate = path.resolve(`src/templates/doc-template.tsx`);

  return graphql(`
    {
      allMdx (
        sort: { order: ASC, fields: [frontmatter___priority] }	
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              title
              path
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    result.data.allMdx.edges.forEach((edge) => {
      const path = edge.node.frontmatter.path;
      createPage({
        path: path,
        component: docTemplate,
        context: {}, // additional data can be passed via context
      });
    })
  })
}

exports.onCreateWebpackConfig = ({
  actions
}) => {
  // lets us reference components in mdx files from 'components/my-awesome-component'
  // since mdx doesn't support relative files: https://github.com/ChristopherBiscardi/gatsby-mdx/issues/176#issuecomment-429569578
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
  })
}