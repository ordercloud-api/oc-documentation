const path = require("path")

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  const sampleFileTemplate = path.resolve(`src/templates/sample-markdown-format.js`);
  const blogPostTemplate = path.resolve(`src/templates/http-methods.js`);

  return graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
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

    result.data.allMarkdownRemark.edges.forEach((edge) => {
      const path = edge.node.frontmatter.path;
      createPage({
        path: path,
        component: matchingComponent(),
        context: {}, // additional data can be passed via context
      });

      function matchingComponent() {
        switch (path) {
          case '/http-methods':
            return blogPostTemplate;
          case '/sample-markdown-format':
            return sampleFileTemplate;
        }
      }
    })
  })
}