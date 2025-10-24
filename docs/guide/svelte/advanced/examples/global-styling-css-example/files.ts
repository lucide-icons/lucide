import App from './App.svelte?raw'
import styles from '../../../basics/examples/styles.css?raw'
import AppVue from '../../../../vue/advanced/examples/global-styling-css-example/App.vue?raw'
import IconCss from './icon.css?raw'

const files = {
  'src/icon.css': {
    code: IconCss,
    readOnly: false,
    active: true,
  },
  'src/App.svelte': {
    code: App,
    readOnly: true
  },
  'src/App.vue': {
    code: AppVue,
    hidden: true
  },
  'src/styles.css': {
    code:styles,
    hidden: true
  },
}

export default files
