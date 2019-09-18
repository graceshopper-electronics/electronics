import axios from 'axios'

const SET_ORDER_HISTORY = 'SET_ORDER_HISTORY'

export function setOrderHistory(orderHistory) {
  return {
    type: SET_ORDER_HISTORY,
    orderHistory
  }
}

export const fetchOrderHistory = () => {
  return async dispatch => {
    try {
      const response = await axios.get('/api/orders/history')
      let orderhistory = response.data
      dispatch(setOrderHistory(orderhistory))
    } catch (err) {
      console.log('Error retrieving order history', err)
    }
  }
}

const initialState = []

export default function orderHistoryReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ORDER_HISTORY:
      return action.orderHistory
    default:
      return state
  }
}
