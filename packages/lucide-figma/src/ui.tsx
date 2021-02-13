import { Global, jsx } from '@emotion/core'
import { version } from 'lucide/package.json'
import React, { createElement, useMemo } from 'react'
import ReactDOM from 'react-dom'
import IconButton from './components/icon-button'
import SearchInput from './components/search-input'
import theme from './theme'
import './ui.css'
import tags from '../../../tags.json'
import * as iconComponents from 'lucide-react'
import { toPascalCase } from './helpers/naming';
import useSearch from '../../../site/src/lib/useSearch';

// import useSearch from './use-search'

declare var ICONS: [];

// const getAllIcons = () => {

// }

function App() {
  const [query, setQuery] = React.useState('')
  const icons = ICONS.map(name => {
    const componentName = toPascalCase(name);
    return {
      name,
      tags: tags[name] || [],
      component: iconComponents[componentName] || null
    }
  }).filter(({component}) => !!component)

  const searchResults = useMemo(() => useSearch(icons, query), [icons, query])

  console.log(searchResults);


  return (
    <div>
      <Global
        styles={{ body: { margin: 0, fontFamily: 'Inter, sans-serif' } }}
      />
      <SearchInput
        value={query}
        onChange={event => setQuery(event.target.value)}
        css={{
          position: 'sticky',
          top: 0,
          borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        }}
      />
      <div css={{ padding: theme.space[2] }}>
        <div
          css={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gridGap: theme.space[1],
          }}
        >
          {searchResults.map(({name, component: Icon} :any) => (
            <IconButton name={name} key={name} component={Icon}>
              <Icon/>
            </IconButton>
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
          <a href="https://lucide.dev" target="_blank">Lucide v{version}</a>
        </div>
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
