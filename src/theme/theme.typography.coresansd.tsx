import CoreSansDWoff300 from '../assets/fonts/CoreSansD/CoreSansD_300/3A0B9A_5_0.woff'
import CoreSansDWoff400 from '../assets/fonts/CoreSansD/CoreSansD_400/3A0B9A_8_0.woff'
import CoreSansDWoff500 from '../assets/fonts/CoreSansD/CoreSansD_500/3A0B9A_D_0.woff'
import CoreSansDWoff600 from '../assets/fonts/CoreSansD/CoreSansD_600/3A0B9A_11_0.woff'
import CoreSansDWoff700 from '../assets/fonts/CoreSansD/CoreSansD_700/3A0B9A_15_0.woff'

import CoreSansDWoff2300 from '../assets/fonts/CoreSansD/CoreSansD_300/3A0B9A_5_0.woff2'
import CoreSansDWoff2400 from '../assets/fonts/CoreSansD/CoreSansD_400/3A0B9A_8_0.woff2'
import CoreSansDWoff2500 from '../assets/fonts/CoreSansD/CoreSansD_500/3A0B9A_D_0.woff2'
import CoreSansDWoff2600 from '../assets/fonts/CoreSansD/CoreSansD_600/3A0B9A_11_0.woff2'
import CoreSansDWoff2700 from '../assets/fonts/CoreSansD/CoreSansD_700/3A0B9A_15_0.woff2'

const fontAttributes = [
  {
    weight: 300,
    fonts: [CoreSansDWoff2300, CoreSansDWoff300],
  },
  {
    weight: 400,
    fonts: [CoreSansDWoff2400, CoreSansDWoff400],
  },
  {
    weight: 500,
    fonts: [CoreSansDWoff2500, CoreSansDWoff500],
  },
  {
    weight: 600,
    fonts: [CoreSansDWoff2600, CoreSansDWoff600],
  },
  {
    weight: 700,
    fonts: [CoreSansDWoff2700, CoreSansDWoff700],
  },
]

const fontFaces = fontAttributes.map(attribute => {
  return {
    fontFamily: 'Core Sans D',
    fontStyle: 'normal',
    fontDisplay: 'swap' as 'swap',
    fontWeight: attribute.weight,
    src: `url(${attribute.fonts[0]}) format('woff2'), url(${attribute.fonts[1]}) format('woff')`,
    unicodeRange: 'U+000-5FF',
  }
})

export default fontFaces
