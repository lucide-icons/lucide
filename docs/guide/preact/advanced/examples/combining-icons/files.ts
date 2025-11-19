import App from './App.js?raw'
import { preactFiles } from '../../../basics/examples/files'

const files = {
  'App.js': {
    code: App,
    active: true,
  },
  ...preactFiles
}

export default files
