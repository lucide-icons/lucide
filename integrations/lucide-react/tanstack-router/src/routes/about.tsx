import { Link, createFileRoute } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';

export const Route = createFileRoute('/about')({
  component: About,
});

function About() {
  return (
    <main>
      <ArrowLeft data-testid="route-icon" />
      <Link to="/">Home</Link>
    </main>
  );
}
