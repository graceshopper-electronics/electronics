import axios from 'axios'
import history from '../history'

const GET_ITEMS_FROM_CART = 'GET_ITEMS_FROM_CART'
const DELETE_ITEM_FROM_CART = 'DELETE_ITEM_FROM_CART'

const initialState = []

const setCart = cart => {
  return {
    type: GET_ITEMS_FROM_CART,
    cart
  }
}

const deleteItem = itemId => {
  return {
    type: DELETE_ITEM_FROM_CART,
    itemId
  }
}

export const fetchCartItems = () => {
  return async function(dispatch) {
    try {
      const {data} = await axios.get('/api/cart')
      console.log('cart Incoming: ', data)
      dispatch(setCart(data))
    } catch (error) {
      console.log('Problem Getting Cart Items!')
    }
  }
}

export const addCartItem = item => {
  return async function(dispatch) {
    try {
      await axios.put('/api/cart/addItem', item)
      const {data} = await axios.get('/api/cart')
      dispatch(setCart(data))
    } catch (error) {
      console.log('Problem Adding a Cart Item!')
    }
  }
}

export const deleteCartItem = itemId => {
  return async function(dispatch) {
    try {
      await axios.delete(`/api/cart/${itemId}`)
      dispatch(deleteItem(itemId))
    } catch (error) {
      console.log('Problem deleting a Cart Item!')
    }
  }
}
const cart = (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEMS_FROM_CART:
      return action.cart
    case DELETE_ITEM_FROM_CART:
      const newState = state.filter(item => {
        return item.id !== action.itemId
      })
      return newState
    default:
      return state
  }
}

export default cart
