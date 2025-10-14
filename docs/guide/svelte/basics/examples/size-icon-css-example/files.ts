import App from './App.svelte?raw'
import styles from '../styles.css?raw'
import IconCss from './icon.css?raw'
import AppVue from '../../../../vue/basics/examples/size-icon-css-example/App.vue?raw'

const files = {
  'src/icon.css': {
    code: IconCss,
    readOnly: false,
    active: true,
    eadOnly: true
  },
  'src/App.svelte': {
    code: App,
    active: true,
    readOnly: true
  },
  'src/App.vue': {
    code: AppVue,
    hidden: true
  },
  'src/styles.css': {
    code: styles,
    hidden: true
  },
}

export default files
