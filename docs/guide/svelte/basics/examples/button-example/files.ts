import App from './App.svelte?raw'
import styles from '../styles.css?raw'
import AppVue from '../../../../vue/basics/examples/button-example/App.vue?raw'

const files = {
  'src/App.svelte': {
    code: App,
    active: true,
    readOnly: true
  },
  'src/App.vue': {
    code: AppVue,
    active: true,
    hidden: true
  },
  'src/styles.css': {
    code:styles,
    hidden: true
  },

}

export default files
