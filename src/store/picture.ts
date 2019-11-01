// See https://championswimmer.in/vuex-module-decorators/
import { Module, Mutation, VuexModule } from 'vuex-module-decorators'
import store from '@/store'

@Module({ dynamic: true, store, name: 'picture' })
export default class Picture extends VuexModule {
  idx: number = 0

  @Mutation
  updateIdx (idx: number) {
    this.idx = idx
  }
}
