import axios from 'axios'
import history from '../history'

const GET_ITEMS_FROM_CART = 'GET_ITEMS_FROM_CART'

const initialState = []

const setCart = cartItems => {
  return {
    type: GET_ITEMS_FROM_CART,
    cartItems
  }
}

export const fetchCartItems = () => {
  return async function(dispatch) {
    try {
      const {data} = await axios.get('/api/orders/cart')
      dispatch(setCart(data))
    } catch (error) {
      console.log('Probelm Getting Cart Items!')
    }
  }
}

export const addCartItem = item => {
  return async function(dispatch) {
    try {
      console.log('clicked')
      await axios.put('/api/orders/cart/addItem', item)
      const {data} = await axios.get('/api/orders/cart')
      dispatch(setCart(data))
    } catch {
      console.log('Problem Adding a Cart Item!')
    }
  }
}
const cart = (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEMS_FROM_CART:
      return action.cartItems
    default:
      return state
  }
}

export default cart
