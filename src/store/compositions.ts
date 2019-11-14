// See https://championswimmer.in/vuex-module-decorators/
import { Module, Mutation, VuexModule } from 'vuex-module-decorators'
import store from '@/store'

export interface Point {
  x: number
  y: number
  selected: boolean
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
        { x: 50.1, y: 60.5, selected: false },
        { x: 36.5, y: 87.4, selected: false },
        { x: 17.9, y: 73.0, selected: false },
        { x: 28.2, y: 36.6, selected: false },
        { x: 49.9, y: 36.5, selected: false },
        { x: 76.2, y: 27.9, selected: false },
        { x: 87.9, y: 35.9, selected: false }
      ]
    },
    { id: 1,
      pictureId: 1, // 'bazzania'
      pictureWidth: 1936,
      pictureHeight: 1288,
      points: [
        { x: 50, y: 40, selected: false },
        { x: 50, y: 60, selected: false },
        { x: 40, y: 50, selected: false },
        { x: 60, y: 50, selected: false }
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

  get current (): Composition {
    if (!(this.currentId in this.all)) {
      throw new Error(`No composition in "all" for currentId ${this.currentId}`)
    }
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
  @Mutation
  setCurrent (id: number) {
    if (!(id in this.all)) {
      throw new Error(`Cannot set composition ${id} as current. No such composition in "all" array.`)
    }
    this.currentId = id
  }
  @Mutation
  setCurrentByPictureId (pictureId: number) {
    if (!(pictureId in this.all)) {
      throw new Error(`No composition in "all" for pictureId ${pictureId}. There should be exactly one.`)
    }
    store.commit('setCurrent', this.all[pictureId].id)
  }
  @Mutation
  setCurrentPoints (points: Point[]) {
    this.all[this.currentId].points = points
  }
  @Mutation
  deleteSelectedPoints () {
    store.commit('setCurrentPoints', this.all[this.currentId].points.filter(p => !p.selected))
  }
  @Mutation
  addCenterPoint () {
    this.all[this.currentId].points.push({ x: 50, y: 50, selected: false })
  }
}
