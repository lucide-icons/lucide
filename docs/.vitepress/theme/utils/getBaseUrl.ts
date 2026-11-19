const getBaseUrl = () => {
  return import.meta.env.DEV ? 'http://localhost:3000' : '';
};

export default getBaseUrl;
