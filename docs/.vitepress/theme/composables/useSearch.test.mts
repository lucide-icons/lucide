import assert from 'node:assert/strict';
import { test } from 'node:test';
import { computed, ref, shallowRef } from 'vue';
import useSearch from './useSearch.ts';

test('reuses the search index across query changes and clearing the query', () => {
  const collection = shallowRef([{ name: 'alpha' }, { name: 'beta' }]);
  const query = ref('=alpha');
  let reads = 0;
  const results = useSearch(query, collection, [
    {
      name: 'name',
      getFn: (item) => {
        reads++;
        return item.name;
      },
    },
  ]);

  assert.deepEqual(results.value, [collection.value[0]]);
  const initialReads = reads;
  assert.ok(initialReads > 0);

  query.value = '=beta';
  assert.deepEqual(results.value, [collection.value[1]]);
  query.value = '=missing';
  assert.deepEqual(results.value, []);
  query.value = '';
  assert.equal(results.value, collection.value);
  assert.equal(reads, initialReads);

  collection.value = [{ name: 'gamma' }];
  assert.equal(results.value, collection.value);
  query.value = '=gamma';
  assert.deepEqual(results.value, collection.value);
  assert.ok(reads > initialReads);
});

test('updates an active query when metadata arrives or the icon collection changes', () => {
  const icons = shallowRef([{ name: 'alpha' }]);
  const tags = ref<Record<string, string[]>>({});
  const collection = computed(() =>
    icons.value.map((icon) => ({ ...icon, tags: tags.value[icon.name] ?? [] })),
  );
  const query = ref('=newtag');
  const results = useSearch(query, collection, [{ name: 'name' }, { name: 'tags' }]);

  assert.deepEqual(results.value, []);
  tags.value = { alpha: ['newtag'] };
  assert.deepEqual(results.value, collection.value);
  icons.value = [{ name: 'beta' }];
  assert.deepEqual(results.value, []);
  tags.value = { beta: ['newtag'] };
  assert.deepEqual(results.value, collection.value);
});

test('updates the index after reactive item and array mutations', () => {
  const collection = ref([
    { name: 'alpha', aliases: [] as string[], tags: [] as string[], categories: [] as string[] },
  ]);
  const query = ref('=renamed');
  const results = useSearch(query, collection, [
    { name: 'name' },
    { name: 'aliases' },
    { name: 'tags' },
    { name: 'categories' },
  ]);

  assert.deepEqual(results.value, []);
  collection.value[0].name = 'renamed';
  assert.deepEqual(results.value, collection.value);
  query.value = '=alpha';
  assert.deepEqual(results.value, []);

  for (const field of ['aliases', 'tags', 'categories'] as const) {
    query.value = `=new${field}`;
    assert.deepEqual(results.value, []);
    collection.value[0][field].push(`new${field}`);
    assert.deepEqual(results.value, collection.value);
  }

  query.value = '=beta';
  assert.deepEqual(results.value, []);
  collection.value.push({ name: 'beta', aliases: [], tags: [], categories: [] });
  assert.deepEqual(results.value, [collection.value[1]]);
});

test('keeps separate search instances independent', () => {
  const first = shallowRef([{ name: 'alpha' }]);
  const second = shallowRef([{ name: 'beta' }]);
  const firstQuery = ref('=alpha');
  const secondQuery = ref('=alpha');
  const firstResults = useSearch(firstQuery, first, [{ name: 'name' }]);
  const secondResults = useSearch(secondQuery, second, [{ name: 'name' }]);

  assert.deepEqual(firstResults.value, first.value);
  assert.deepEqual(secondResults.value, []);
  first.value = [{ name: 'gamma' }];
  firstQuery.value = '=gamma';
  assert.deepEqual(firstResults.value, first.value);
  assert.deepEqual(secondResults.value, []);
  secondQuery.value = '=beta';
  assert.deepEqual(secondResults.value, second.value);
  assert.deepEqual(firstResults.value, first.value);
});
