import axios from 'axios'
import {setSearch} from './search'
/**
 * ACTION TYPES
 */
const SET_ITEMS = 'SET_ITEMS'
const ADD_ITEM = 'ADD_ITEM'
const DELETE_ITEM = 'DELETE_ITEM'

/**
 * INITIAL STATE
 */
const itemsArray = []

/**
 * ACTION CREATORS
 */
const setItems = items => ({type: SET_ITEMS, items})
const addItem = item => ({type: ADD_ITEM, item})
const deleteItem = id => ({type: DELETE_ITEM, id})

/**
 * THUNK CREATOR
 */
export const fetchItemsThunk = () => async dispatch => {
  try {
    const res = await axios.get('/api/items')
    dispatch(setItems(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const fetchSearchItems = search => async dispatch => {
  try {
    const res = await axios.get(`/api/items?search=${search}`)
    dispatch(setSearch(search))
    dispatch(setItems(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const setSearchedItems = items => dispatch => {
  dispatch(setItems(items))
}

export const addItemThunk = item => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/items', item)
      dispatch(addItem(data))
    } catch (err) {
      console.log('Error', err)
    }
  }
}

export const deleteItemThunk = id => {
  return async dispatch => {
    try {
      await axios.delete(`/api/items/${id}`)
      dispatch(deleteItem(id))
    } catch (err) {
      console.log('Error', err)
    }
  }
}

/**
 * REDUCER
 */
export default function(state = itemsArray, action) {
  switch (action.type) {
    case SET_ITEMS: {
      return action.items
    }
    case ADD_ITEM: {
      return [...state, action.item]
    }
    case DELETE_ITEM: {
      return state.filter(item => item.id !== Number(action.id))
    }
    default: {
      return state
    }
  }
}
