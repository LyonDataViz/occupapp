# Occupapp

Discover the space occupation of agents in a scene.

https://occupapp.severo1.now.sh/

## Install

- install

  ```
  npm install
  ```

- build and serve locally (with hot-reloads) for development:

  ```
  npm run serve
  ```

  It will watch for changes in the src/ directory. Note: currently it doesn't
  watch for changes in index.html and favicon.ico, due to
  https://github.com/vladshcherbin/rollup-plugin-copy/issues/5

- deploy to now.sh:

  ```
  npm run deploy
  ```

Other targets:

- compile and minify for production

  ```
  npm run build
  ```

- run your unit tests

  ```
  npm run test:unit
  ```

- lint and fix files

  ```
  npm run lint
  ```

Build upon Vue.js, see [Configuration Reference](https://cli.vuejs.org/config/).

To lint with Atom Editor, install linter-eslint, add
`, source.ts, text.html.vue` to the List of scope, uncomment Lint HTML files:

- https://alligator.io/vuejs/vue-eslint-plugin/
- https://github.com/vuejs/eslint-plugin-vue/issues/371#issuecomment-364652923

## Documentation

Project developed for the [LIRIS M2i project](https://projet.liris.cnrs.fr/mi2/)
by Sylvain Lesage with Celia Gremillet, Philippe Rivière, Gabin Rolland,
Aurélien Tabard and Romain Vuillemot.
