import { series, parallel } from 'gulp'
import clean from './clean'
import buildModules from './build-modules'
import genDefinitions from './gen-definitions'
import buildHelper from './helper'
import buildTheme from './build-theme'
import copyFiles from './copy-files'

export default series(
  clean, // 清空

  parallel(
    buildModules, // 构建packages中的模块
    genDefinitions,
    buildHelper, // 构建帮助信息
    buildTheme // 样式主题构建
  ),

  copyFiles // 拷贝常用文件
)
