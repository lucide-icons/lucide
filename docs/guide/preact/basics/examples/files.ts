import index from './index.js?raw'
import packageJson from './package.json?raw'
import indexHtml from './index.html?raw'
import styles from './styles.css?raw'

export const preactFiles = {
  'index.js': {
    code: index,
    hidden: true
  },
  'package.json': {
    code: packageJson,
    hidden: true
  },
  'index.html': {
    code: indexHtml,
    hidden: true
  },
  'styles.css': {
    code:styles,
    hidden: true
  },
}
