import axios from 'axios'

/**
 * ACTION TYPES
 */
const SET_SINGLE_ITEM = 'SET_SINGLE_ITEM'
const UPDATE_ITEM = 'UPDATE_ITEM'
const ASSIGN_CATEGORY = 'ASSIGN_CATEGORY'
const UNASSIGN_CATEGORY = 'UNASSIGN_CATEGORY'

/**
 * INITIAL STATE
 */
const singleitem = {}

/**
 * ACTION CREATORS
 */

const updateItem = item => ({type: UPDATE_ITEM, item})
const setSingleItem = item => ({type: SET_SINGLE_ITEM, item})
const assignCategory = item => ({type: ASSIGN_CATEGORY, item})
const unassignCategory = item => ({type: UNASSIGN_CATEGORY, item})
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

export const assignCategoryThunk = (itemId, catName) => {
  return async dispatch => {
    try {
      const res = await axios.put(`/api/items/assign/${itemId}`, catName)
      dispatch(assignCategory(res.data))
    } catch (err) {
      console.log('Error', err)
    }
  }
}

export const unassignCategoryThunk = (itemId, categoryId) => {
  return async dispatch => {
    try {
      const res = await axios.put(`/api/items/unassign/${itemId}`, categoryId)
      dispatch(unassignCategory(res.data))
    } catch (err) {
      console.log('Error', err)
    }
  }
}

/**
 * REDUCER
 */
export default function(state = singleitem, action) {
  switch (action.type) {
    case SET_SINGLE_ITEM: {
      return action.item
    }
    case UPDATE_ITEM: {
      return action.item
    }
    case ASSIGN_CATEGORY: {
      return action.item
    }
    case UNASSIGN_CATEGORY: {
      return action.item
    }
    default: {
      return state
    }
  }
}
