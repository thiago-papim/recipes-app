export const apiSearch = async (url) => {
  const URL_API = `${url}`;
  const response = await fetch(URL_API);
  const data = await response.json();
  return data;
};
