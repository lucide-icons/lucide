import { jsx } from '@emotion/core'
import theme from '../theme'
import { renderToString } from 'react-dom/server'
import { FC } from 'react';

interface IconButtonProps {
  name: string,
  component: FC,
}

function IconButton({ name, component: IconComponent }: IconButtonProps) {
  const onIconclick = () => {
    const svg = renderToString(<IconComponent/>);

    parent.postMessage({ pluginMessage: { name, svg }}, '*')
  }

  return (
    <button
      key={name}
      aria-label={name}
      onClick={onIconclick}
      css={{
        padding: theme.space[2],
        color: '#333',
        background: 'transparent',
        border: 0,
        borderRadius: theme.radii[1],
        appearance: 'none',
        outline: 0,
        '&:hover': {
          background: 'rgba(0, 0, 0, 0.06)',
        },
        '&:focus, &:active': {
          boxShadow: `inset 0 0 0 2px ${theme.colors.blue}`,
        },
      }}
    >
      <IconComponent />
    </button>
  )
}

export default IconButton
