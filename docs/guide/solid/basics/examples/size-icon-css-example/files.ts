import App from './App.jsx?raw'
import styles from '../styles.css?raw'
import IconCss from './icon.css?raw'
import AppReact from '../../../../react/basics/examples/size-icon-css-example/App.js?raw'

const files = {
  'icon.css': {
    code: IconCss,
    readOnly: false
  },
  'App.jsx': {
    code: App,
    active: true,
    readOnly: true
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
