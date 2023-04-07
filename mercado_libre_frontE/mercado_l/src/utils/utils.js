export const fetchData = async (url) => {
    const response = await fetch(url, {
      method : 'GET',
      mode : 'cors'
    })
    const data = await response.json()
    return data
  }