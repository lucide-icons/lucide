import { jsx } from '@emotion/core'
import { createElement, forwardRef } from 'react'

const SearchIcon = forwardRef((props: any, ref) => createElement(
    'svg',
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: 32,
      height: 32,
      clipRule: 'evenodd',
      fillRule: 'evenodd',
      ref,
      ...props,
    },
    [
      [
        'path', {
          d: 'm20 15c0 2.7614-2.2386 5-5 5s-5-2.2386-5-5 2.2386-5 5-5 5 2.2386 5 5zm-1.1256 4.5815c-1.0453.8849-2.3975 1.4185-3.8744 1.4185-3.3137 0-6-2.6863-6-6s2.6863-6 6-6 6 2.6863 6 6c0 1.4769-.5336 2.8291-1.4185 3.8744l4.2721 4.272-.7072.7072z"'
        }
      ]
    ]
  ))

export default SearchIcon
