const React = require('react')
const fs = require('fs')
const styleContents = typeof window !== `undefined` ? fs.readFileSync('./src/styles/placeholder.css') : null
/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */
// https://www.gatsbyjs.org/docs/ssr-apis/#onPreRenderHTML
exports.onPreRenderHTML = ({
  getPreBodyComponents,
  replacePreBodyComponents,
}) => {
  // set initial background - avoids blank page while app loads
  replacePreBodyComponents([
    <style
      key="placeholder-styles"
      dangerouslySetInnerHTML={{ __html: styleContents }}
    ></style>,
    <div key="placeholder" id="placeholder"></div>,
    ...getPreBodyComponents(),
  ])
}
