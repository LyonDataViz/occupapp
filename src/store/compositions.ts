// See https://championswimmer.in/vuex-module-decorators/
import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import store from '@/store'

export interface Composition {
    id: number;
    pictureId: number;
    pictureWidth: number;
    pictureHeight: number;
}

@Module({ dynamic: true, store, name: 'compositions', namespaced: true })
export default class Compositions extends VuexModule {
  // State - state of truth - meant to be exported as a JSON - init definitions

  // Currently: 1-to-1 correspondance between pictures and compositions
  // TODO allow various compositions for a given picture?
  all: Composition[] = [
    { id: 0,
      pictureId: 0, // 'petanque'
      pictureWidth: 2620,
      pictureHeight: 1745
      // points: [
      //   { x: 50.1, y: 60.5 },
      //   { x: 36.5, y: 87.4 },
      //   { x: 17.9, y: 73.0 },
      //   { x: 28.2, y: 36.6 },
      //   { x: 49.9, y: 36.5 },
      //   { x: 76.2, y: 27.9 },
      //   { x: 87.9, y: 35.9 }
      // ]
    },
    { id: 1,
      pictureId: 1, // 'boats'
      pictureWidth: 3992,
      pictureHeight: 2992
    },
    { id: 2,
      pictureId: 2, // 'honeycomb'
      pictureWidth: 2901,
      pictureHeight: 2176
    },
    { id: 3,
      pictureId: 3, // 'spider'
      pictureWidth: 1925,
      pictureHeight: 1444
    },
    { id: 4,
      pictureId: 4, // 'wolves'
      pictureWidth: 2208,
      pictureHeight: 1500
    },
    { id: 5,
      pictureId: 5, // 'bazzania'
      pictureWidth: 1936,
      pictureHeight: 1288
      // points: [
      //   { x: 50, y: 40 },
      //   { x: 50, y: 60 },
      //   { x: 40, y: 50 },
      //   { x: 60, y: 50 }
      // ]
    }, { id: 6,
      pictureId: 6, // 'basketball'
      pictureWidth: 2362,
      pictureHeight: 1533

    }, { id: 7,
      pictureId: 7, // 'beach'
      pictureWidth: 3511,
      pictureHeight: 1975

    }, { id: 8,
      pictureId: 8, // 'cuzco'
      pictureWidth: 2376,
      pictureHeight: 1584

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
  // Actions
  @Action
  setCurrentByPictureId (pictureId: number) {
    if (!(pictureId in this.all)) {
      throw new Error(`No composition in "all" for pictureId ${pictureId}. There should be exactly one.`)
    }
    this.setCurrent(this.all[pictureId].id)
  }
}
