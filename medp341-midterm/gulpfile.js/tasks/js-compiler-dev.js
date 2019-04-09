const {src, dest} = require(`gulp`)
const babel = require(`gulp-babel`);

const compileJSForDev = () => {
    return src([
        `./app/uncompressed-js/*.js`,
        `./app/uncompressed-js/**/*.js`])
        .pipe(babel({
			presets: ['@babel/preset-env']
		}))
        .pipe(dest(`./app/temp/scripts`))

}

module.exports = compileJSForDev