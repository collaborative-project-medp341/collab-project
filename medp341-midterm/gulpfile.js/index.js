const { series } = require('gulp')

//gulp tasks 
exports.compileCSSForDev = require('./tasks/css-compiler-dev')
exports.compileCSSForProd = require('./tasks/css-compiler-prod')
exports.compileHTMLForProd = require(`./tasks/html-compiler-prod`)
exports.compileJSForProd = require('./tasks/js-compiler-prod')
exports.compileJSForDev = require('./tasks/js-compiler-dev')
exports.validateHTML = require(`./tasks/validateHTML`)
exports.serve = require(`./tasks/serve`)
exports.lintJS = require(`./tasks/lint-js`)
//gulp build 
exports.build = series(
    require('./tasks/css-compiler-prod'),
    require(`./tasks/html-compiler-prod`),
    require(`./tasks/lint-js`),
    require('./tasks/js-compiler-prod'),
)

//gulp default 
exports.default = series(
    require(`./tasks/validateHTML`),
    require('./tasks/css-compiler-dev'),
    require('./tasks/js-compiler-dev'),
    require(`./tasks/serve`)
)