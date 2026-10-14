import { Loading } from 'solid-js';
import { Router } from './router';

export default function App() {
  return <Router>{(props) => <Loading>{props.children}</Loading>}</Router>;
}
