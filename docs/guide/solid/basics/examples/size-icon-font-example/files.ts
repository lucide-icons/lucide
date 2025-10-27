import App from './App.jsx?raw'
import styles from '../styles.css?raw'
import IconCss from './icon.css?raw'
import AppReact from '../../../../react/basics/examples/size-icon-font-example/App.js?raw'

const files = {
  'icon.css': {
    code: IconCss,
    readOnly: false,
    active: true,
  },
  'App.jsx': {
    code: App,
    readOnly: true
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
