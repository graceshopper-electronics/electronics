import axios from 'axios'

const SET_REVIEWS = 'SET_REVIEWS'

export function setReviews(reviews) {
  return {
    type: SET_REVIEWS,
    reviews
  }
}

export const fetchReviews = id => {
  return async dispatch => {
    try {
      const response = await axios.get(`/api/items/${id}`)
      let reviews = response.data
      dispatch(setReviews(reviews))
    } catch (err) {
      console.log('Error retrieving reviews', err)
    }
  }
}

const initialState = []

export default function reviewReducer(state = initialState, action) {
  switch (action.type) {
    case SET_REVIEWS:
      return action.reviews
    default:
      return state
  }
}
