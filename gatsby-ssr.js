/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it
const React = require('react')
/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */
// https://www.gatsbyjs.org/docs/ssr-apis/#onRenderBody
exports.onPreRenderHTML = ({
  getPreBodyComponents,
  replacePreBodyComponents,
}) => {
  // set initial background - avoids blank page while app loads
  const styleContents = `
  body > div#placeholder {
    content: "";
    position:fixed;
    left:0;
    top:0;
    right:0;
    bottom:0;
    background: #fafafa;
    z-index:10000;
    opacity:1;
    transition: opacity 200ms ease-out;
  }
  body > div#placeholder.hide {
    opacity:0;
    pointer-events:none;
  }
  body > div#placeholder:after {
    content: "";
    position:fixed;
    left:0;
    top:0;
    right:0;
    height: 80px;
    background: #032A43;
    box-shadow:0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12);
    z-index:1;
  }`
  replacePreBodyComponents([
    <style
      key="placeholder-styles"
      dangerouslySetInnerHTML={{ __html: styleContents }}
    ></style>,
    <div key="placeholder" id="placeholder"></div>,
    ...getPreBodyComponents(),
  ])
}
