// https://www.gatsbyjs.org/docs/browser-apis/
require('prismjs/themes/prism-tomorrow.css')
require('./src/styles/gatsby-highlight.css')
require('./src/styles/prismjs.css')

exports.onInitialClientRender = () => {
  document.getElementById('placeholder').classList.add('hide')
}
