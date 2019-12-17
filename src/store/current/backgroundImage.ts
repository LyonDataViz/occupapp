// Current background image

// See https://championswimmer.in/vuex-module-decorators/
import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import store from '@/store'
import { defaultSrc } from '@/utils/severo_pictures.ts'

// TODO fix a small height and width initially to avoid loading the heaviest image, if srcset exists (responsive image)? is this how onload works?
// TODO should we also generate a thumbnail?
async function fetchImage (src: string, srcset: string = ''): Promise<HTMLImageElement> {
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

@Module({ dynamic: true, store, name: 'backgroundImage', namespaced: true })
export default class BackgroundImage extends VuexModule {
  // State - state of truth - meant to be exported as a JSON - init definitions
  image: HTMLImageElement = new Image()
  // TODO: remove this unused variable?
  // isReady: boolean = false

  // Getters - cached, not meant to be exported
  get naturalWidth (): number {
    return this.image.naturalWidth
  }
  get naturalHeight (): number {
    return this.image.naturalHeight
  }
  get src (): string {
    return this.image.src
  }
  get srcset (): string {
    return this.image.srcset
  }

  get aspectRatio (): number {
    if (this.naturalHeight === 0) {
      return 1
    }
    return this.naturalWidth / this.naturalHeight
  }

  @Mutation
  fromHTMLImageElement (image: HTMLImageElement) {
    this.image = image
  }
  // @Mutation
  // setNotReady () {
  //   this.isReady = false
  // }
  // @Mutation
  // setReady () {
  //   this.isReady = true
  // }

  @Action
  async fromSrc (src: string, srcset: string = '') {
    // this.setNotReady()
    this.fromHTMLImageElement(await fetchImage(src, srcset))
    // this.setReady()
  }
  @Action
  async initWithSomething () {
    // TODO improve the name and the way to initialize
    this.fromSrc(defaultSrc.src, defaultSrc.srcset)
  }
}
