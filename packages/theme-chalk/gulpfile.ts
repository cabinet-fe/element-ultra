import path from 'path'
// import chalk from 'chalk'
import { src, dest, parallel } from 'gulp'
// import gulpSass from 'gulp-sass'
// import dartSass from 'sass'
// import autoprefixer from 'gulp-autoprefixer'
// import cleanCSS from 'gulp-clean-css'
// import rename from 'gulp-rename'
import { epOutput } from '../../gulpfile/utils/paths'

const distFolder = path.resolve(__dirname, 'dist')
const distBundle = path.resolve(epOutput, 'theme-chalk')

/**
 * compile theme-chalk scss & minify
 * not use sass.sync().on('error', sass.logError) to throw exception
 * @returns
 */
// function buildThemeChalk() {
//   const sass = gulpSass(dartSass)
//   const noElPrefixFile = /(index|base|display)/
//   return src(path.resolve(__dirname, 'src/*.scss'))
//     .pipe(sass.sync())
//     .pipe(autoprefixer({ cascade: false }))
//     .pipe(cleanCSS({}, details => {}))
//     .pipe(
//       rename(path => {
//         if (!noElPrefixFile.test(path.basename)) {
//           path.basename = `el-${path.basename}`
//         }
//       })
//     )
//     .pipe(dest(distFolder))
// }

/**
 * Build dark Css Vars
 * @returns
 */
// function buildDarkCssVars() {
//   const sass = gulpSass(dartSass)
//   return src(path.resolve(__dirname, 'src/dark/css-vars.scss'))
//     .pipe(sass.sync())
//     .pipe(autoprefixer({ cascade: false }))
//     .pipe(cleanCSS({}, details => {}))
//     .pipe(dest(`${distFolder}/dark`))
// }

/**
 * copy from packages/theme-chalk/dist to dist/element-ultra/theme-chalk
 */
export function copyThemeChalkBundle() {
  return src(`${distFolder}/**`).pipe(dest(distBundle))
}

/**
 * copy source file to packages
 */

export function copyThemeChalkSource() {
  return src(path.resolve(__dirname, 'src/**')).pipe(
    dest(path.resolve(distBundle, 'src'))
  )
}

export const build = parallel(
  copyThemeChalkSource,
  // series(buildThemeChalk, buildDarkCssVars, copyThemeChalkBundle)
)

export default build
