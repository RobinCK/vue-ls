const fs = require('fs');
const path = require('path');
const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const uglify = require('rollup-plugin-uglify');
const version = process.env.VERSION || require('./package.json').version;

var banner = "/*!\n" +
  "* vue-ls.js " + version + "\n" +
  "* (c) " + (new Date().getFullYear()) + " Igor Ognichenko <igor.ognichenko@gmail.com> \n" +
  "* Released under the MIT License.\n" +
  "*/\n";

var buildConfig = {
  files: {
    'vue-ls.js': [babel()],
    'vue-ls.min.js': [babel(), uglify()]
  },

  writeConfig: {
    format: 'umd',
    banner: banner,
    moduleName: 'vue-ls'
  }
};

for (var file in buildConfig.files) {
  if (!buildConfig.files.hasOwnProperty(file)) {
    continue;
  }

  (function (currentFile) {
    rollup.rollup({
      entry: path.resolve(__dirname, 'src/index.js'),
      plugins: buildConfig.files[file]
    })
      .then(bundle => {
        return write(path.join(__dirname, 'dist/' + currentFile), bundle.generate(buildConfig.writeConfig).code);
      })
      .catch(console.log);
  })(file)
}

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
