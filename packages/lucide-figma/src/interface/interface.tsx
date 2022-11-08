import { useEffect, useMemo, useState } from 'react'
import ReactDOM from 'react-dom'
import * as views from '../views'

type Views = typeof views

import useSearch, { Icon } from '../hooks/useSearch'

import { getIcons, iconFetchListener, LucideIcons } from '../api/fetchIcons'
import './interface.scss'
import Menu from '../components/Menu'

function App() {
  const [page, setPage] = useState('icons')
  const [query, setQuery] = useState('')
  const [icons, setIcons] = useState<Icon[]>([])
  const [tags, setTags] = useState({})
  const [version, setVersion ] = useState('')

  const searchResults = useMemo(() => useSearch(icons, tags, query), [icons, query])

  const handleFetchResponse = async (lucideIcons: LucideIcons) => {
    const icons = Object.entries(lucideIcons.iconNodes)

    setIcons(icons)
    setTags(lucideIcons.tags)
    setVersion(lucideIcons.version)
  }

  useEffect(() => {
    const removeListener = iconFetchListener(handleFetchResponse)

    return removeListener
  }, [])

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
