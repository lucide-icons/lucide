import { A } from '@solidjs/router';
import IconShowcase from '../IconShowcase';

export default function Home() {
  return (
    <>
      <IconShowcase />
      <A href="/about">About</A>
    </>
  );
}
