import App from './App.js?raw'
import { preactFiles } from '../files.ts'

const files = {
  'App.js': {
    code: App,
    active: true,
  },
  ...preactFiles
}

export default files
