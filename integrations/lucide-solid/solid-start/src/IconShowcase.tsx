import { Camera, Droplet, Edit2, House, LucideProvider, Pen } from 'lucide-solid';
import Circle from 'lucide-solid/icons/circle';

export default function IconShowcase() {
  return (
    <main aria-label="Lucide integration">
      <Camera data-testid="static-icon" />
      <Droplet
        data-testid="custom-icon"
        class="consumer-icon"
        color="red"
        size={48}
        strokeWidth={4}
        absoluteStrokeWidth
      />
      <LucideProvider
        color="purple"
        size={32}
        strokeWidth={3}
      >
        <House data-testid="provider-icon" />
      </LucideProvider>
      <Pen data-testid="alias-icon" />
      <Edit2 data-testid="canonical-icon" />
      <Circle
        aria-label="Deep import circle"
        data-testid="deep-import-icon"
      />
    </main>
  );
}
