import * as meta from './package.json'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import includePaths from 'rollup-plugin-includepaths'
import babel from 'rollup-plugin-babel'
import copy from 'rollup-plugin-copy'
import json from 'rollup-plugin-json'
import svelte from 'rollup-plugin-svelte'
import { terser } from 'rollup-plugin-terser'
import autoPreprocess from 'svelte-preprocess'

const production = !process.env.ROLLUP_WATCH

export default {
  input: 'src/main.js',
  onwarn: function(warning, warn) {
    if (warning.code === 'CIRCULAR_DEPENDENCY') {
      return
    }
    warn(warning)
  },
  output: {
    file: `public/bundle.js`,
    name: '${meta.name}',
    format: 'iife',
    indent: false,
    extend: true,
    banner: `// ${meta.homepage} v${
      meta.version
    } Copyright ${new Date().getFullYear()} ${meta.author.name}`,
    sourcemap: production,
  },
  plugins: [
    resolve({
      mainFields: ['module', 'jsnext:main', 'main'],
    }),
    commonjs(),
    json(),
    includePaths({
      paths: ['./src/'],
      extensions: ['.js', '.json', '.svelte'],
    }),
    svelte({
      // enable run-time checks when not in production
      dev: !production,
      preprocess: autoPreprocess(),
      // we'll extract any component CSS out into
      // a separate file — better for performance
      css: css => {
        css.write('public/bundle.css')
      },
    }),
    copy({
      targets: [
        {
          src: ['src/index.html', 'src/favicon.ico'],
          dest: 'public',
        },
      ],
    }),
    production && babel(),
    production && terser(),
  ],
}
