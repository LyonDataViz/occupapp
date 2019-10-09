import { writable } from 'svelte/store'
import { preferences } from './preferences.js'

export const init = {
  imageName: preferences.imageName,
  points: [],
}

export const imageName = writable(init['imageName'])
export const points = writable(init['points'])
