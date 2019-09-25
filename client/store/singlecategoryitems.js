import axios from 'axios'

const GET_ITEMS_BY_CATEGORY = 'GET_ITEMS_BY_CATEGORY'
const SORT_ASCENDING = 'SORT_ASCENDING'
const SORT_DESCENDING = 'SORT_DESCENDING'

const catItems = ctgItems => ({type: GET_ITEMS_BY_CATEGORY, ctgItems})
const sortAsc = ctgItems => ({type: SORT_ASCENDING, ctgItems})
const sortDesc = ctgItems => ({type: SORT_DESCENDING, ctgItems})

export const fetchByCategoryThunk = id => async dispatch => {
  try {
    const res = await axios.get(`/api/items/categories/${id}`)
    dispatch(catItems(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const sortAscThunk = items => dispatch => {
  const newArr = items.sort(function(a, b) {
    return a.price - b.price
  })
  dispatch(sortAsc(newArr))
}

export const sortDescThunk = items => dispatch => {
  const newArr = items.sort(function(a, b) {
    return a.price - b.price
  })
  newArr.reverse()
  dispatch(sortDesc(newArr))
}

const categoryItems = []

export default function(state = categoryItems, action) {
  switch (action.type) {
    case GET_ITEMS_BY_CATEGORY: {
      return action.ctgItems
    }
    case SORT_ASCENDING: {
      return action.ctgItems
    }
    case SORT_DESCENDING: {
      return action.ctgItems
    }
    default: {
      return state
    }
  }
}
