import GeometriaWoff400 from '../assets/fonts/Geometria/Geometria_400/3A0B9A_27_0.woff'
import GeometriaWoff500 from '../assets/fonts/Geometria/Geometria_500/3A0B9A_26_0.woff'
import GeometriaWoff600 from '../assets/fonts/Geometria/Geometria_600/3A0B9A_21_0.woff'
import GeometriaWoff700 from '../assets/fonts/Geometria/Geometria_700/3A0B9A_1C_0.woff'
import GeometriaWoff800 from '../assets/fonts/Geometria/Geometria_800/3A0B9A_20_0.woff'
import GeometriaWoff2400 from '../assets/fonts/Geometria/Geometria_400/3A0B9A_27_0.woff2'
import GeometriaWoff2500 from '../assets/fonts/Geometria/Geometria_500/3A0B9A_26_0.woff2'
import GeometriaWoff2600 from '../assets/fonts/Geometria/Geometria_600/3A0B9A_21_0.woff2'
import GeometriaWoff2700 from '../assets/fonts/Geometria/Geometria_700/3A0B9A_1C_0.woff2'
import GeometriaWoff2800 from '../assets/fonts/Geometria/Geometria_800/3A0B9A_20_0.woff2'

const fontAttributes = [
  {
    weight: 400,
    fonts: [GeometriaWoff2400, GeometriaWoff400],
  },
  {
    weight: 500,
    fonts: [GeometriaWoff2500, GeometriaWoff500],
  },
  {
    weight: 600,
    fonts: [GeometriaWoff2600, GeometriaWoff600],
  },
  {
    weight: 700,
    fonts: [GeometriaWoff2700, GeometriaWoff700],
  },
  {
    weight: 800,
    fonts: [GeometriaWoff2800, GeometriaWoff800],
  },
]

const fontFaces = fontAttributes.map(attribute => {
  return {
    fontFamily: 'Geometria',
    fontStyle: 'normal',
    fontDisplay: 'swap' as 'swap',
    fontWeight: attribute.weight,
    src: `local('Geometria'), url(${attribute.fonts[0]}) format('woff2'), url(${attribute.fonts[1]}) format('woff')`,
    unicodeRange: 'U+000-5FF',
  }
})
console.log(fontFaces)

export default fontFaces
