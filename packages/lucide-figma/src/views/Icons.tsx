import { createReactComponent } from '../../../lucide-react'

import IconButton from '../components/IconButton'
import SearchInput from '../components/SearchInput'
import { Icon } from '../hooks/useSearch'

interface PageProps {
  query: string
  setQuery: (query:string) => void
  searchResults: Icon[]
  icons: Icon[]
  version: string
}

const Icons = ({
  query,
  setQuery,
  searchResults,
  icons,
  version
}: PageProps) => {
  return (
    <>
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
    </>
  )
}

export default Icons
