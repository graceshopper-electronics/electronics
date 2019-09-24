import axios from 'axios'

const GET_ITEMS_BY_CATEGORY = 'GET_ITEMS_BY_CATEGORY'

const catItems = ctgItems => ({type: GET_ITEMS_BY_CATEGORY, ctgItems})

export const fetchByCategoryThunk = id => async dispatch => {
  try {
    const res = await axios.get(`/api/items/categories/${id}`)
    console.log('inside thunk', res.data)
    dispatch(catItems(res.data))
  } catch (err) {
    console.error(err)
  }
}

const categoryItems = []

export default function(state = categoryItems, action) {
  switch (action.type) {
    case GET_ITEMS_BY_CATEGORY: {
      console.log(action)
      return action.ctgItems
    }
    default: {
      return state
    }
  }
}
