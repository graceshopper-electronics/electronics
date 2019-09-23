import axios from 'axios'
import history from '../history'

const GET_ITEMS_FROM_CART = 'GET_ITEMS_FROM_CART'
const DELETE_ITEM_FROM_CART = 'DELETE_ITEM_FROM_CART'
const WRITE_QUANTITY = 'WRITE_QUANTITY'
const MERGE_ITEMS_FROM_CART = 'MERGE_ITEMS_FROM_CART'

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

export const placeOrder = orderId => {
  return async function(dispatch) {
    try {
      await axios.put(`/api/cart/placeOrder/${orderId}`)
      const {data} = await axios.get('/api/cart')
      dispatch(setCart(data)) // this will recreate an empty cart for the user/guest in the db as well
    } catch (error) {
      console.log('Problem placing cart order!')
    }
  }
}

export const cancelOrder = orderId => {
  return async function(dispatch) {
    try {
      await axios.put(`/api/cart/cancelOrder/${orderId}`)
      // make note to possibly change state of OrderHistory
    } catch (error) {
      console.log('Problem canceling order!')
    }
  }
}
export const updateQuantity = (itemId, quantity) => {
  return async function(dispatch) {
    try {
      await axios.put(`/api/cart/quantity/${itemId}`, {quantity})
      dispatch(writeQuantity(itemId, quantity))
    } catch (error) {
      console.log('Problem updating Quantity of a Cart Item!')
    }
  }
}

export const mergeToUser = (guestId, userId) => {
  return async function(dispatch) {
    try {
      const guestOrder = await axios.get(`/api/cart/${guestId}`)
      const orderId = guestOrder.data.id
      const items = guestOrder.data.items
      if (items.length > 0) {
        items.forEach(async item => {
          await axios.put(`/api/cart/mergeItem/${item.id}/${userId}`)
        })
      }
      await axios.put(`/api/cart/clear/${orderId}`) // resets guest cart to an empty cart
      const {data} = await axios.get('/api/cart')
      dispatch(setCart(data)) // this will fetch the true user cart from the database
    } catch (error) {
      console.log('Problem merging guest cart to user cart!')
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
