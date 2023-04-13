# Lucide Angular

Implementation of the lucide icon library for angular applications.

## Installation

```sh
yarn add lucide-angular
```

or

```sh
npm install lucide-angular
```

## How to use

There are three ways for use this library.

### Method 1: createElement

After install `lucide-angular` change content of file `app.component.html` and `app.component.ts`.

```html
<!-- app.component.html -->
<div id="lucide-icon"></div>
```

```js
// app.component.ts

import { Component, OnInit } from '@angular/core';
import { createElement } from 'lucide-angular';
import { Activity } from 'lucide-angular/icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    const div = document.getElementById('lucide-icon');
    const elm = createElement(Activity);
    elm.setAttribute('color', 'red'); // or set `width`, `height`, `fill`, `stroke-width`, ...

    if (div) {
      div.appendChild(elm);
    }
  }
}
```

### Method 2: User **Tag** with **name** property

After install `lucide-angular` change content of file `app.component.html`, `app.component.ts`, `app.component.css` and `app.module.ts`.

```js
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LucideAngularModule, AlarmCheck, Edit } from 'lucide-angular';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LucideAngularModule.pick({ AlarmCheck, Edit }) // add all of icons that is imported.
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

```html
<!-- app.component.html -->
<lucide-icon name="alarm-check" class="myicon"></lucide-icon>
<lucide-icon name="edit" class="myicon"></lucide-icon>
```

### Method 3: User **Tag** with **img** property

After install `lucide-angular` change content of file `app.component.html`, `app.component.ts`, `app.component.css` and `app.module.ts`.

```js
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LucideAngularModule } from 'lucide-angular';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, LucideAngularModule.pick({})],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

```xml
<!-- app.component.html -->
<lucide-icon [img]="ico1" class="myicon"></lucide-icon>
<lucide-icon [img]="ico2" class="myicon"></lucide-icon>
```

```js
// app.component.ts
import { Component } from '@angular/core';
import { Airplay, Circle } from 'lucide-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  ico1 = Airplay;
  ico2 = Circle;
}
```

## Notes

### Import all icons

In `Method 2`: import all icons in `app.module.ts` by:

```js

import { icons } from 'lucide-angular';

LucideAngularModule.pick(icons)

...
```

### Tags

You can use the following tags instead of `lucide-icon`:

- lucide-angular
- i-lucide
- span-lucide

All of the above are the same
