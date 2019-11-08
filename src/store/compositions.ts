// See https://championswimmer.in/vuex-module-decorators/
import { Module, Mutation, VuexModule } from 'vuex-module-decorators'
import store from '@/store'

export interface Point {
  x: number
  y: number
}

export interface Composition {
    id: number;
    pictureId: number;
    pictureWidth: number;
    pictureHeight: number;
    points: Point[];
}

@Module({ dynamic: true, store, name: 'compositions' })
export default class Compositions extends VuexModule {
  // State - state of truth - meant to be exported as a JSON - init definitions

  // Currently: 1-to-1 correspondance between pictures and compositions
  // TODO allow various compositions for a given picture?
  all: Composition[] = [
    { id: 0,
      pictureId: 0, // 'petanque'
      pictureWidth: 2620,
      pictureHeight: 1745,
      points: [
        { x: 50.1, y: 60.5 },
        { x: 36.5, y: 87.4 },
        { x: 17.9, y: 73.0 },
        { x: 28.2, y: 36.6 },
        { x: 49.9, y: 36.5 },
        { x: 76.2, y: 27.9 },
        { x: 87.9, y: 35.9 }
      ]
    },
    { id: 1,
      pictureId: 1, // 'bazzania'
      pictureWidth: 1936,
      pictureHeight: 1288,
      points: [
        { x: 50, y: 40 },
        { x: 50, y: 60 },
        { x: 40, y: 50 },
        { x: 60, y: 50 }
      ]
    }
  ]
  currentId: number = 0

  // Getters - cached, not meant to be exported
  get count (): number {
    return this.all.length
  }

  get allByPictureId () {
    return (pictureId: number): Composition[] => {
      return this.all.filter((c: Composition): boolean => c.pictureId === pictureId)
    }
  }

  get getByPictureId () {
    return (pictureId: number): Composition => {
      const c = this.all.find(c => c.pictureId === pictureId)
      if (c === undefined) {
        throw new Error(`No composition in "all" for pictureId ${pictureId}. There should be exactly one.`)
      } else {
        return c
      }
    }
  }

  get current (): Composition {
    // if (!(this.currentId in this.all)) {
    //   throw new Error(`No composition in "all" for currentId ${this.currentId}`)
    // }
    return this.all[this.currentId]
  }

  get currentPictureId (): number {
    return this.current.pictureId
  }

  get currentAspectRatio (): number {
    if (this.current.pictureHeight === 0) {
      throw new Error('Cannot compute aspect ratio since picture height is 0')
    }
    return this.current.pictureWidth / this.current.pictureHeight
  }

  // Mutations (synchronous)
  // TODO remove dead code, or adapt, if we want to manage various compositions per picture
  // @Mutation
  // add (c: Composition) {
  //   // brittle way to fill the id - how could we improve it?
  //   c.id = this.all.push(c) - 1
  //   return c
  // }
  @Mutation
  setCurrent (id: number) {
    if (!(id in this.all)) {
      throw new Error(`Cannot set composition ${id} as current. No such composition in "all" array.`)
    }
    this.currentId = id
  }
  // TODO hack! idk why, but commented code throws TypeError: this.getByPictureId is not a function
  // Use an action?
  // @Mutation
  // setCurrentByPictureId (pictureId: number) {
  //   // const c = this.getByPictureId(pictureId)
  //   // this.setCurrent(c.id)
  //
  //   this.setCurrent(pictureId)
  // }
  @Mutation
  setCurrentPoints (points: Point[]) {
    this.current.points = points
  }

  // Actions (asynchronous)
  // TODO remove dead code, or adapt, if we want to manage various compositions per picture
  // @Action
  // async addByPictureId (pictureId: number) {
  //   // Get the image size
  //   const { width, height } = await fetchMaxSize(pictureId)
  //   const c: Composition = {
  //     id: -1,
  //     pictureId: pictureId,
  //     pictureWidth: width,
  //     pictureHeight: height,
  //     points: []
  //   }
  //   return this.add(c)
  // }
}
