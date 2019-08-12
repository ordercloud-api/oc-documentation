// silences errors about importing svgs
declare module '*.svg' {
  const content: any
  export default content
}
