---
title: Filled Icons - React Native
description: Learn how to use fills with Lucide icons in your React Native application, and the limitations of using fills with Lucide icons.
---

# Filled Icons

Fills are officially not supported.
However, all SVG properties are available on all icons.
Fill can still be used and will work fine on certain icons.

Example with stars:

```SnackPlayer name=State&ext=js&dependencies=react-native-svg,lucide-react-native
import React, {useState, useEffect} from 'react';
import { View, StyleSheet } from 'react-native';
import { Star, StarHalf } from "lucide-react-native";

const App = () => {
  return (
    <View style={styles.container}>
      <View style={styles.starRating}>
        <View style={styles.stars}>
          { Array.from({ length: 5 }, () => (
              <Star fill="#111" strokeWidth={0} />
          ))}
        </View>
        <View style={[styles.stars, styles.rating]}>
          <Star fill="orange" strokeWidth={0} />
          <Star fill="orange" strokeWidth={0} />
          <StarHalf fill="orange" strokeWidth={0} />
        </View>
      </View>
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
  starRating: {
    position: 'relative',
  },
  stars: {
    display: 'flex',
    flexDirection: 'row',
    gap: 4,
  },
  rating: {
    position: 'absolute',
    top: 0,
  }
});

export default App;
```
