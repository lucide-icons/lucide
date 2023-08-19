import App from './App.js?raw'
import Button from './Button.jsx?raw'
import ButtonCss from './Button.css?raw'
import styles from './styles.css?raw'

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
  'Button.css': {
    code: ButtonCss,
    readOnly: false,
  },
  'styles.css': {
    code:styles,
    hidden: true
  },
}

export default files
