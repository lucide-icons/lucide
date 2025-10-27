import App from './App.jsx?raw'
import styles from '../styles.css?raw'
import AppReact from '../../../../react/basics/examples/stroke-width-icon/App.js?raw'

const files = {
  'App.jsx': {
    code: App,
    active: true,
  },
  'App.js': {
    code: AppReact,
    hidden: true
  },
  'styles.css': {
    code:styles,
    hidden: true
  },
}

export default files
