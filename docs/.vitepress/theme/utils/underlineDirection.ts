// Links with a hover underline: the nav bar menu and the footer links
const UNDERLINED_LINKS =
  '.VPNav .VPNavBarMenuLink, .VPNav .VPNavBarMenuGroup, .VPFooter .footer-link';

// Makes the hover underline follow the mouse: it draws in from the side the pointer enters
// and leaves towards the side the pointer exits. The side is passed to the CSS as a variable.
function setUnderlineOrigin(event: PointerEvent) {
  const link = event.target;
  if (!(link instanceof HTMLElement) || !link.matches(UNDERLINED_LINKS)) return;

  const { left, width } = link.getBoundingClientRect();
  const side = event.clientX < left + width / 2 ? 'left' : 'right';

  link.style.setProperty('--underline-origin', side);
}

export default function trackUnderlineDirection() {
  // pointerenter and pointerleave do not bubble, so they are caught on their way down instead
  document.addEventListener('pointerenter', setUnderlineOrigin, true);
  document.addEventListener('pointerleave', setUnderlineOrigin, true);
}
