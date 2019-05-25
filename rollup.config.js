
import vue from 'rollup-plugin-vue'
import babel from 'rollup-plugin-babel'
import flow from 'rollup-plugin-flow-no-whitespace'
import cjs from 'rollup-plugin-commonjs'
import node from 'rollup-plugin-node-resolve'
import pkg from './package.json';
import css from 'rollup-plugin-css-only'
const external = ['@ledecmf/editor-core', 'vue', 'core-js', 'codemirror']
const extensions = ['.js', '.vue']
const isProduction = !process.env.ROLLUP_WATCH
const globals = {vue: 'Vue'}


const plugins = [
    css(),
    flow(),
 
    cjs(),
    vue({
        css: false,
        compileTemplate: true,
    }),

    babel({

        runtimeHelpers: true
    }),
]

export default {
    external: function(id) {
        console.log(id);
        id = id.replace(/\\/g, '/')
  
        return !(/^[\.\/]/.test(id) ||
            !/^src\//.test(id))
      

    },
    plugins,
    input: 'src/index.js',
    output: [
        {
            format: 'cjs',
            file: pkg['main']
        },
        {
            format: 'es',
            file: pkg['module']
        }
    ]
}
