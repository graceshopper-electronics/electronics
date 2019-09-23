import axios from 'axios'

/**
 * ACTION TYPES
 */
const SET_CATEGORIES = 'SET_CATEGORIES'
const DELETE_CATEGORY = 'DELETE_CATEGORY'
const ADD_CATEGORY = 'ADD_CATEGORY'
const UPDATE_CATEGORY = 'UPDATE_CATEGORY'

/**
 * INITIAL STATE
 */
const categories = []

/**
 * ACTION CREATORS
 */
const setCategories = ctgList => ({type: SET_CATEGORIES, ctgList})
const deleteCategory = id => ({type: DELETE_CATEGORY, id})
const addCategory = obj => ({type: ADD_CATEGORY, obj})
const updateCategory = obj => ({type: UPDATE_CATEGORY, obj})

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

export const deleteCategoryThunk = id => {
  return async dispatch => {
    try {
      await axios.delete(`/api/categories/${id}`)
      dispatch(deleteCategory(id))
    } catch (err) {
      console.log('Error', err)
    }
  }
}

export const addCategoryThunk = obj => {
  return async dispatch => {
    try {
      const res = await axios.post('/api/categories', obj)
      dispatch(addCategory(res.data))
    } catch (err) {
      console.log('Error', err)
    }
  }
}

export const updateCategoryThunk = (id, obj) => async dispatch => {
  try {
    const res = await axios.put(`/api/categories/${id}`, obj)
    dispatch(updateCategory(res.data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = categories, action) {
  switch (action.type) {
    case SET_CATEGORIES: {
      return action.ctgList
    }
    case ADD_CATEGORY: {
      return [...state, action.obj]
    }
    case UPDATE_CATEGORY: {
      return state.map(ctg => {
        if (ctg.id === Number(action.obj.id)) {
          ctg = action.obj
        }
        return ctg
      })
    }
    case DELETE_CATEGORY: {
      return state.filter(ctg => ctg.id !== Number(action.id))
    }
    default: {
      return state
    }
  }
}
