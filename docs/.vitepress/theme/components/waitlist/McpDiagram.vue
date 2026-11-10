<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import {
  useAnimate,
  useInView,
  useReducedMotion,
  type AnimationPlaybackControls,
  type AnimationSequence,
} from 'motion-v';
import Icon from '@lucide/vue/src/Icon';
import { bot, cloud, heart, moon, star, zap } from '../../../data/iconNodes';

/** All timings are in seconds from the start of a loop. */
const TRAVEL = 1.7;
const DOT_FADE = 0.15;
const DASH_FADE = 0.4;
const LABEL_FADE = 0.35;
const RESET_FADE = 0.5;

const CALL_GLOW_START = 0.3;
const CALL_GLOW = 0.7;
const REQUEST_START = 0.85;
const REQUEST_END = REQUEST_START + TRAVEL;
const SERVER_GLOW = 0.95;
const RESPONSE_START = 3.2;
const RESPONSE_END = RESPONSE_START + TRAVEL;
const RESPONSE_GLOW = 1;
const RESET_START = RESPONSE_END + RESPONSE_GLOW;
const RESET_END = RESET_START + RESET_FADE;
const REST = 0.6;

/** A multiple of the 8-unit dash period, so the dashes stop on the same phase they started on. */
const DASH_TRAVEL = 64;

const ICON_NAMES = [
  'heart',
  'star',
  'sparkles',
  'rocket',
  'bell',
  'zap',
  'coffee',
  'camera',
  'moon',
  'sun',
  'leaf',
  'flame',
  'anchor',
  'feather',
  'globe',
  'crown',
];
const RESULT_COUNT = 4;
const SVG_ICONS = [cloud, heart, moon, star, zap];
const JSX_PACKAGES = ['lucide-react', 'lucide-preact', '@lucide/solid'];
const PROMPTS = [
  '"Add a heart icon\n to the like button"',
  '"Find an icon for\n a settings menu"',
  '"Swap the navbar emojis\n for matching icons"',
  '"Suggest icons for\n a pricing table"',
];

const pick = <T,>(items: T[]) => items[Math.floor(Math.random() * items.length)];

const iconList = () =>
  JSON.stringify(
    [...ICON_NAMES].sort(() => Math.random() - 0.5).slice(0, RESULT_COUNT),
    null,
    2,
  );

const svgCode = () => {
  const [[, { d }]] = pick(SVG_ICONS);

  return `<svg viewBox="0 0 24 24">\n  <path d="${d.slice(0, 9)}…" />\n</svg>`;
};

const jsxCode = () => {
  const name = pick(ICON_NAMES);
  const component = name[0].toUpperCase() + name.slice(1);

  return `import { ${component} }\n  from '${pick(JSX_PACKAGES)}';\n\nconst App = () => (\n  <${component} size={24} />\n);`;
};

/** One tool per loop, in this order. */
const TOOLS = [
  { name: 'search_icons', getResult: iconList },
  { name: 'get_svg', getResult: svgCode },
  { name: 'get_prompts_suggestions', getResult: () => pick(PROMPTS) },
  { name: 'get_code', getResult: jsxCode },
];

const toolIndex = ref(0);
const toolName = computed(() => TOOLS[toolIndex.value].name);

// Empty until the first response is due, so the server and client render the same text
const result = ref('');

/** Function segments are called with their progress on every frame, so this guards to run once per loop. */
const oncePerLoop = (callback: () => void) => {
  let called = false;

  return (progress: number) => {
    if (progress < 1) {
      called = false;
    } else if (!called) {
      called = true;
      callback();
    }
  };
};

const travel =(selector: string, at: number, y: [string, string]): AnimationSequence => [
  [selector, { y }, { at, duration: TRAVEL, ease: 'easeInOut' }],
  [selector, { opacity: [0, 1] }, { at, duration: DOT_FADE }],
  [selector, { opacity: [1, 0] }, { at: at + TRAVEL - DOT_FADE, duration: DOT_FADE }],
];

const SEQUENCE: AnimationSequence = [
  // Your AI Tool makes the call
  ['.node-client .glow', { opacity: [0, 1, 0] }, { at: CALL_GLOW_START, duration: CALL_GLOW }],
  ['.line line', { strokeDasharray: ['8 0', '4 4'] }, { at: CALL_GLOW_START, duration: DASH_FADE }],
  [
    '.line line',
    { strokeDashoffset: [0, DASH_TRAVEL] },
    { at: CALL_GLOW_START, duration: REQUEST_END - CALL_GLOW_START, ease: 'linear' },
  ],
  ['.tool-call', { opacity: [0, 1], scale: [0.9, 1] }, { at: CALL_GLOW_START, duration: LABEL_FADE }],

  // The request travels up to Lucide MCP
  ...travel('.dot-request', REQUEST_START, ['100%', '0%']),

  // Lucide MCP receives it
  ['.node-server .glow', { opacity: [0, 1, 0] }, { at: REQUEST_END, duration: SERVER_GLOW }],
  [
    oncePerLoop(() => {
      result.value = TOOLS[toolIndex.value].getResult();
    }),
    { at: REQUEST_END, duration: 0.05 },
  ],

  // The response travels back down, and the label swaps to the result
  ...travel('.dot-response', RESPONSE_START, ['0%', '100%']),
  [
    '.line line',
    { strokeDashoffset: [DASH_TRAVEL, 0] },
    { at: RESPONSE_START, duration: TRAVEL, ease: 'linear' },
  ],
  ['.tool-call', { opacity: [1, 0] }, { at: RESPONSE_START, duration: LABEL_FADE }],
  [
    '.tool-result',
    { opacity: [0, 1], scale: [0.9, 1] },
    { at: RESPONSE_START, duration: LABEL_FADE },
  ],

  // Your AI Tool receives the response
  ['.node-client .glow', { opacity: [0, 1, 0] }, { at: RESPONSE_END, duration: RESPONSE_GLOW }],

  // Back to the rest state
  ['.tool-result', { opacity: [1, 0] }, { at: RESET_START, duration: RESET_FADE }],
  ['.line line', { strokeDasharray: ['4 4', '8 0'] }, { at: RESET_START, duration: RESET_FADE }],

  // Both labels are hidden now, so the next loop can use the next tool
  [
    oncePerLoop(() => {
      toolIndex.value = (toolIndex.value + 1) % TOOLS.length;
    }),
    { at: RESET_END, duration: 0.05 },
  ],
];

const [scope, animate] = useAnimate();
const inView = useInView(() => scope.value as HTMLElement, { amount: 0.3 });
const reducedMotion = useReducedMotion();

let controls: AnimationPlaybackControls | undefined;

watch(inView, (isInView) => {
  if (reducedMotion.value) return;

  if (!isInView) {
    controls?.pause();
  } else if (controls) {
    controls.play();
  } else {
    controls = animate(SEQUENCE, { repeat: Infinity, repeatDelay: REST });
  }
});
</script>

<template>
  <div
    ref="scope"
    class="diagram"
    role="img"
    aria-label="Your AI tool calls Lucide MCP through tools such as search_icons."
  >
    <div class="node node-server">
      <span class="glow" />
      <span class="node-icon">
        <Icon
          :iconNode="cloud"
          name="cloud"
          :size="24"
        />
      </span>
      <span class="node-title">Lucide MCP</span>
    </div>

    <div class="connector">
      <svg
        class="line"
        aria-hidden="true"
        focusable="false"
      >
        <line
          x1="0.5"
          y1="0"
          x2="0.5"
          y2="100%"
        />
      </svg>
      <span class="dot dot-request" />
      <span class="dot dot-response" />
      <span class="tool tool-call">{{ toolName }}</span>
      <span class="tool tool-result">{{ result }}</span>
    </div>

    <div class="node node-client">
      <span class="glow" />
      <span class="node-icon">
        <Icon
          :iconNode="bot"
          name="bot"
          :size="24"
        />
      </span>
      <span class="node-title">Your AI Tool</span>
    </div>
  </div>
</template>

<style scoped>
.diagram {
  width: 230px;
}

.node {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background-color: var(--vp-c-bg-soft);
}

.glow {
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  box-shadow:
    0 0 0 1px var(--vp-c-brand-3),
    0 0 24px -2px var(--vp-c-brand-3);
  opacity: 0;
  pointer-events: none;
}

.node-icon {
  display: flex;
  flex: none;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 6px;
  background-color: var(--vp-c-bg);
  color: var(--vp-c-brand-3);
}

.node-title {
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.connector {
  position: relative;
  height: 278px;
}

.line {
  position: absolute;
  top: 0;
  left: 50%;
  width: 1px;
  height: 100%;
}

.line line {
  stroke: var(--vp-c-border);
  stroke-width: 1;
  stroke-dasharray: 8 0;
  stroke-dashoffset: 0;
}

/* Spans the whole connector, so a percentage `y` is relative to its height at every breakpoint */
.dot {
  position: absolute;
  inset: 0;
  opacity: 0;
  pointer-events: none;
}

.dot::after {
  content: '';
  position: absolute;
  top: -6px;
  left: 50%;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: var(--dot-color);
  transform: translateX(-50%);
}

.dot-request {
  --dot-color: var(--vp-c-brand-3);
}

.dot-response {
  --dot-color: var(--vp-a11y-success);
}

.dot-response::after {
  border-radius: 2px;
}

/* Centred with `translate`, because motion owns this element's `transform` */
.tool {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1;
  translate: -50% -50%;
  font-size: 21px;
  line-height: 17px;
  font-weight: 500;
  white-space: nowrap;
  color: var(--vp-c-text-1);
  text-shadow: 0 4px 20px var(--vp-c-bg);
  opacity: 0;
}


.tool-call, .tool-result {
  font-family: var(--vp-font-family-mono);
  font-size: 15px;
  line-height: 20px;
  white-space: pre;
}

@media (max-width: 959px) {
  .connector {
    height: 180px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .line line {
    stroke-dasharray: 4 4;
  }

  .tool-call {
    opacity: 1;
  }

  .dot-request {
    opacity: 1;
    transform: translateY(74%);
  }
}
</style>
