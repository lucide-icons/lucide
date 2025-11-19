import App from './App.js?raw'
import IconCss from './icon.css?raw'
import { preactFiles } from '../files'

const files = {
  'icon.css': {
    code: IconCss,
    readOnly: false,
    active: true,
  },
  'App.js': {
    code: App,
  },
  ...preactFiles
}

export default files
