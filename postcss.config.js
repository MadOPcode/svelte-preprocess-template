const path = require('path');

const srcDir = path.resolve('src');

module.exports = {
  plugins: [
    require('postcss-preset-env')({}),
    require('postcss-assets')({
      cachebuster: true,
      loadPaths: [path.resolve(srcDir, 'assets')]
    })
  ]
};
