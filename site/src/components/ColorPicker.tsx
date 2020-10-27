import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { FormLabel, Icon, Input, InputGroup, InputLeftElement } from '@chakra-ui/core';
import { CustomPicker } from 'react-color';

const { Saturation, Hue } = require('react-color/lib/components/common');

type ColorPickerProps = {
  value: string;
  hex: string;
  hsl: string;
  hsv: string;
  onChange: (s: string, e: SyntheticEvent) => void;
};

function ColorPicker({ hsv, hsl, onChange, hex, value: color }: ColorPickerProps) {
  const [value, setValue] = useState(color);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (color !== value && input.current !== document.activeElement) {
      setValue(String(color).toUpperCase());
    }
  }, [color]);

  const handleChange = (e) => {
    let value = e.target.value;
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
              <rect x={0} width={24} y={0} height={24} fill={hex} rx={2} />
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
        }}
      >
        <Saturation hsl={hsl} hsv={hsv} onChange={onChange} />
      </div>
      <div style={{ minHeight: '1em', position: 'relative', margin: 2 }}>
        <Hue hsl={hsl} onChange={onChange} direction={'horizontal'} />
      </div>
    </div>
  );
}

export default CustomPicker(ColorPicker);
