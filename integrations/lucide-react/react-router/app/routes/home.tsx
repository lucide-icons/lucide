import { Link } from 'react-router';
import IconShowcase from '../IconShowcase';

export default function Home() {
  return (
    <>
      <IconShowcase />
      <Link to="/about">About</Link>
    </>
  );
}
