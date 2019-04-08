// pack npm modules into one file
const fs = require('fs');
const babel = require('babel-core');
const browserify = require('browserify');
const babelify = require('babelify');
const babelOptions = {
  presets: [require('babel-preset-es2015')],
  plugins: [require('babel-plugin-transform-remove-console')],
  ast: false,
  babelrc: false,
};

const modulePath = require.resolve('yup');
const moduleName = 'yup';

browserify({ ignoreMissing: true, standalone: moduleName })
  .transform(babelify, {
    global: true,
    presets: [require('babel-preset-es2015')],
    plugins: [require('babel-plugin-transform-remove-console')],
    ast: false,
    babelrc: false,
    compact: true,
  })
  .require(modulePath, { entry: true })
  .bundle((err, buf) => {
    if (err) return reject(err);
    const code = `
              (function () {
                var module = {
                  exports: { }
                };
                var exports = module.exports;
                ${buf.toString()}
                return module
            })()`;
    fs.writeFile(__dirname + '/yup-bundle.js', code, { flag: 'wx' }, function(
      err,
    ) {
      if (err) throw err;
      console.log('yup-bundle.js is saved!');
    });
    // require('fs').writeFileSync(__dirname + '/yup-bundle.js', code);
  })
  .on('error', err => {
    console.error('Error: ', err.message);
  });
