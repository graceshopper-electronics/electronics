import axios from 'axios'
import history from '../history'

const GET_ITEMS_FROM_CART = 'GET_ITEMS_FROM_CART'

const initialState = []

const setCart = cart => {
  return {
    type: GET_ITEMS_FROM_CART,
    cart
  }
}

export const fetchCartItems = () => {
  return async function(dispatch) {
    try {
      const {data} = await axios.get('/api/cart')
      console.log('cart Incoming: ', data[0])
      dispatch(setCart(data[0]))
    } catch (error) {
      console.log('Problem Getting Cart Items!')
    }
  }
}

export const addCartItem = item => {
  return async function(dispatch) {
    try {
      console.log('clicked')
      await axios.put('/api/cart/addItem', item)
      const {data} = await axios.get('/api/cart')
      dispatch(setCart(data))
    } catch {
      console.log('Problem Adding a Cart Item!')
    }
  }
}
const cart = (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEMS_FROM_CART:
      return action.cart
    default:
      return state
  }
}

export default cart
