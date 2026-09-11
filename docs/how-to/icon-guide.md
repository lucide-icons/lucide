---
title: How to pick the right icon
description: Learn when to use icons, when to avoid them, and how to choose icons that make interfaces easier to understand.
---

<script setup>
import {
  badgeCheck,
  badgeX,
  check,
  download,
  folderSearch,
  globe,
  house,
  imageOff,
  layoutList,
  mail,
  menu,
  plus,
  search,
  settings,
  smartphone,
  sparkles,
  trash,
  x,
} from '~/.vitepress/data/iconNodes';
const customCheck = [['path', {d: 'M19.05 5.253c.26.1.42.352.63.571.159.166.547.536.672.69.088.11.158.28.257.397-.075.202-.212.133-.453.038q-.315.238-.625.485l-.208-.159c-.14-.016-.045.182-.058.253-.135.685-1.145 1.03-1.61 1.376-.101.074-.32.424-.474.382-.04-.012-.133-.101-.154-.09q-.151.298-.293.598c-.446.156-.638.591-.906.928-.728.913-1.366 1.874-2.074 2.787-.138.178-.225.463-.403.606-.074.059-.265-.029-.208.158l-.14-.092c-.005.125.06.254.004.357a2.2 2.2 0 0 1-.259.37c-.034.031-.111-.041-.135-.006-.04.062-.007.272-.064.356-.052.076-.237.135-.262.203-.091.247-.092.572-.282.774-.052.054-.217.06-.228.081-.018.043.084.127.081.162-.014.178-.278.295-.367.42-.29.41-.527.885-.818 1.293-.076.107-.166.248-.264.392l-.613 1.273-1.16-1.208c-.135-.19-.27-.393-.326-.558-.02-.061.103-.138.07-.178-.035-.044-.13-.008-.152-.024-.158-.11-.489-.358-.524-.553-.006-.037.064-.128.052-.144-.007-.007-.08.026-.107.007-.232-.164-.33-.343-.49-.56-.312-.415-.828-.734-1.167-1.143-.074-.09.013-.309 0-.318-.031-.02-.147.077-.225.058-.26-.062-.407-.385-.632-.459-.112-.037-.343.032-.452.008-.087-.02-.208-.189-.285-.139-.045.031-.141.164-.173.168-.03.002-.007-.097-.028-.117-.088-.08-.091-.16-.165-.245-.112-.133-.569-.21-.304-.827l.008-.019c.053-.117.15-.228.215-.358.066-.13.444-.992.535-1.009.132-.017.256.314.309.331.037.012.12-.042.172-.03.165.034.205.13.449.005q-.019.203-.044.403c.093-.009.1.188.142.204.034.014.105-.055.14-.038.038.02.034.143.106.173.117.05.282-.14.364-.121.085.02.103.205.237.195l.081-.042.093-.167c.059.01-.002.126.034.157.043.036.14-.042.17-.018.024.02-.004.122.03.143.051.03.131-.088.172-.088.02 0 .246.089.257.097.08.061-.04.214.009.279.134.177.404.211.592.307a.44.44 0 0 1 .187.201c-.443.26-.494.747-.035.114-.006.148.19.048.233.14.026.059-.021.165.04.224.11.104.448.016.077.427.192.062.147.31.55.03.054.014-.083.296-.079.36.007.062.15.423.182.473.034.05.095.134.16.146.081.013.498-.275.116.19.12.07.138.118.162.255.003.025-.063.082-.055.092.017.02.095.014.13.046.06.052-.057.202.158.02l.102.016c-.002-.055-.01-.114-.017-.165-.004-.02-.062-.059-.07-.087-.017-.07.128-.127-.067-.248l.239-.002q-.025-.079-.048-.158l-.181-.116c.244.073.228-.075.308-.09.017-.001.1.05.141.036.049-.017.066-.096.117-.119l-.245-.226c-.003-.103.256.03.303-.001a1 1 0 0 0 .081-.167c0-.088-.217-.207-.058-.354.029-.025.117-.005.14-.032.038-.048-.023-.306-.164-.417.226.063.258-.149.345-.163.026-.003.146.072.202.045.045-.022.013-.179.06-.214.05-.036.159.012.181-.004.02-.015-.046-.089-.027-.117.062-.086.244-.078.294-.144.07-.097-.105-.346-.152-.502.03-.01.095.003.11-.018.193-.262.448-.534.69-.766.112-.107.648-.183.066-.485-.06-.11.38-.267.428-.323.047-.057-.01-.173.024-.22.101-.142.244-.19.295-.42.013-.06-.058-.193-.037-.218.028-.029.157.02.196-.015.09-.084.2-.288.292-.364.017-.014.112.054.16.053.185-.001.26-.11-.042-.33.261.017.204-.216.288-.332.177-.246.607-.597.673-.896.04-.19-.083-.303.191-.382.061-.018.131-.027.204-.048.174-.05.491.067.31-.278.19-.053.24-.199.553-.058l-.127-.196.04-.048.167.144c.12-.089.053-.437.148-.523.16-.145.649-.427.864-.481.114-.03.018-.153.273.051l.01-.097q-.05-.096-.102-.19c.103-.09.297-.11.398-.194.18-.152.34-.528.605-.572.067-.012.215.057.26.02.065-.054-.063-.258.02-.326.142-.118.59-.1.715-.218.038-.035.005-.123.029-.151.099-.122.203-.187.24-.383m-9.145 12.15c-.111.13.148.094.324-.011zm-1.57-2.539c.012-.033-.085-.048-.137-.005-.199.168.085.152.138.005m3.356-1.475q.068.022.133.045l.018-.033q-.093-.06-.186-.124z', fill: 'currentColor', stroke: 'none'}]];
const customMail = [['path', {fill:"currentColor", stroke: 'none', 'fill-rule': "evenodd", d: "M22 20H2V7.003l10 6.546 10-6.546z M22 5.905 12 11.45 2 5.905V4h20z"}]];
import LucideIcon from '~/.vitepress/theme/components/base/LucideIcon.vue';
</script>

# How to pick the right icon

Icons can make an interface easier to scan. They work best when people already understand the symbol or when the icon appears with a clear text label.

Use text instead of an icon when the meaning is complex, abstract, or easy to misunderstand.

## Match the interface style

Use icons with the same visual language in the same interface. Mixed styles can make related controls look unrelated.

:::: example
::: do <span class="g-4"><LucideIcon name="house" :iconNode="house" size="48" /> <LucideIcon name="plus" :iconNode="plus" size="48" /> <LucideIcon name="check" :iconNode="check" size="48" /> <LucideIcon name="mail" :iconNode="mail" size="48" /></span>
Use one icon style for related controls.
:::
::: dont <span class="g-4"><LucideIcon name="house" :iconNode="house" strokeWidth="1" size="48" /> <LucideIcon name="plus" :iconNode="plus" strokeWidth="3" size="48" /> <LucideIcon name="check" :iconNode="customCheck" size="48" /> <LucideIcon name="mail" :iconNode="customMail" size="48" /></span>
Don't mix unrelated icon styles in the same interface.
:::
::::

## Use familiar icons for familiar actions

Icons work well for common actions and destinations that people already recognize from other interfaces.

:::: example
::: do <span class="g-4"><LucideIcon name="search" :iconNode="search" size="48" /> <LucideIcon name="house" :iconNode="house" size="48" /> <LucideIcon name="settings" :iconNode="settings" size="48" /> <LucideIcon name="x" :iconNode="x" size="48" /></span>
Use icons for common actions with widely understood symbols.
:::
::: dont <span>"strategy", "optimize", "synergy", "innovation"</span>
Don't use icons alone for abstract concepts with no common symbol.
:::
::::

## Use icons as visual anchors

Icons can help people scan lists, menus, cards, and repeated controls. The icon needs to support the text, not compete with it.

:::: example
::: do ../images/how-to/visual_anchor_do.svg?raw=true
Use icons to make associated options easier to scan.
:::
::: dont ../images/how-to/visual_anchor_dont.svg?raw=true
Don't add icons to every line when they only create visual clutter.
:::
::::

## Use icons in compact interfaces

Icons can help in tight spaces, such as mobile navigation, toolbars, tables, and compact controls. Keep labels when the icon is not obvious.

:::: example
::: do ../images/how-to/compact_interfaces_labels_do.svg?raw=true
Keep labels in all layout variants when space allows.
:::
::: caution ../images/how-to/compact_interfaces_labels_dont.svg?raw=true
Use icon-only controls only when a visible label does not fit.

In these cases, make sure that the label is accessible via hover, focus, or tap.
:::
::::

:::: example
::: do ../images/how-to/compact_interfaces_do.svg?raw=true
Keep text labels next to icons in compact layouts, even when space is sparse.
:::
::: dont ../images/how-to/compact_interfaces_dont.svg?raw=true
Don't remove labels in compact layouts when the meaning without them is unclear.
:::
::::

:::: example
::: caution ../images/how-to/compact_interfaces_caution_1.svg?raw=true
Use icon-only controls only when the icon represents a widely understood action.
:::
::: caution ../images/how-to/compact_interfaces_caution_2.svg?raw=true
Use icon-only controls only when the label is available on hover, focus, or tap.
:::
::::

## Choose the clearest symbol

Use a familiar symbol when one exists. Novel symbols make people stop and interpret the interface.

:::: example
::: do <span><LucideIcon name="trash" :iconNode="trash" /> `trash`<br>for deleting an image</span>
Use a familiar symbol for a familiar action.
:::
::: dont <span><LucideIcon name="image-off" :iconNode="imageOff" /> `image-off`<br>for deleting an image</span>
Don't make people learn a new symbol for a common action.
:::
::::

## Match the context, not every detail

Choose the icon that makes the action clearest in context. A more specific icon is better only when the extra detail helps people understand the action.

:::: example
::: do ../images/how-to/appropriate_context_do.svg?raw=true
Use clear action icons when the surrounding interface already provides the object context.
:::
::: dont ../images/how-to/appropriate_context_dont.svg?raw=true
Don't add object details when the context already makes the object clear.
:::
::::

## Keep icon meaning consistent

Use the same icon for the same meaning, and use different icons for different meanings.

:::: example
::: do ../images/how-to/consistent_icon_meaning_do.svg?raw=true
Use different icons for distinct purposes or meanings.
:::
::: dont ../images/how-to/consistent_icon_meaning_dont.svg?raw=true
Don't use the same icon for multiple distinct purposes or meanings.
:::
::::

:::: example
::: do ../images/how-to/consistent_icon_function_do.svg?raw=true
Use the same icon for the same purpose or function.
:::
::: dont ../images/how-to/consistent_icon_function_dont.svg?raw=true
Don't use different icons for the same purpose or function.
:::
::::

## Do not iconize repeated status decoration

Avoid adding an icon to every repeated status marker when color, weight, text, or layout already communicates the state. Repeated status icons can turn useful list structure into visual noise.

:::: example
::: do ../images/how-to/repeated_status_do.svg?raw=true
Use the lightest cue that makes the status clear.
:::
::: dont ../images/how-to/repeated_status_dont.svg?raw=true
Don't add repeated status icons when they only restate what the list already shows.
:::
::::

## Do not replace built-in control cues

Do not add icons to controls that already show people how they work. Native controls are easier to recognize when they behave and look familiar.

:::: example
::: do ../images/how-to/native_ui_elements_do.svg?raw=true
Use the built-in visual cue when the control already communicates its behavior.
:::
::: dont ../images/how-to/native_ui_elements_dont.svg?raw=true
Don't replace native controls with similarly themed interactive icons.
:::
::::

<style>
.g-4 {
  display: flex;
  flex-direction: row;
  gap: 1rem;
}
</style>
