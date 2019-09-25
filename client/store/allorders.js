import axios from 'axios'

/**
 * ACTION TYPES
 */
const SET_ORDERS = 'SET_ORDERS'
const GET_ALL_ORDERS = 'GET_ALL_ORDERS'

/**
 * INITIAL STATE
 */

const allOrders = []

/**
 * ACTION CREATORS
 */
const getAllOrders = orders => ({type: GET_ALL_ORDERS, orders})
const setOrders = orders => ({type: SET_ORDERS, orders})

/**
 * THUNK CREATORS
 */
export const fetchAllOrdersThunk = () => async dispatch => {
  try {
    const res = await axios.get('/api/orders/')
    dispatch(getAllOrders(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const setSearchedOrders = orders => dispatch => {
  dispatch(setOrders(orders))
}

/**
 * REDUCER
 */
export default function(state = allOrders, action) {
  switch (action.type) {
    case GET_ALL_ORDERS: {
      return action.orders
    }
    case SET_ORDERS: {
      return action.orders
    }
    default: {
      return state
    }
  }
}
