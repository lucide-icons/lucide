# Sizing

By default, the size of all icons is `24px` by `24px`. The size is adjustable using the `size` prop and CSS.

## Adjusting the icon size using the `size` prop

```SnackPlayer name=State&ext=js&dependencies=react-native-svg,lucide-react-native
import React, {useState, useEffect} from 'react';
import { View } from 'react-native';
import { Landmark } from "lucide-react-native";

const style = { height: '100%', alignItems: 'center', display: 'flex', justifyContent: 'center' }

const App = () => {
  return (
    <View style={style}>
      <Landmark size={48}  />
    </View>
  );
};

export default App;
```

## Adjusting the icon size via the style prop

The style properties `width` and `height` can be used to adjust the icon size.

```SnackPlayer name=State&ext=js&dependencies=react-native-svg,lucide-react-native
import React, {useState, useEffect} from 'react';
import { View, StyleSheet } from 'react-native';
import { Landmark } from "lucide-react-native";

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center'
  },
  icon: {
    width: 48,
    height: 48
  },
});

const App = () => {
  return (
    <View style={styles.container}>
      <Landmark style={styles.icon}  />
    </View>
  );
};

export default App;
```
