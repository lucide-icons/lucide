import App from './App.js?raw'
import Button from './Button.jsx?raw'
import { preactFiles } from '../files'

const files = {
  'App.js': {
    code: App,
    hidden: true
  },
  'Button.jsx': {
    code: Button,
    active: true,
    readOnly: false,
  },
  ...preactFiles
}

export default files
