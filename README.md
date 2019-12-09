# Occupapp

[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

Discover the space occupation of agents in a scene.

https://occupapp.now.sh/

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

- release a new version

  ```
  npm run release
  ```

  and edit [VERSIONS.md](./VERSIONS.md).

Build upon Vue.js, see [Configuration Reference](https://cli.vuejs.org/config/).
Use `vue upgrade` to keep your dependencies up to date (possibly after upgrading
Vue CLI with `npm install -g @vue/cli`). Other dependencies might be updated
directly with `npm`, taking care not to break the ones managed by Vue CLI (in
particular, by now, Vue CLI dependencies require ESLint 5, so don't upgrade to
ESLint 6).

To lint with Atom Editor, install linter-eslint, add
`, source.ts, text.html.vue` to the "List of scopes", and unselect "Lint HTML
files". Note that I don't know how to get Typescript linting in Atom: I just
launch `npm run serve`, and see the result of the type checking done through
Webpack. Some references:

- https://alligator.io/vuejs/vue-eslint-plugin/
- https://github.com/vuejs/eslint-plugin-vue/issues/371#issuecomment-364652923

The Vue components are developed as TypeScript classes. See:

- https://vuejs.org/v2/guide/typescript.html#Basic-Usage
- https://github.com/vuejs/vue-class-component/blob/master/example/src/App.vue
- https://github.com/kaorun343/vue-property-decorator

The Vuex stores are dynamic modules, and use Typescript. See
https://championswimmer.in/vuex-module-decorators/.

## Documentation

Project developed for the [LIRIS M2i project](https://projet.liris.cnrs.fr/mi2/)
by Sylvain Lesage with Celia Gremillet, Philippe Rivière, Gabin Rolland,
Aurélien Tabard and Romain Vuillemot.
