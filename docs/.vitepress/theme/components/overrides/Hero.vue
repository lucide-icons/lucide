<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, type Component } from 'vue';
import {
  heart,
  star,
  zap,
  code,
  feather,
  cloud,
  sun,
  moon,
  camera,
  music,
  video,
  globe,
  layers,
  package as packageIcon,
  compass,
  command,
  terminal,
  database,
  server,
  cpu,
  lock,
  key,
  shield,
  wifi,
  download,
  upload,
  search,
  settings,
  users,
  mail,
  bell,
  calendar,
  clock,
  gitBranch,
  funnel,
  bookmark,
  tag,
  sparkles,
} from '../../../data/iconNodes';
import createElement from 'lucide/src/createElement';
import { IconNode } from 'lucide';

const icons: Component[] = [
  heart, star, zap, code, feather, cloud, sun, moon, camera, music,
  video, globe, layers, packageIcon, compass, command, terminal, database,
  server, cpu, lock, key, shield, wifi, download, upload, search,
  settings, users, mail, bell, calendar, clock, gitBranch, funnel,
  bookmark, tag, sparkles,
];

const svgs = icons.map(icon => {
  const element = createElement(icon as IconNode, {
    stroke: 'white',
    opacity: '0.2',
  })

  return element.outerHTML;
});

const highlightedSvgs = icons.map(icon => {
  const element = createElement(icon as IconNode, {
    stroke: 'white',
  })

  return element.outerHTML;
});

const images = svgs.map(svg => {
  const img = new Image();
  img.src = `data:image/svg+xml;base64,${btoa(svg)}`;
  return img;
});

const highlightedImages = highlightedSvgs.map(svg => {
  const img = new Image();
  img.src = `data:image/svg+xml;base64,${btoa(svg)}`;
  return img;
});

const canvas = ref<HTMLCanvasElement | null>(null);

// Setting up the columns
const fontSize = 16;
const gap = 40;
const gapY = 8;
const intervalTime = ref<number | null>(null);

// Store individual drops with their positions
let individualDrops: Array<{x: number, y: number, active: boolean}> = [];

// Random integer between min and max
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

onMounted(() => {
  if (!canvas.value) return;

  const ctx = canvas.value.getContext('2d');
  if (!ctx) return;

  const width = window.innerWidth;
  const height = window.innerHeight * 0.6;
  canvas.value.width = width;
  canvas.value.height = height;

  let columns = Math.floor(width / 120);

  var rows = Math.floor(canvas.value.height / fontSize);
  var midStart = Math.floor(rows * 0.25);
  var midEnd   = Math.floor(rows * 0.85);

  let drops = Array.from({ length: columns }, () => randInt(midStart, midEnd));
  let fps, fpsInterval, startTime, now, then, elapsed;

  // Add click event listener
  function handleCanvasClick(event: MouseEvent) {
    const rect = canvas.value?.getBoundingClientRect();
    if (!rect) return;

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    individualDrops.push({
      x: x,
      y: y,
      active: true
    });
  }

  canvas.value.addEventListener('click', handleCanvasClick);

  function draw() {
    if (!ctx) return;

    ctx.fillStyle = 'rgba(27, 27, 31, 0.50)';
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = 'rgba(255, 255, 255, 1)';

    // Draw regular drops
    for (var i = drops.length; i > 0; i--) {
      var img = images[Math.floor(Math.random() * images.length)];
      ctx.drawImage(img, i * fontSize * 2 + gap, drops[i] * fontSize, (fontSize / 2) + gapY, (fontSize / 2) + gapY);

      drops[i]++;
      if (Math.random() > .98) {
        drops[i] = randInt(midStart, midEnd);
      }
    }

    // Draw and update individual drops
    individualDrops = individualDrops.filter(drop => {
      if (!drop.active) return false;

      var img = highlightedImages[Math.floor(Math.random() * images.length)];
      ctx.drawImage(img, drop.x - fontSize/2, drop.y, fontSize, fontSize);

      drop.y += fontSize

      // Remove if off screen
      if (drop.y > height) {
        drop.active = false;
        return false;
      }

      return true;
    });
  }

  function startAnimating(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    animate();
  }
  function animate() {

    // request another frame

    requestAnimationFrame(animate);

    // calc elapsed time since last loop

    now = Date.now();
    elapsed = now - then;

    // if enough time has elapsed, draw the next frame

    if (elapsed > fpsInterval) {

        // Get ready for next frame by setting then=now, but also adjust for your
        // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
        then = now - (elapsed % fpsInterval);

        // Put your drawing code here
        draw();

    }
}

startAnimating(12);

window.addEventListener('resize', function() {
  canvas.value.width = window.innerWidth;
  canvas.value.height = window.innerHeight;
  rows = Math.floor(canvas.value.height / fontSize);
  columns = Math.floor(canvas.value.width / fontSize);

  var oldDrops = drops.slice();
  drops = [];
  for (var i = 0; i < columns; i++) {
    drops[i] = oldDrops[i % oldDrops.length] ?? randInt(midStart, midEnd);
  }
});

// Cleanup event listener
onBeforeUnmount(() => {
  canvas.value?.removeEventListener('click', handleCanvasClick);
});
});

</script>

<template>
  <div class="hero">
    <canvas ref="canvas" class="hero-canvas" />
  </div>
</template>

<style scoped>
.hero {
  overflow: hidden;
  height: 60vh;
}

.hero-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 60vh;
  filter: blur(0px);
}
</style>
