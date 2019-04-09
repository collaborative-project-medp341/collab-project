const {src, dest} = require(`gulp`)
const CSScompiler = require(`gulp-sass`)

const compileCSSForDev = () => {
return src([
        `./app/sass/*.scss`,
        `./app/sass/**/*.scss`])
        .pipe(CSScompiler({
            outputStyle: `expanded`,
            precision: 10,
        }))
        .on(`error`, CSScompiler.logError)
        .pipe(dest(`./app/temp/css`))
}
module.exports = compileCSSForDev