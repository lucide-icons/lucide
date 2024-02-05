import { renderToString } from 'react-dom/server';
import { FC } from 'react';
import './IconButton.scss';

interface IconButtonProps {
  name: string;
  component: FC;
}

function IconButton({ name, component: IconComponent }: IconButtonProps) {
  const onIconClick = () => {
    const svg = renderToString(<IconComponent />);

    parent.postMessage(
      {
        pluginMessage: {
          type: 'drawIcon',
          icon: { name, svg },
        },
      },
      '*',
    );
  };

  return (
    <button
      key={name}
      aria-label={name}
      onClick={onIconClick}
      className="icon-button"
    >
      <IconComponent />
    </button>
  );
}

export default IconButton;
