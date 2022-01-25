import { Link, Heading } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useHeadingNavigationContext } from './HeadingNavigationProvider';

function getAnchor(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, '')
    .replace(/[ ]/g, '-');
}

const HeadingAnchored = ({ children, as: headingLevel, ...restProps }) => {
  const { addHeading } = useHeadingNavigationContext();
  const headingText = typeof children === 'string' ? children : children[0];

  const anchor = getAnchor(headingText);
  const link = `#${anchor}`;
  const hoverStyling = {
    textDecoration: 'none',
    _before: {
      content: '"#"',
      color: '#F56565',
      fontWeight: 'bold',
      position: 'absolute',
      left: 0,
      transform: 'translateX(-100%)',
      paddingX: 2,
    },
  };
  const focusStyling = {
    outline: 'none',
  };

  useEffect(() => {
    addHeading({
      anchor,
      label: headingText,
      headingLevel,
    });
  }, [anchor, headingText]);

  return (
    <Heading id={anchor} as={headingLevel} position="relative" {...restProps}>
      <Link href={link} className="anchor-link" _hover={hoverStyling} _focus={focusStyling}>
        {children}
      </Link>
    </Heading>
  );
};

export default HeadingAnchored;
