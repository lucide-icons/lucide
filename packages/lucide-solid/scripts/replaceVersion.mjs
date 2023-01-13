import fs from 'fs'
import path from 'path'

import pkg from '../package.json' assert { type: 'json' };

const files = [
  'dist/source/lucide-solid.js',
  'dist/types/lucide-solid.d.ts'
]

files.forEach((file) => {
  const fileContents = fs.readFileSync(path.resolve(file), 'utf-8');
  const newFileContents = fileContents.replace('{{version}}', pkg.version)

  fs.writeFileSync(path.resolve(file), newFileContents, 'utf-8')
})


