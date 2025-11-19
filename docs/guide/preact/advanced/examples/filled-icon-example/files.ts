import App from './App.js?raw'
import IconCss from './icon.css?raw'
import { preactFiles } from '../../../basics/examples/files'

const files = {
  'App.js': {
    code: App,
    active: true,
  },
  'icon.css': {
    code: IconCss,
    readOnly: false,
  },
  ...preactFiles
}

export default files
