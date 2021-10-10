import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.baseURL,
})

const fetchProducts = () => {
  return instance.get('/products')
}

const fetchProductById = (id) => {
  return instance.get(`/products/${id}`)
}

const fetchProductsByKeyword = (keyword) => {
  return instance.get(`products`, {
    params: {
      name_like: keyword,
    },
  })
}

const fetchCartItems = () => {
  return instance.get('/carts')
}

const createCartItem = (cartItem) => {
  return instance.post('/carts', cartItem)
}

export {
  fetchProducts,
  fetchProductById,
  fetchProductsByKeyword,
  fetchCartItems,
  createCartItem,
}
