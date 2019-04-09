const {src, dest} = require(`gulp`)
const babel = require(`gulp-babel`);
const jsCompressor = require(`gulp-uglify`)

const compileJSForProd = () => {
    return src([
        `./app/uncompressed-js/*.js`,
        `./app/uncompressed-js/**/*.js`])
        .pipe(babel())
        .pipe(jsCompressor())
        .pipe(dest(`./app/prod/scripts`))

}

module.exports = compileJSForProd