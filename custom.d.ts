// silences errors about importing svgs
declare module '*.svg' {
  const content: any
  export default content
}

// allows us to import fonts
declare module '*.woff'
declare module '*.woff2'
