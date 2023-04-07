const fetch = require('node-Fetch')

function getProducts(query) {
  return Fetch('https://api.mercadolibre.com/sites/MLA/search?q=' + query)
    .then((response) => response.json())
    .then((data) => {
      const categories =
        data.filters.length > 0
          ? data.filters
              .filter((filter) => filter.id === 'category')[0]
              .values.map((category) => category.name)
          : []

      const items =
        data.results.length > 0
          ? data.results.map((item) => {
              const itemId = item.id

              const currencyId = item.currency_id
              return fetch(
                `https://api.mercadolibre.com/currencies/${currencyId}`
              )
                .then((response) => response.json())
                .then((priceData) => {
                  return {
                    id: itemId,
                    title: item.title,
                    price: {
                      currency: priceData.symbol,
                      amount: item.price,
                      decimals: priceData.decimal_places,
                    },
                    author: item.seller.nickname,
                    picture: item.thumbnail,
                    condition: item.condition,
                    free_shipping: Boolean(item.shipping.free_shipping),
                    city: item.address.city_name,
                  }
                })
            })
          : []

      return Promise.all(items).then((results) => {
        const response = {
          categories,
          items: results,
        }
        return response
      })
    })
}

function getProductInformation(productId) {
  if (!productId) {
    throw new Error('No existe product ID')
  } else {
    return fetch(`https://api.mercadolibre.com/items/${productId}`)
      .then((response) => response.json())
      .then((data) => {
        const sellerInformation = fetch(
          `https://api.mercadolibre.com/users/${data.seller_id}`
        ).then((response) => response.json())

        const priceInformation = fetch(
          `https://api.mercadolibre.com/currencies/${data.currency_id}`
        ).then((response) => response.json())

        const itemDescriptionInformation = fetch(
          `https://api.mercadolibre.com/items/${productId}/description`
        ).then((response) => response.json())

        return Promise.all([
          sellerInformation,
          priceInformation,
          itemDescriptionInformation,
        ]).then((results) => {
          const response = {
            author: results[0].nickname,
            item: {
              id: productId,
              title: data.title,
              price: {
                currency: results[1].symbol,
                amount: data.price,
                decimals: results[1].decimal_places,
              },
            },
            picture: data.thumbnail,
            condition: data.condition,
            free_shipping: Boolean(data.shipping.free_shipping),
            sold_quantity: data.sold_quantity,
            description: results[2].plain_text,
          }
          return response
        })
      })
  }
}

module.exports = {
  getProducts,
  getProductInformation,
}