const { watch } = require(`gulp`)
const browserSync = require(`browser-sync`)
const reload = browserSync.reload

const serve = () => {
    browserSync({
        notify: true,
        reloadDelay: 100,
        server: {
            baseDir: [`app/uncompressed-html`]
        }
    })

    watch([
        `./app/uncompressed-html/**/*.html`,
        `./app/uncompressed-html/**/*.html`,
    ])
    .on(`change`, reload)
}

module.exports = serve 


