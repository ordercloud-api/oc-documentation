const fetch = require('node-fetch')
exports.sourceNodes = (
  { actions, createNodeId, createContentDigest },
  configOptions
) => {
  const { createNode } = actions
  // Gatsby adds a configOption that's not needed for this plugin, delete it
  delete configOptions.plugins

  // plugin code goes here...
  return fetch(`https://api.ordercloud.io/v1/openapi/v3`)
    .then(response => response.json())
    .then(spec => {
      const version = spec.info.version
      const [major, minor, patch] = version.split('.')
      const versionWithoutBuildNumber = [major, minor, patch].join('.')

      return createNode({
        id: createNodeId(`ordercloud-version`),
        parent: null,
        children: [],
        internal: {
          type: `OrderCloudVersion`,
          content: versionWithoutBuildNumber,
          contentDigest: createContentDigest(versionWithoutBuildNumber),
        },
      })
    })
}
