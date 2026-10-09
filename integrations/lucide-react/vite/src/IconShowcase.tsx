import { Camera, House, LucideProvider, Pen } from 'lucide-react';
import Droplet from 'lucide-react/icons/droplet';
import Edit2 from 'lucide-react/dist/esm/icons/edit-2.mjs';
import { DynamicIcon } from 'lucide-react/dynamic';

export default function IconShowcase() {
  return (
    <main aria-label="Lucide integration">
      <Camera data-testid="static-icon" />
      <Droplet
        data-testid="custom-icon"
        className="consumer-icon"
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
      <DynamicIcon
        aria-label="Dynamic circle"
        data-testid="dynamic-icon"
        name="circle"
      />
    </main>
  );
}
