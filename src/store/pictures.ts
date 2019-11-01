// See https://championswimmer.in/vuex-module-decorators/
import { Module, Mutation, VuexModule } from 'vuex-module-decorators'
import store from '@/store'

@Module({ dynamic: true, store, name: 'pictures' })
export default class Pictures extends VuexModule {
  selected: number = 0
  names: string[] = [
    'petanque',
    'boats',
    'honeycomb',
    'spider',
    'wolves',
    'bazzania'
  ]

  get srcs () {
    return (width: number): string[] =>
      this.names.map(name => `https://github.com/severo/pictures/raw/master/images,w_${width}/${name}.jpg`)
  }

  @Mutation
  select (idx: number) {
    this.selected = idx
  }
}
