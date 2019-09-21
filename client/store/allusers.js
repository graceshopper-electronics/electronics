import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ALL_USERS = 'GET_ALL_USERS'
const DELETE_USER = 'DELETE_USER'

/**
 * INITIAL STATE
 */

const allUsers = []

/**
 * ACTION CREATORS
 */
const getAllUsers = users => ({type: GET_ALL_USERS, users})
const deleteUser = id => ({type: DELETE_USER, id})
/**
 * THUNK CREATORS
 */
export const fetchUsersThunk = () => async dispatch => {
  try {
    const res = await axios.get('/api/users')
    dispatch(getAllUsers(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const deleteUserThunk = id => async dispatch => {
  try {
    await axios.delete(`/api/users/${id}`)
    dispatch(deleteUser())
  } catch (err) {
    console.error(err)
  }
}
/**
 * REDUCER
 */
export default function(state = allUsers, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return action.users
    case DELETE_USER:
      return state.filter(user => user.id !== action.id)
    default:
      return state
  }
}
