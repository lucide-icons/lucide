import App from './App.js?raw'
import styles from '../../../basics/examples/styles.css?raw'
import IconCss from './icon.css?raw'

const files = {
  'App.js': {
    code: App,
    active: true,
  },
  'icon.css': {
    code: IconCss,
    readOnly: false,
  },
  'styles.css': {
    code: styles,
    hidden: true
  },
}

export default files
