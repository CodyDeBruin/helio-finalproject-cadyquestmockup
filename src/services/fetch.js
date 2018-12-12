const _apiDomain = "https://articlesapi-pkkukkingf.now.sh"

export const makeRequest = ( url, method, body ) => {
  const reqContent = {
    method: method,
    body: JSON.stringify(body),
    headers: {
        "Content-Type": "application/json; charset=utf-8",
    },
  }
    return fetch(new Request(`${_apiDomain}/${url}`, reqContent)) 
}