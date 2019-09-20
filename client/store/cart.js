import axios from 'axios'
import history from '../history'

const GET_ITEMS_FROM_CART = 'GET_ITEMS_FROM_CART'
const DELETE_ITEM_FROM_CART = 'DELETE_ITEM_FROM_CART'
const WRITE_QUANTITY = 'WRITE_QUANTITY'

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

export const writeQuantity = (itemId, quantity) => {
  return {
    type: WRITE_QUANTITY,
    quantity,
    itemId
  }
}

export const fetchCartItems = () => {
  return async function(dispatch) {
    try {
      const {data} = await axios.get('/api/cart')
      dispatch(setCart(data))
    } catch (error) {
      console.log('Problem Getting Cart Items!')
    }
  }
}

export const addCartItem = item => {
  return async function(dispatch) {
    try {
      await axios.put(`/api/cart/addItem/${item.id}`)
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

export const updateQuantity = (itemId, quantity) => {
  return async function(dispatch) {
    try {
      await axios.put(`/api/cart/quantity/${itemId}`, {quantity})
      console.log('Updated Quantity!')
      dispatch(writeQuantity(itemId, quantity))
    } catch (error) {
      console.log('Problem updating Quantity of a Cart Item!')
    }
  }
}

const cart = (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEMS_FROM_CART:
      return action.cart

    case DELETE_ITEM_FROM_CART:
      const items = [...state.items]
      const afterDeleteState = items.filter(item => {
        return item.id !== action.itemId
      })
      return {...state, items: afterDeleteState}

    case WRITE_QUANTITY:
      const quantity = action.quantity
      const itemId = action.itemId
      const newItems = state.items.map(item => {
        if (item.id === itemId) {
          item.orderdetails.itemQuantity = quantity
        }
        return item
      })
      return {...state, items: newItems}

    default:
      return state
  }
}

export default cart
