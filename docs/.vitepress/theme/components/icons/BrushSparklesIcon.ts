import { createLucideIcon, IconNode } from '@lucide/vue';

const brushSparkles: IconNode = [
  ['path', { d: 'M10 3H8' }],
  ['path', { d: 'm11 10 3 3' }],
  ['path', { d: 'M20 15v4' }],
  ['path', { d: 'M22 17h-4' }],
  ['path', { d: 'M4 5v4' }],
  ['path', { d: 'M6 7H2' }],
  ['path', { d: 'M6.5 21A3.5 3.5 0 103 17.5a2.62 2.62 0 01-.708 1.792A1 1 0 003 21z' }],
  ['path', { d: 'M9 2v2' }],
  ['path', { d: 'M9.969 17.031 21.378 5.624a1 1 0 00-3.002-3.002L6.967 14.031' }],
];

const BrushSparklesIcon = createLucideIcon('BrushSparkels', brushSparkles);

export default BrushSparklesIcon;
