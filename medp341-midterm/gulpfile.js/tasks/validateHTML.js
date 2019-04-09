const { src } = require(`gulp`)
const htmlValidator = require(`gulp-html`)

const validateHTML = () => {
    return src([
        `./app/uncompressed-html/*.html`,
        `./app/uncompressed-html/**/*.html`])
        .pipe(htmlValidator())
}

module.exports = validateHTML