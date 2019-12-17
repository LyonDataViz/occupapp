import { ImageSrc } from '@/utils/types.ts'

// TODO fix a small height and width initially to avoid loading the heaviest image, if srcset exists (responsive image)? is this how onload works?
// TODO should we also generate a thumbnail?
export async function fetchImage ({ src, srcset }: ImageSrc): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img: HTMLImageElement = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
    if (srcset) {
      img.srcset = srcset
    }
  })
}

export const imgToBase64 = (img: HTMLImageElement, format: string = 'png'): string => {
  const canvas: HTMLCanvasElement = document.createElement('canvas')
  canvas.width = img.naturalWidth
  canvas.height = img.naturalHeight
  const ctx = canvas.getContext('2d')
  if (ctx === null) {
    return ''
  } else {
    ctx.drawImage(img, 0, 0)
    return canvas.toDataURL(`image/${format === 'png' ? format : 'jpeg'}`)
  }
}
