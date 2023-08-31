import App from './App.js?raw'
import styles from '../styles.css?raw'
import getRandomColor from './getRandomColor.js?raw'

const files = {
  'App.js': {
    code: App,
    active: true,
  },
  'styles.css': {
    code:styles,
    hidden: true
  },
  'getRandomColor.js': {
    code: getRandomColor,
    hidden: true
  },
}

export default files
