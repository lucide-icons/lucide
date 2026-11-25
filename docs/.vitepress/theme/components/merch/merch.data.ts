import { loadEnvFile } from 'node:process';
import type { MerchProduct } from './merch.ts';

/**
 * Loads the products of the Lucide merch store (merch.lucide.dev, a Fourthwall shop) at build
 * time, so the fallback card for blocked ads never needs the storefront token in the browser.
 *
 * Needs `FOURTHWALL_STOREFRONT_TOKEN`. Without it the list is empty and the card links to the
 * store without a product.
 */

try {
  // Load environment variables from docs/.env, if it exists.
  loadEnvFile('.env');
} catch {
  // No .env file, so rely on the environment as-is.
}

const STORE_URL = 'https://merch.lucide.dev';
const API_URL = 'https://storefront-api.fourthwall.com/v1/collections/all/products';
const CURRENCY = 'USD';
const UTM = 'utm_source=lucide.dev&utm_medium=merch-fallback';

interface FourthwallMoney {
  value: number;
  currency: string;
}

interface FourthwallProduct {
  type?: 'PRODUCT' | 'BUNDLE';
  name: string;
  slug: string;
  state?: { type: 'AVAILABLE' | 'SOLD_OUT' };
  access?: { type: 'PUBLIC' | 'HIDDEN' | 'PRIVATE' | 'ARCHIVED' };
  images?: { url: string; transformedUrl?: string }[];
  variants?: { unitPrice?: FourthwallMoney; images?: { url: string; transformedUrl?: string }[] }[];
}

interface FourthwallPage {
  results: FourthwallProduct[];
  paging?: { hasNextPage?: boolean };
}

async function fetchAllProducts(token: string) {
  const products: FourthwallProduct[] = [];

  for (let page = 0; page < 10; page++) {
    const params = new URLSearchParams({
      storefront_token: token,
      currency: CURRENCY,
      page: String(page),
      size: '50',
    });
    const response = await fetch(`${API_URL}?${params}`);

    if (!response.ok) {
      throw new Error(`Fourthwall responded with ${response.status} ${response.statusText}`);
    }

    const data = (await response.json()) as FourthwallPage;
    products.push(...data.results);

    if (!data.paging?.hasNextPage) break;
  }

  return products;
}

function toMerchProduct(product: FourthwallProduct): MerchProduct | null {
  if (product.type === 'BUNDLE') return null;
  if (product.state?.type !== 'AVAILABLE') return null;
  if (product.access && product.access.type !== 'PUBLIC') return null;

  const image = product.images?.[0] ?? product.variants?.find((v) => v.images?.length)?.images?.[0];
  const prices = (product.variants ?? [])
    .map((variant) => variant.unitPrice)
    .filter((price): price is FourthwallMoney => price != null);

  if (!image || prices.length === 0) return null;

  const lowest = prices.reduce((min, price) => (price.value < min.value ? price : min));
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: lowest.currency,
  });
  const samePrice = prices.every((price) => price.value === lowest.value);

  return {
    name: product.name,
    slug: product.slug,
    url: `${STORE_URL}/products/${product.slug}?${UTM}`,
    image: image.transformedUrl ?? image.url,
    price: `${samePrice ? '' : 'From '}${formatter.format(lowest.value)}`,
  };
}

export interface MerchData {
  storeUrl: string;
  products: MerchProduct[];
}

declare const data: MerchData;
export { data };

export default {
  async load(): Promise<MerchData> {
    const token = process.env.FOURTHWALL_STOREFRONT_TOKEN;
    let products: MerchProduct[] = [];

    if (!token) {
      console.warn(
        'FOURTHWALL_STOREFRONT_TOKEN is not set, the merch card links to the store only.',
      );
    } else {
      try {
        const results = await fetchAllProducts(token);
        products = results.map(toMerchProduct).filter((product) => product != null);
      } catch (error) {
        console.warn(`Could not fetch merch, the merch card links to the store only. ${error}`);
      }
    }

    return { storeUrl: `${STORE_URL}/?${UTM}`, products };
  },
};
