import fs from 'fs'
import path from 'path'
import pkg from '../packages/element-ultra/package.json' // need to be checked
import { fileURLToPath } from 'url'
const tagVer = process.env.TAG_VERSION
let version = ''

const __dirname = fileURLToPath(new URL('.', import.meta.url))

if (tagVer) {
  version = tagVer.startsWith('v') ? tagVer.slice(1) : tagVer
} else {
  version = pkg.version
}

fs.writeFileSync(
  path.resolve(__dirname, '../packages/element-ultra/version.ts'),
  `export const version = '${version}'
`
)
