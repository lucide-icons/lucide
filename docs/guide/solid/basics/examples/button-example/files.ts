import App from './App.jsx?raw'
import AppReact from '../../../../react/basics/examples/button-example/App.js?raw'
import ButtonReact from '../../../../react/basics/examples/button-example/Button.jsx?raw'
import Button from './Button.jsx?raw'
import styles from '../styles.css?raw'

const files = {
  'App.js': {
    code: AppReact,
    hidden: true
  },
  'Button.jsx': {
    code: ButtonReact,
    active: true,
    readOnly: true,
  },
  'styles.css': {
    code:styles,
    hidden: true
  },
}

export default files
