import { series, parallel } from 'gulp'

import clean from './clean'
import buildModules from './build-modules'
import genDefinitions from './gen-definitions'
import buildHelper from './helper'
import buildTheme from './build-theme'
import copyFiles from './copy-files'

export default series(
  clean,

  parallel(
    buildModules,
    // genDefinitions,
    // buildHelper,
    // buildTheme
  ),

  // copyFiles
)
