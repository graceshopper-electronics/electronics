import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ALL_USERS = 'GET_ALL_USERS'
const DELETE_USER = 'DELETE_USER'
const PROMOTE_USER = 'PROMOTE_USER'
const PASS_RESET = 'PASS_RESET'
/**
 * INITIAL STATE
 */

const allUsers = []

/**
 * ACTION CREATORS
 */
const getAllUsers = users => ({type: GET_ALL_USERS, users})
const deleteUser = id => ({type: DELETE_USER, id})
const promoteUser = id => ({type: PROMOTE_USER, id})
const passReset = id => ({type: PASS_RESET, id})
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

export const passResetThunk = id => async dispatch => {
  try {
    await axios.put(`/api/users/reset/${id}`)
    dispatch(passReset(id))
  } catch (err) {
    console.error(err)
  }
}

export const deleteUserThunk = id => async dispatch => {
  try {
    await axios.delete(`/api/users/${id}`)
    dispatch(deleteUser(id))
  } catch (err) {
    console.error(err)
  }
}

export const promoteUserThunk = id => async dispatch => {
  try {
    await axios.put(`/api/users/admin/${id}`)
    dispatch(promoteUser(id))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = allUsers, action) {
  switch (action.type) {
    case GET_ALL_USERS: {
      return action.users
    }
    case DELETE_USER: {
      return state.filter(user => user.id !== Number(action.id))
    }
    case PROMOTE_USER: {
      return state.map(user => {
        if (user.id === Number(action.id)) {
          if (!user.isAdmin) {
            user.isAdmin = true
          } else {
            user.isAdmin = false
          }
        }
        return user
      })
    }
    case PASS_RESET: {
      return state.map(user => {
        if (user.id === Number(action.id)) {
          user.resetPassword = true
        }
        return user
      })
    }
    default: {
      return state
    }
  }
}
