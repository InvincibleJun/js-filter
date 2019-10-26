import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import { uglify } from "rollup-plugin-uglify";

const isDev = process.env.NODE_ENV === 'development';

const devPlugins = () => [
    livereload({
        port: 30000,
        watch: 'dist',
        verbose: false
    }),

    serve({
        host: 'localhost',
        open: false,
        port: 10006,
        contentBase: ['dist']
    })
];

export default {
    input: 'src/index.ts',

    output: {
        file: 'dist/index.js',
        format: 'umd',
        name: 'JsFilter'
    },

    watch: {
        exclude: 'node_modules/**'
    },

    plugins: [
        resolve({
            extensions: ['.ts', '.js']
        }),
        babel({
            exclude: 'node_modules/**',
            extensions: ['.js', '.ts']
        }),
        uglify(),
        ...(isDev ? devPlugins() : [])
    ]
};
