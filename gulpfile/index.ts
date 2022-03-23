import { series } from 'gulp'

import clean from './clean'
import buildModules from './build-modules'

export default series(clean, buildModules)
