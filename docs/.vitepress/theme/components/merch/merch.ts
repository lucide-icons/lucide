import type { InjectionKey } from 'vue';

export interface MerchProduct {
  name: string;
  slug: string;
  url: string;
  image: string;
  /** Lowest variant price, already formatted, e.g. "From $24.00". */
  price: string;
}

/**
 * How the merch fallback lays itself out in an ad slot.
 * `slider` fits the 224px aside and floating overlay, `pair` the wide card on the home page.
 */
export type MerchLayout = 'slider' | 'pair';
export const merchLayoutKey: InjectionKey<MerchLayout> = Symbol('merch-layout');

export function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
