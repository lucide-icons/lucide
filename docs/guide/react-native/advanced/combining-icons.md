<!-- <script setup>
import { Sandpack } from 'sandpack-vue3'
import sandpackTheme from '../../../.vitepress/theme/sandpackTheme.json'
import combineIconsExample from './examples/combining-icons/files.ts'
import combineCustomExample from './examples/combining-icons-custom/files.ts'
import combineNotificationExample from './examples/combining-icons-notification/files.ts'
</script> -->

# Combining icons

You can combine multiple icons into a single icon by using SVG in SVG.
This is useful for if you want to be creative and make your own custom icons by combining existing icons.

```SnackPlayer name=State&ext=js&dependencies=react-native-svg,lucide-react-native
import React, {useState, useEffect} from 'react';
import { View, StyleSheet } from 'react-native';
import { Scan, User} from "lucide-react-native";

const App = () => {
  return (
    <View style={styles.container}>
      <Scan size={48}>
        <User
          size={12}
          x={6}
          y={6}
          absoluteStrokeWidth
        />
      </Scan>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center'
  },
});

export default App;
```

This is valid SVG and all SVG properties are supported on the icons.
The `x` and `y` coordinates can be adjusted to position the icons as you like.

::: info Limitation
When combining icons, you need to make sure that the `x` and `y` coordinates are within the `viewBox` of the outer icon (24x24).
:::

## With custom SVG elements

You can also use SVG elements to create your own icons.

### Example with notification badge

For example, you can add a notification badge to an icon by using the `circle` SVG element.

```SnackPlayer name=State&ext=js&dependencies=react-native-svg,lucide-react-native
import React, {useState, useEffect} from 'react';
import { View, StyleSheet } from 'react-native';
import { Mail } from "lucide-react-native";
import { Circle } from 'react-native-svg';

const App = () => {
  const hasUnreadMessages = true;

  return (
    <View style={styles.container}>
      <Mail size={48}>
        {hasUnreadMessages && (
          <Circle
            r="3"
            cx="21"
            cy="5"
            stroke="none"
            fill="#F56565"
          />
        )}
      </Mail>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center'
  },
});

export default App;
```

### Example with text element

You can also use the `text` SVG element to add text to your icon.

```SnackPlayer name=State&ext=js&dependencies=react-native-svg,lucide-react-native
import React, {useState, useEffect} from 'react';
import { View, StyleSheet } from 'react-native';
import { File } from "lucide-react-native";
import { Text } from 'react-native-svg';

const App = () => {
  const hasUnreadMessages = true;

  return (
    <View style={styles.container}>
      <File size={48}>
        <Text
          x={7.5}
          y={19}
          fontSize={8}
          fontFamily="Verdana,sans-serif"
          strokeWidth={1}
        >
          JS
        </Text>
      </File>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center'
  },
});

export default App;
```



