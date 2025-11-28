# Color

By default, all icons have the color value: `currentColor`. This keyword uses the element's computed text `color` value to represent the icon color.

Read more about [ `currentColor` on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#currentcolor_keyword).

## Adjust the color using the `color` prop

The color can be adjusted by passing the color prop to the element.

```SnackPlayer name=State&ext=js&dependencies=react-native-svg,lucide-react-native
import React, {useState, useEffect} from 'react';
import { View } from 'react-native';
import { Smile } from "lucide-react-native";

const style = { marginTop: 50, height: '100%', alignItems: 'center', display: 'flex', justifyContent: 'center' }

const App = () => {
  return (
    <View style={style}>
      <Smile color="#3e9392" />
    </View>
  );
};

export default App;
```

## Using parent elements text color value

Because the color of lucide icons uses `currentColor`, the color of the icon depends on the computed `color` of the element, or it inherits it from its parent.

For example, if a parent element's color value is `#fff` and one of the children is a lucide icon, the color of the icon will be rendered  as `#fff`. This is browser native behavior.

```SnackPlayer name=State&ext=js&dependencies=react-native-svg,lucide-react-native
import React, {useState, useEffect} from 'react';
import { View, TouchableHighlight, Text, StyleSheet } from 'react-native';
import { ThumbsUp } from "lucide-react-native";

function LikeButton() {
  return (
    <TouchableHighlight
      style={{...styles.button, color: 'blue'}}

    >
      <View style={styles.buttonInner}>
        <ThumbsUp />
        <Text style={{ color: 'currentColor' }}>Like</Text>
      </View>
    </TouchableHighlight>
  );
}

const App = () => {
  return (
    <View style={styles.container}>
      <LikeButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { height: '100%', alignItems: 'center', display: 'flex', justifyContent: 'center'},
  button: { flexDirection: 'row', alignItems: 'center', padding: 10, borderRadius: 25, backgroundColor: '#eee' },
  buttonInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});


export default App;
```
