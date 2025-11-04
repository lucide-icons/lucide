import App from './App.js?raw'
import styles from '../styles.css?raw'
import IconCss from './icon.css?raw'

const files = {
  'icon.css': {
    code: IconCss,
    readOnly: false,
    active: true,
  },
  'App.js': {
    code: App,
  },
  'styles.css': {
    code:styles,
    hidden: true
  },

}

export default files
