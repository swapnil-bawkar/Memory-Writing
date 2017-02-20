/**
 * Created by Swapnil Bawkar on 9/28/2015.
 */

var src = './src/';
var dist = './dist/';
var appDir = src + 'app/';

module.exports = {
    src: src,
    dist: dist,
    appDir: appDir,
    bundleName: 'bundle.js',
    bundleDestination: dist + 'js/',
    appFile: appDir + 'app.js',
    appIndexFile: src + 'index.html',
    sassDir: src + 'sass/',
    distCssPath: dist + 'css/',
    configRbPath: src + 'config.rb',
    imagePath: src + 'img/**/*',
    imageDistPath: dist + 'img/',
    materialCss: './node_modules/angular-material/angular-material.min.css'
};