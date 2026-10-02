---
title: Stroke width - React Native
description: Learn how to adjust the stroke width of icons in your React Native application using the `strokeWidth` prop or adjust the strokeWidth appearance using the `nonScalingStroke` prop.
---

# Stroke width

All icons are designed with SVG elements using strokes.
These have a default stroke width of `2px`.

The `strokeWidth` can be adjusted to create a different look of the icons.

## Adjusting stroke width with `strokeWidth` prop

```SnackPlayer name=State&ext=js&dependencies=react-native-svg,lucide-react-native
import React, {useState, useEffect} from 'react';
import { View } from 'react-native';
import { FolderLock } from "lucide-react-native";

const style = { height: '100%', alignItems: 'center', display: 'flex', justifyContent: 'center', backgroundColor: '#202127', color: '#fff' }

const App = () => {
  return (
    <View style={style}>
      <FolderLock strokeWidth={1} />
    </View>
  );
};

export default App;
```

## Non-scaling strokes

When adjusting the `size` prop the size of the stroke width will be relative to the size of the icon, this is the default SVG behavior. The `nonScalingStroke` prop is introduced to adjust this behavior to make the stroke width constant no matter the size of the icon.

This means that when `nonScalingStroke` is enabled and the `size` of the icons is set to `48px` the `strokeWidth` will still be `2px` on the screen.

Note `2px` is the default stroke width for a Lucide icon, this can be adjusted to all sizes.

<!--@include: ../../../images/non-scaling-stroke-compare.svg -->

### Adjusting stroke width with `nonScalingStroke` prop

Setting `nonScalingStroke` to `true` will make the stroke width non-scaling.

```SnackPlayer name=State&ext=js&dependencies=react-native-svg,lucide-react-native
import React, {useState, useEffect} from 'react';
import { View } from 'react-native';
import { RollerCoaster } from "lucide-react-native";

const style = { height: '100%', alignItems: 'center', display: 'flex', justifyContent: 'center', backgroundColor: '#202127', color: '#fff' }

const App = () => {
  return (
    <View style={style}>
      <RollerCoaster
        size={96}
        nonScalingStroke
      />
    </View>
  );
};

export default App;
```

<!-- <Sandpack
  template="react"
  :theme="sandpackTheme"
  :files="nonScalingStroke"
  :customSetup='{
    dependencies: {
      "lucide-react": "latest"
    }
  }'
  :options="{
    editorHeight: 320,
    editorWidthPercentage: 60,
  }"
/> -->
