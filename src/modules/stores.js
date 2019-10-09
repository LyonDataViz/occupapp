import { writable } from 'svelte/store'
import { preferences } from './preferences.js'

export const init = {
  imageName: preferences.imageName,
}

export const imageName = writable(init['imageName'])
