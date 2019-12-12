// See https://championswimmer.in/vuex-module-decorators/
import { Module, Mutation, VuexModule } from 'vuex-module-decorators'
import store from '@/store'

@Module({ dynamic: true, store, name: 'settings', namespaced: true })
export default class Settings extends VuexModule {
  // State - state of truth - meant to be exported as a JSON - init definitions

  showImageColors: boolean = false

  // Mutations (synchronous)
  @Mutation
  setShowImageColors (value: boolean) {
    this.showImageColors = value
  }
}
