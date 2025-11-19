import App from './App.js?raw'
import styles from '../styles.css?raw'
import { preactFiles } from '../files'

const files = {
  'App.js': {
    code: App,
    active: true,
  },
  ...preactFiles
}

export default files
