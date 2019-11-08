// See https://championswimmer.in/vuex-module-decorators/
import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import store from '@/store'
import { fetchMaxSize } from '@/utils/pictures.ts'

// See https://www.typescriptlang.org/docs/handbook/enums.html
export enum Status {
  LOADING, READY, ERROR
}

export interface Point {
  x: number
  y: number
}

interface Composition {
    id: number;
    pictureId: number;
    pictureWidth: number;
    pictureHeight: number;
    points: Point[];
    status: Status;
}

@Module({ dynamic: true, store, name: 'compositions' })
export default class Compositions extends VuexModule {
  // State - state of truth - meant to be exported as a JSON - init definitions
  all: Composition[] = [
    { id: 0,
      pictureId: 0, // 'petanque',
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
      ],
      status: Status.READY
    }
  ]
  // TODO? add currentByPictureId, keeping the track of the last used composition?
  currentId: number = -1

  // Getters - cached, not meant to be exported
  get count (): number {
    return this.all.length
  }

  get allByPictureId () {
    return (pictureId: number): Composition[] => {
      return this.all.filter((c: Composition): boolean => c.pictureId === pictureId)
    }
  }

  get defaultByPictureId () {
    return (pictureId: number): Composition | undefined => {
      return this.all.find((c: Composition): boolean => c.pictureId === pictureId)
    }
  }

  get current (): Composition | undefined {
    return this.currentId in this.all ? this.all[this.currentId] : undefined
  }

  get currentPictureId (): number {
    return this.current === undefined ? -1 : this.current.pictureId
  }

  // Mutations (synchronous)
  @Mutation
  add (c: Composition) {
    // brittle way to fill the id - how could we improve it?
    c.id = this.all.push(c) - 1
    c.status = Status.READY
    return c
  }
  @Mutation
  setCurrent (id: number) {
    if (id in this.all) {
      this.currentId = id
    }
  }

  // Actions (asynchronous)
  @Action
  async addByPictureId (pictureId: number) {
    // Get the image size
    const { width, height } = await fetchMaxSize(pictureId)
    const c: Composition = {
      id: -1,
      pictureId: pictureId,
      pictureWidth: width,
      pictureHeight: height,
      points: [],
      status: Status.LOADING
    }
    return this.add(c)
  }

  @Action
  async selectDefaultByPictureId (pictureId: number) {
    // Get (or create and get) the default context for image 'pictureId'
    const composition = this.defaultByPictureId(pictureId)
    // Set the current composition
    if (composition !== undefined) {
      this.setCurrent(composition.id)
    } else {
      throw RangeError(`No composition found for pictureId=${pictureId} whereas a new composition should have just been created.`)
    }
  }
}
