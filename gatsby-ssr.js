const React = require('react')
const fs = require('fs')
// const styleContents = typeof window !== `undefined` ? fs.readFileSync('./src/styles/placeholder.css') : null
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
      dangerouslySetInnerHTML={{ __html: `
        body > div#placeholder {
          content: "";
          position:fixed;
          left:0;
          top:0;
          right:0;
          bottom:0;
          background: #fff;
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
          height: 48px;
          background: #616161;
          z-index:1;
        }
          
        @media(min-width:960px) {
          body > div#placeholder:after {
            height:48px;
          }
        }
    ` }}
    ></style>,
    <div key="placeholder" id="placeholder"></div>,
    ...getPreBodyComponents(),
  ])
}
