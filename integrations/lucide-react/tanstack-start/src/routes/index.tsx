import { Link, createFileRoute } from '@tanstack/react-router';
import IconShowcase from '../IconShowcase';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  return (
    <>
      <IconShowcase />
      <Link to="/about">About</Link>
    </>
  );
}
