const getBaseUrl = (): string => {
  //dev
  // return 'http://localhost:5000/api';

  //prod 
  return "https://syntaxstories.azurewebsites.net/api"
}

export default getBaseUrl
