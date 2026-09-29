---
title: Color - React Native
description: Learn how to adjust the color of icons in your React Native application using the `color` prop or by using parent elements text color value.
---
# Color

By default, all icons have the color value: `currentColor`. This keyword uses the element's computed text `color` value to represent the icon color.

Read more about [ `currentColor` on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#currentcolor_keyword).

## Adjust the color using the `color` prop

The color can be adjusted by passing the color prop to the element.

```SnackPlayer name=State&ext=js&dependencies=react-native-svg,lucide-react-native
import React, {useState, useEffect} from 'react';
import { View } from 'react-native';
import { Smile } from "lucide-react-native";

const style = { height: '100%', alignItems: 'center', display: 'flex', justifyContent: 'center' }

const App = () => {
  return (
    <View style={style}>
      <Smile color="#3e9392" />
    </View>
  );
};

export default App;
```
