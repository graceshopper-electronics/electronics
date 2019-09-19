import axios from 'axios'

/**
 * ACTION TYPES
 */
const SET_CATEGORIES = 'SET_CATEGORIES'

/**
 * INITIAL STATE
 */
const categories = []

/**
 * ACTION CREATORS
 */
const setCategories = ctgList => ({type: SET_CATEGORIES, ctgList})

/**
 * THUNK CREATOR
 */
export const fetchCategoriesThunk = () => async dispatch => {
  try {
    const res = await axios.get('/api/categories')
    dispatch(setCategories(res.data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = categories, action) {
  switch (action.type) {
    case SET_CATEGORIES:
      return action.ctgList
    default:
      return state
  }
}
