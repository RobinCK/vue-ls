import babel from 'rollup-plugin-babel';
import {uglify} from 'rollup-plugin-uglify';
import localResolve from 'rollup-plugin-local-resolve';

export default {
  input: 'src/index.js',
  plugins: [
    localResolve(),
    babel({
      babelrc: false,
      presets: [
        ["@babel/preset-env", {
          modules: false,
          targets: {
            browsers: [
              "> 1%",
              "Chrome >= 14",
              "Safari >= 4",
              "Firefox >= 4",
              "Opera >= 10",
              "Edge >= 41",
              "ie >= 9",
              "iOS >= 6",
              "ChromeAndroid >= 4",
              "OperaMobile >= 12"
            ]
          }
        }]
      ],
      runtimeHelpers: true,
      externalHelpers: false,
      exclude: 'node_modules/**',
    }),
    (process.env.NODE_ENV === 'production' && uglify())
  ],
  output: {
    file: process.env.NODE_ENV === 'production' ? 'dist/vue-ls.min.js' : 'dist/vue-ls.js',
    format: 'umd',
    name: 'VueStorage',
  }
};
