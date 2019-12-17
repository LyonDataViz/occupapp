import { ImageSrc } from '@/utils/types.ts'

function forgeUrl (name: string, width: number): string {
  return `https://github.com/severo/pictures/raw/master/images,w_${width}/${name}.jpg`
}

const names: string[] = [
  'petanque',
  'boats',
  'honeycomb',
  'spider',
  'wolves',
  'bazzania',
  'basketball',
  'beach',
  'cuzco'
]
const widths: number[] = [320, 640, 768, 1024, 1366, 1600, 1920]
const sortedWidth: number[] = [...widths].sort((a: number, b: number): number => a - b)
const minWidth: number = sortedWidth[0]
const maxWidth: number = sortedWidth[sortedWidth.length - 1]

const imageSrcs: ImageSrc[] = names.map(name => {
  return {
    src: forgeUrl(name, maxWidth),
    srcset: widths.map(w => `${forgeUrl(name, w)} ${w}w`).join(','),
    thumbnailSrc: forgeUrl(name, minWidth)
  }
})
const defaultSrc: ImageSrc = imageSrcs[0]

export { defaultSrc, imageSrcs }
