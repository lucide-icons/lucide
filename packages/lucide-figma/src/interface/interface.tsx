import React, { useEffect, useMemo } from 'react'
import { Global, jsx } from '@emotion/core'
import ReactDOM from 'react-dom'
import IconButton from '../components/icon-button'
import SearchInput from '../components/search-input'
import theme from '../theme'
// import './interface.css'
// import tags from '../../../../tags.json'
// import * as iconComponents from 'lucide-react'
import { toPascalCase } from '../helpers/naming';
// import useSearch from '../hooks/useSearch';
import useSearch from '../../../../site/src/lib/useSearch';
import fetchIcons from '../api/fetchIcons'

const ICONS = [];

function App() {
  const [query, setQuery] = React.useState('')
  // const icons = ICONS.map(name => {
  //   const componentName = toPascalCase(name);
  //   return {
  //     name,
  //     tags: [],
  //     component:  null
  //   }
  // }).filter(({component}) => !!component)
  const icons: any = []

  const searchResults = useMemo(() => useSearch(icons, query), [icons, query])

  const getIcons = async (event:any) => {
    console.log('on click fetch', event);
    const icons = await fetch('https://unpkg.com/lucide-static@latest/icon-nodes.json')
    const tags = await fetch('https://unpkg.com/lucide-static@latest/tags.json')
    // parent.postMessage({
    //   pluginMessage: {
    //     type: "fetchIcons",
    //   }
    // }, "*")
    console.log(await icons.json());

    console.log(await tags.json());

  }

  useEffect(() => {
    window.onmessage = async (event) => {
      console.log(event, 'interface');

    }
  }, [])

  return (
    <div>
      <Global
        styles={{ body: { margin: 0, fontFamily: 'Inter, sans-serif' } }}
      />
      <SearchInput
        value={query}
        iconCount={icons.length}
        onChange={event => setQuery(event.target.value)}
        css={{
          position: 'sticky',
          top: 0,
          borderBottom: '1px solid #e5e5e5',
          backfaceVisibility: 'hidden'
        }}
      />
      <button style={{ marginTop: 80}} onClick={getIcons}>
        test
      </button>
      <div css={{ padding: theme.space[2] }}>
        <div
          css={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gridGap: theme.space[1],
          }}
        >
          {searchResults.map(({name, component: Icon} :any) => (
            <IconButton
              name={name}
              key={name}
              component={Icon}
            />
          ))}
        </div>
        <div
          css={{
            marginTop: theme.space[2],
            padding: theme.space[2],
            fontSize: theme.fontSizes[0],
            color: 'rgba(0, 0, 0, 0.5)',
          }}
        >
          <a
            href="https://lucide.dev"
            target="_blank"
            css={{ color: 'inherit' }}
          >
            Lucide v12312312
          </a>
        </div>
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
