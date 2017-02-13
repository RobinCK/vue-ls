const fs = require('fs');
const path = require('path');
const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const version = process.env.VERSION || require('./package.json').version;

let banner = `/*!
 * vue-ls.js ${version}
 * (c) ${new Date().getFullYear()} Igor Ognichenko <igor.ognichenko@gmail.com>
 * Released under the MIT License.
 */
`;

rollup.rollup({
  entry: path.resolve(__dirname, 'src/index.js'),
  plugins: [babel()]
}).then(bundle => {
  return write(path.join(__dirname, 'dist/vue-ls.js'), bundle.generate({
    format: 'umd',
    banner: banner,
    moduleName: 'vueLS'
  }).code);
})
.then(() => {
  console.log('vue-ls.js v' + version + ' builded');
})
.catch(console.log);

function getSize (code) {
  return (code.length / 1024).toFixed(2) + 'kb';
}

function blue (str) {
  return '\x1b[1m\x1b[34m' + str + '\x1b[39m\x1b[22m';
}

function write (dest, code) {
  return new Promise(function (resolve, reject) {
    fs.writeFile(dest, code, function (err) {
      if (err) {
        return reject(err);
      }

      console.log(blue(dest) + ' ' + getSize(code));
      resolve();
    });
  });
}
