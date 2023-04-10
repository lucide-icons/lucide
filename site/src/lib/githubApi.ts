import fetch from 'node-fetch';

const githubHeaders = () => {
  const token = process.env['GITHUB_TOKEN'];
  const username = process.env['GITHUB_USERNAME'];
  const password = process.env['GITHUB_API_KEY'];
  const auth = token ? `Bearer ${token}` : `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`;
  return {
    'Authorization': auth,
  }
};

const get = async (endpoint: string, params = {}) => {
  const urlParams = new URLSearchParams(params);
  console.error('making a request to ', `https://api.github.com/repos/lucide-icons/lucide${endpoint}?${urlParams.toString()}`);
  const response = await fetch(
    `https://api.github.com/repos/lucide-icons/lucide${endpoint}?${urlParams.toString()}`,
    {
      method: 'GET',
      headers: githubHeaders()
    },
  );
  if (response.status !== 200) {
    throw new Error(response.statusText + ': ' + await response.text());
  }
  return response;
}

const getAll = async (endpoint: string, params = {}) => {
  try {
    const resources = [];
    let response = await get(endpoint, {...params, per_page: 100});
    while (response) {
      const responseArray = await response.json();
      if (!Array.isArray(responseArray)) {
        throw new Error('Github API resource response is expected to be an array.');
      }
      resources.push(...responseArray);
      const nextLink = response.headers.has('link') ? response.headers.get('link').match(/<([^>]+)>; rel="next"/) : false;
      if (nextLink) {
        response = await fetch(
          nextLink[1],
          {
            method: 'GET',
            headers: githubHeaders()
          },
        )
      } else {
        response = null;
      }
    }
    return resources;
  } catch (error) {
    throw new Error(error);
  }
}

const GithubApi = {
  get,
  getAll
};

export default GithubApi;
