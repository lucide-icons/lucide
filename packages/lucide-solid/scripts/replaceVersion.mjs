import fs from 'fs'
import path from 'path'

import pkg from '../package.json' assert { type: 'json' };

const fileContents = fs.readFileSync(path.resolve('dist/lucide-solid.js'), 'utf-8');

const newFileContents = fileContents.replace('{{version}}', pkg.version)

fs.writeFileSync(path.resolve('dist/lucide-solid.js'), newFileContents, 'utf-8')
