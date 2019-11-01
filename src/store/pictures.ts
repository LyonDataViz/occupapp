// See https://championswimmer.in/vuex-module-decorators/
import { Module, Mutation, VuexModule } from 'vuex-module-decorators'
import store from '@/store'

@Module({ dynamic: true, store, name: 'pictures' })
export default class Pictures extends VuexModule {
  selected: number = 0

  @Mutation
  select (idx: number) {
    this.selected = idx
  }
}
