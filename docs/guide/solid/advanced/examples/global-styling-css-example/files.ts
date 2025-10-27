import App from './App.jsx?raw'
import AppReact from '../../../../react/advanced/examples/global-styling-css-example/App.js?raw'
import styles from '../../../basics/examples/styles.css?raw'
import IconCss from './icon.css?raw'

const files = {
  'icon.css': {
    code: IconCss,
    readOnly: false,
    active: true,
  },
  'App.jsx': {
    code: App,
    readOnly: true,
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
