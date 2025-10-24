import App from './App.svelte?raw'
import styles from '../../../basics/examples/styles.css?raw'
import AppVue from '../../../../vue/advanced/examples/filled-icon-example/App.vue?raw'
import IconCss from './icon.css?raw'

const files = {
  'src/App.svelte': {
    code: App,
    active: true,
    readOnly: true
  },
  'src/icon.css': {
    code: IconCss,
    readOnly: false,
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
