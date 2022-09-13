import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { FormLabel, Icon, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { Saturation, Hue, ColorWrap as CustomPicker } from 'react-color/lib/components/common';

type ColorPickerProps = {
  value: string;
  hex: string;
  hsl: string;
  hsv: string;
  onChange: (s: string, e: SyntheticEvent) => void;
};

function ColorPicker({ hsv, hsl, onChange, value: color }: ColorPickerProps) {
  const [value, setValue] = useState(color);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (color !== value && input.current !== document.activeElement) {
      setValue(color === 'currentColor' ? color : String(color).toUpperCase());
    }
  }, [color]);

  const handleChange = (e) => {
    const value = e.target.value;
    setValue(value);
    onChange(value, e);
  };

  return (
    <div>
      <FormLabel htmlFor="color" fontWeight={'bold'}>
        Color
      </FormLabel>
      <InputGroup>
        <InputLeftElement
          children={
            <Icon>
              <rect x={0} width={24} y={0} height={24} fill={value} rx={2} />
            </Icon>
          }
        />
        <Input value={value} name="color" onChange={handleChange} ref={input} />
      </InputGroup>
      <div
        style={{
          width: '100%',
          paddingBottom: '75%',
          position: 'relative',
          overflow: 'hidden',
          marginTop: '0.5rem',
          borderRadius: '0.375rem',
          border: '1px solid',
          borderColor: 'inherit',
        }}
      >
        <Saturation hsl={hsl} hsv={hsv} onChange={onChange} />
      </div>
      <div
        style={{
          minHeight: '2em',
          position: 'relative',
          margin: '0.5rem 0 0 0',
          borderRadius: '0.375rem',
          border: '1px solid',
          borderColor: 'inherit',
          overflow: 'hidden',
        }}
      >
        <Hue hsl={hsl} onChange={onChange} direction={'horizontal'} />
      </div>
    </div>
  );
}

export default CustomPicker(ColorPicker);
