function forgeUrl (name: string, width: number): string {
  return `https://github.com/severo/pictures/raw/master/images,w_${width}/${name}.jpg`
}

function getName (pictureId: number) {
  if (!(pictureId in names)) {
    throw new Error(`No picture at ${pictureId} index`)
  }
  return names[pictureId]
}

async function fetchImage (pictureId: number): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img: HTMLImageElement = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = forgeUrl(names[pictureId], maxWidth)
    img.srcset = widths.map(w => `${forgeUrl(names[pictureId], w)} ${w}w`).join(',')
  })
}

// TODO remove?
// async function fetchMaxSize (pictureId: number): Promise<{width: number, height: number}> {
//   const img = await fetchImage(pictureId)
//   return {
//     width: img.naturalWidth,
//     height: img.naturalHeight
//   }
// }

const names: string[] = [
  'petanque',
  // 'boats',
  // 'honeycomb',
  // 'spider',
  // 'wolves',
  'bazzania'
]
const widths: number[] = [320, 640, 768, 1024, 1366, 1600, 1920]
const sortedWidth: number[] = [...widths].sort((a: number, b: number): number => a - b)
const minWidth: number = sortedWidth[0]
const maxWidth: number = sortedWidth[sortedWidth.length - 1]
const thumbnailSrcs: string[] = names.map(name => forgeUrl(name, minWidth))

export { names, getName, widths, thumbnailSrcs, fetchImage }
