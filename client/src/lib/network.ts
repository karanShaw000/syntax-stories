const getBaseUrl = (): string => {
  if (import.meta.env.DEV) {
    return 'http://localhost:5000/api';
  }

  return "https://syntaxstories.azurewebsites.net/api"
}

export default getBaseUrl
