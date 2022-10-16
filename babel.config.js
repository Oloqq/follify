/**
 * This is needed for testing with jest
 * https://jestjs.io/docs/getting-started#using-babel
 * DO NOT convert to ES even if vscode tells you to do so, unless you want jest to stop working
 */
module.exports = {
  presets: [
    ['@babel/preset-env', {targets: {node: 'current'}}],
    '@babel/preset-typescript',
  ],
};