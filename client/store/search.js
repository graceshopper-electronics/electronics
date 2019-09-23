const SET_SEARCH = 'SET_SEARCH'

export function setSearch(search) {
  return {
    type: SET_SEARCH,
    search
  }
}

const initialState = ''

export default function searchReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SEARCH:
      return action.search
    default:
      return state
  }
}
