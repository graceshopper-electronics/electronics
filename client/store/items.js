import axios from 'axios'

/**
 * ACTION TYPES
 */
const SET_ITEMS = 'SET_ITEMS'

/**
 * INITIAL STATE
 */
const itemsArray = []

/**
 * ACTION CREATORS
 */
const setItems = items => ({type: SET_ITEMS, items})

/**
 * THUNK CREATOR
 */
export const fetchItemsThunk = () => async dispatch => {
  try {
    const res = await axios.get('/api/items')
    dispatch(setItems(res.data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = itemsArray, action) {
  switch (action.type) {
    case SET_ITEMS:
      return action.items
    default:
      return state
  }
}
