import { A } from '@solidjs/router';
import { ArrowLeft } from 'lucide-solid';

export default function About() {
  return (
    <main>
      <ArrowLeft data-testid="route-icon" />
      <A href="/">Home</A>
    </main>
  );
}
