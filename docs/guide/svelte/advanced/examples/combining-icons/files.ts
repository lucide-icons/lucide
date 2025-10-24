import App from './App.svelte?raw'
import styles from '../../../basics/examples/styles.css?raw'
import AppVue from '../../../../vue/advanced/examples/combining-icons/App.vue?raw'

const files = {
  'src/App.svelte': {
    code: App,
    active: true,
    readOnly: true
  },
  'src/App.vue': {
    code: AppVue,
    active: true,
  },
  'src/styles.css': {
    code: styles,
    hidden: true
  },
}

export default files
