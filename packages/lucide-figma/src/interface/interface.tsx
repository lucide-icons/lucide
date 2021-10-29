import React, { ChangeEvent, useEffect, useMemo, useState } from 'react'
import ReactDOM from 'react-dom'
import IconButton from '../components/IconButton'
import SearchInput from '../components/SearchInput'
import theme from '../theme'
// import './interface.css'
// import tags from '../../../../tags.json'
// import * as iconComponents from 'lucide-react'
import { toPascalCase } from '../helpers/naming';
// import useSearch from '../hooks/useSearch';
import { getIcons } from '../api/fetchIcons'
import './interface.scss'
import useSearch, { Icon } from '../hooks/useSearch'
import { createReactComponent } from 'lucide-react'

const ICONS = [];

function App() {
  const [query, setQuery] = useState('')
  const [icons, setIcons] = useState<Icon[]>([])
  const [tags, setTags] = useState({})
  const [version, setVersion ] = useState('')

  const searchResults = useMemo(() => useSearch(icons, tags, query), [icons, query])

  const getLatestIcons = async () => {
    const lucideIcons = await getIcons()

    setIcons(Object.entries(lucideIcons.iconNodes))
    setTags(lucideIcons.tags)
    setVersion(lucideIcons.version)
  }

  useEffect(() => {
    getLatestIcons()
  }, [])

  return (
    <div>
      <SearchInput
        value={query}
        iconCount={icons.length}
        onChange={(event)  => setQuery(event.target.value)}
      />
      <main>
        <div className='icon-grid'>
          {searchResults.map(([name, iconNode] :any) => (
            <IconButton
              name={name}
              key={name}
              component={createReactComponent(name, iconNode)}
            />
          ))}
        </div>
        <footer>
          <a
            href="https://lucide.dev"
            target="_blank"
            className='footer-link'
          >
            Lucide v{version}
          </a>
        </footer>
      </main>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
