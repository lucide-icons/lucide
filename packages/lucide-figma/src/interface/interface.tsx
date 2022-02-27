import { useEffect, useMemo, useState } from 'react'
import ReactDOM from 'react-dom'
import * as views from '../views'

type Views = typeof views

import useSearch, { Icon } from '../hooks/useSearch'

import { getIcons } from '../api/fetchIcons'
import './interface.scss'
import Menu from '../components/Menu'

function App() {
  const [page, setPage] = useState('icons')
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

  if(!icons.length) {
    return null
  }

  const View = views?.[page as keyof Views] ?? views.icons

  return (
    <div>
      <Menu page={page} setPage={setPage}/>
      <View
        {...{
          query,
          setQuery,
          searchResults,
          icons,
          version
        }}
      />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
