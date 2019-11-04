// See https://championswimmer.in/vuex-module-decorators/
import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import store from '@/store'

function forgeUrl (name: string, width: number): string {
  return `https://github.com/severo/pictures/raw/master/images,w_${width}/${name}.jpg`
}
async function fetchImage (src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img: HTMLImageElement = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

@Module({ dynamic: true, store, name: 'pictures' })
export default class Pictures extends VuexModule {
  // Data - state of truth - meant to be exported as a JSON
  selected: number = 0
  selectedWidth: number = 300
  selectedHeight: number = 150
  names: string[] = [
    'petanque',
    'boats',
    'honeycomb',
    'spider',
    'wolves',
    'bazzania'
  ]
  widths: number[] = [320, 640, 768, 1024, 1366, 1600, 1920]

  // Derived data - cached, not meant to be exported
  get minWidth (): number {
    return this.sortedWidths[0]
  }
  get maxWidth (): number {
    return this.sortedWidths[this.sortedWidths.length - 1]
  }
  get selectedName (): string {
    return (this.selected in this.names) ? this.names[this.selected] : 'unknown'
  }
  get selectedSrcAtWidth () {
    return (width: number): string => forgeUrl(this.selectedName, width)
  }
  get thumbnailSrcs (): string[] {
    return this.names.map(name => forgeUrl(name, this.minWidth))
  }
  get selectedAspectRatio (): number {
    return this.selectedHeight ? this.selectedWidth / this.selectedHeight : 1
  }
  // Private derived data
  private get sortedWidths (): number[] {
    return [...this.widths].sort((a: number, b: number): number => a - b)
  }

  // Mutations (synchronous)
  @Mutation
  setSelectedIdx (idx: number) {
    this.selected = idx
  }
  @Mutation
  setSelectedWidth (width: number) {
    this.selectedWidth = width
  }
  @Mutation
  setSelectedHeight (height: number) {
    this.selectedHeight = height
  }

  // Actions (asynchronous)
  @Action
  async select (idx: number) {
    const img: HTMLImageElement = await fetchImage(forgeUrl(this.names[idx], this.maxWidth))
    this.context.commit('setSelectedIdx', idx)
    this.context.commit('setSelectedWidth', img.naturalWidth)
    this.context.commit('setSelectedHeight', img.naturalHeight)
  }
}
