import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';

export default {
  input: 'src/index.js',
  plugins: [
    babel({
      babelrc: true,
      runtimeHelpers: true,
      externalHelpers: false,
      exclude: 'node_modules/**',
    }),
    (process.env.NODE_ENV === 'production' && uglify())
  ],
  output: {
    file: process.env.NODE_ENV === 'production' ? 'dist/vue-ls.min.js' : 'dist/vue-ls.js',
    format: 'umd',
    name: 'VueLocalStorage',
  }
};
