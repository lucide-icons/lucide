// eslint-disable-next-line import/no-extraneous-dependencies
import fetch, { Headers } from 'node-fetch';

const githubApi = async endpoint => {
  const headers = new Headers();
  const username = 'ericfennis';
  const password = process.env.GITHUB_API_KEY;

  headers.set(
    'Authorization',
    `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`,
  );

  const res = await fetch(endpoint, {
    method: 'GET',
    headers,
  });

  return res.json();
};

export default githubApi;
