import { onMounted, onUpdated, onUnmounted } from 'vue';
import { throttleAndDebounce } from 'vitepress/dist/client/theme-default/support/utils';

/*
 * This file is compied and adjusted from vitepress/dist/client/theme-default/composables/useActiveAnchor.ts
 */

export function useActiveAnchor(container, marker) {
  const setActiveLinkDebounced = throttleAndDebounce(setActiveLink, 100);
  let prevActiveLink = null;
  onMounted(() => {
    requestAnimationFrame(setActiveLink);
    window.addEventListener('scroll', setActiveLinkDebounced);
  });
  onUpdated(() => {
    // sidebar update means a route change
    activateLink(location.hash);
  });
  onUnmounted(() => {
    window.removeEventListener('scroll', setActiveLinkDebounced);
  });
  function setActiveLink() {
    const links = [].slice.call(container.value.querySelectorAll('.outline-link'));
    const anchors = [].slice
      .call(document.querySelectorAll('.content .header-anchor'))
      .filter((anchor) => {
        return links.some((link) => {
          return link.hash === anchor.hash && anchor.offsetParent !== null;
        });
      });
    const scrollY = window.scrollY;
    const innerHeight = window.innerHeight;
    const offsetHeight = document.body.offsetHeight;
    const isBottom = Math.abs(scrollY + innerHeight - offsetHeight) < 1;
    // page bottom - highlight last one
    if (anchors.length && isBottom) {
      activateLink(anchors[anchors.length - 1].hash);
      return;
    }
    for (let i = 0; i < anchors.length; i++) {
      const anchor = anchors[i];
      const nextAnchor = anchors[i + 1];
      const [isActive, hash] = isAnchorActive(i, anchor, nextAnchor);
      if (isActive) {
        activateLink(hash);
        return;
      }
    }
  }
  function activateLink(hash) {
    if (prevActiveLink) {
      prevActiveLink.classList.remove('active');
    }
    if (hash !== null) {
      prevActiveLink = container.value.querySelector(`a[href="${decodeURIComponent(hash)}"]`);
    }
    const activeLink = prevActiveLink;
    if (activeLink) {
      activeLink.classList.add('active');
      marker.value.style.top = activeLink.offsetTop + 5 + 'px';
      marker.value.style.opacity = '1';
    } else {
      marker.value.style.top = '33px';
      marker.value.style.opacity = '0';
    }
  }

  return {
    setActiveLinkDebounced,
  };
}

const PAGE_OFFSET = 128;

function getAnchorTop(anchor) {
  return anchor.parentElement.offsetTop - PAGE_OFFSET;
}
function isAnchorActive(index, anchor, nextAnchor) {
  const scrollTop = window.scrollY;
  if (index === 0 && scrollTop === 0) {
    return [true, anchor.hash];
  }
  if (scrollTop < getAnchorTop(anchor)) {
    return [false, null];
  }
  if (!nextAnchor || scrollTop < getAnchorTop(nextAnchor)) {
    return [true, anchor.hash];
  }
  return [false, null];
}
