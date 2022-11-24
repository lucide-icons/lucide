import { toKebabCase } from '../../../scripts/helpers.mjs';

export default ({ componentName, children }) => `import splitIconProps from '../splitIconProps';
import { defaultProps, commonAttributes } from '../defaults';

export default function ${componentName}(props) {
	const [local, rest] = splitIconProps(props);
	return (
		<svg
			{...commonAttributes}
			width={local.size ?? defaultProps.width}
			height={local.size ?? defaultProps.height}
			stroke={local.color ?? defaultProps.stroke}
			stroke-width={local.strokeWidth ?? defaultProps['stroke-width']}
			class={\`lucide lucide-${toKebabCase(componentName)} \${local.class ?? ''}\`}
			{...rest}
			innerHTML={\`${children
        .map(([name, attributes]) => {
          delete attributes.key;
          const attributeString = Object.keys(attributes)
            .map((key) => `${key}="${attributes[key]}"`)
            .join(' ');
          return `<${name} ${attributeString} />`;
        })
        .join('')}\`}
		/>
	)
}
`;
