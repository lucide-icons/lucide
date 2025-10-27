import App from './App.jsx?raw'
import AppReact from '../../../../react/advanced/examples/filled-icon-example/App.js?raw'
import styles from '../../../basics/examples/styles.css?raw'
import IconCss from './icon.css?raw'

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
