import fetch, { Headers } from 'node-fetch';

class HTTPResponseError extends Error {
  constructor(response) {
    super(`HTTP Error Response: ${response.status} ${response.statusText}`);
    this.response = response;
  }
}

const githubApi = async (endpoint) => {
  const headers = new Headers();
  const username = process.env['GITHUB_USERNAME'] ?? 'ericfennis';
  const password = process.env['GITHUB_API_KEY'];

  headers.set(
    'Authorization',
    `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`,
  );

  const res = await fetch(endpoint, {
    method: 'GET',
    headers,
  });

  if (!res.ok) {
    throw new HTTPResponseError(res);
  }

  return res.json();
};

export default githubApi;
