// See https://championswimmer.in/vuex-module-decorators/
import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import store from '@/store'
import uuid from 'uuid'

export interface XYPoint {
  id: string;
  x: number;
  y: number;
}

export interface PointWithoutId {
  x: number;
  y: number;
  categoryId: string;
}

export interface Point extends PointWithoutId {
  id: string;
  number: number;
}

function random10To90 () {
  return Math.random() * 80 + 10
}

@Module({ dynamic: true, store, name: 'points', namespaced: true })
export default class Points extends VuexModule {
  // IMPORTANT. We use a hack to add Vue reactivity to Map and Set objects
  // See https://stackoverflow.com/a/45441321/7351594

  // State - state of truth - meant to be exported as a JSON - init definitions
  list: Map<string, Point> = new Map()
  listChangeTracker: number = 1
  nextNumber = 1

  // Getters - cached, not meant to be exported
  get asMap (): Map<string, Point> {
    // By using `listChangeTracker` we tell Vue that this property depends on it,
    // so it gets re-evaluated whenever `listChangeTracker` changes - HACK
    return this.listChangeTracker ? this.list : this.list
  }
  get asArray (): Point[] {
    return [...this.asMap.values()]
  }
  get size (): number {
    return this.asMap.size
  }
  get get (): (id:string) => Point | undefined {
    return (id:string): Point | undefined => this.asMap.get(id)
  }
  // USE?
  // get keys (): IterableIterator<string> {
  //   return this.asMap.keys()
  // }
  // get values (): IterableIterator<Point> {
  //   return this.asMap.values()
  // }
  // get has (): (id:string) => boolean {
  //   return (id:string): boolean => this.asMap.has(id)
  // }

  // Mutations (synchronous)
  @Mutation
  fromMap (list: Map<string, Point>) {
    this.list = list
    // Trigger Vue updates
    this.listChangeTracker += 1
  }
  @Mutation
  set (point: Point) {
    this.list.set(point.id, point)
    this.listChangeTracker += 1
  }
  @Mutation
  delete (id: string) {
    this.list.delete(id)
    this.listChangeTracker += 1
  }
  @Mutation
  incrementNextNumber () {
    this.nextNumber += 1
  }
  // Actions
  // Important: actions only receive 1 argument (payload). If you want to
  // receive various arguments -> fields of an Object
  @Action
  fromArray (list: Point[]) {
    this.fromMap(new Map(list.map(p => [p.id, p])))
  }
  @Action
  clear () {
    this.fromMap(new Map())
  }
  @Action
  post (p: PointWithoutId) {
    this.set({ id: uuid.v4(), ...p, number: this.nextNumber })
    this.incrementNextNumber()
  }
  @Action
  deleteSet (ids: Set<string>) {
    const newList: Map<string, Point> = new Map(this.asMap)
    for (const id of ids) {
      newList.delete(id)
    }
    this.fromMap(newList)
  }
  @Action
  setXY ({ id, x, y }: XYPoint) {
    const point = this.asMap.get(id)
    if (point === undefined) {
      throw RangeError(`There is no point id=${id} in the list`)
    } else {
      this.set({ ...point, x, y })
    }
  }
  @Action
  postCenter (categoryId: string) {
    this.post({ x: 50, y: 50, categoryId })
  }
  @Action
  postRandom (categoryId: string) {
    this.post({ x: random10To90(), y: random10To90(), categoryId })
  }
}
