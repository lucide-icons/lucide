import App from './App.svelte?raw'
import styles from '../../../basics/examples/styles.css?raw'
import AppVue from '../../../../vue/advanced/examples/combining-icons-notification/App.vue?raw'

const files = {
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
