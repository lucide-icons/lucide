import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';

export default function About() {
  return (
    <main>
      <ArrowLeft data-testid="route-icon" />
      <Link to="/">Home</Link>
    </main>
  );
}
