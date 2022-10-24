# Lucide Android Compose

Implementation of the lucide icon library for compose.

> What is lucide? Read it [here](https://github.com/lucide-icons/lucide#what-is-lucide).

## Step 1. Add the JitPack repository to your build file

```Kotlin
allprojects {
    repositories {
        ...
        maven { url 'https://jitpack.io' }
    }
}
```

### Step 2. Add the dependency
```Kotlin
dependencies {
    implementation 'dev.lucide:android:1.0.0'
}
```

## Usage
### Use an icon
```kotlin
    Icon(
      modifier = Modifier.size(32.dp),
      imageVector = Lucide.Map,
      contentDescription = Lucide.Map.name
    )
```
### List them all
```kotlin
    Lucide.AllIcons
```

## Notes
This has not been tested on compose multiplatform

### generate all icons
* 1. install kotlin cli to run kotlin script 'brew install kotlin'
* 2. copy all svg icons, with the right naming (same as on figma) on gta_svg_icons folder
* 3. run 'kotlin generateAndroid.main.kts'
* 4. check for the generated icons on Lucide library module

