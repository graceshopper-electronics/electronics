import axios from 'axios'

/**
 * ACTION TYPES
 */
const SET_SINGLE_ITEM = 'SET_SINGLE_ITEM'
const UPDATE_ITEM = 'UPDATE_ITEM'

/**
 * INITIAL STATE
 */
const singleitem = {}

/**
 * ACTION CREATORS
 */

const updateItem = item => ({type: UPDATE_ITEM, item})
const setSingleItem = item => ({type: SET_SINGLE_ITEM, item})

/**
 * THUNK CREATOR
 */

export const fetchSingleItemThunk = id => async dispatch => {
  try {
    const res = await axios.get(`/api/items/${id}`)
    dispatch(setSingleItem(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const updateItemThunk = (id, item) => async dispatch => {
  try {
    const res = await axios.put(`/api/items/${id}`, item)
    dispatch(updateItem(res.data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = singleitem, action) {
  switch (action.type) {
    case SET_SINGLE_ITEM:
      return action.item
    case UPDATE_ITEM:
      return action.item
    default:
      return state
  }
}
