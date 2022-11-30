const githubHeaders = () => {
  const headers = new Headers();
  const token = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME;
  const password = process.env.GITHUB_API_KEY;
  headers.set(
    'Authorization',
    token ? `Bearer ${token}` : `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`,
  );
  return headers;
};

const get = async (endpoint: string, params = {}) => {
  const urlParams = new URLSearchParams(params);
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
      resources.push(...(await response.json()));
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
