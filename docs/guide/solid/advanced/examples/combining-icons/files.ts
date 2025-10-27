import App from './App.jsx?raw'
import AppReact from '../../../../react/advanced/examples/combining-icons/App.js?raw'
import styles from '../../../basics/examples/styles.css?raw'

const files = {
  'App.jsx': {
    code: App,
    active: true,
    readOnly: true,
  },
  'App.js': {
    code: AppReact,
    hidden: true
  },
  'styles.css': {
    code: styles,
    hidden: true
  },
}

export default files
