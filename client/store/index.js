import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import cart from './cart'
import items from './items'
import reviews from './review'
import categories from './categories'
import orderHistory from './orderHistory'
import allUsers from './allusers'
import singleitem from './singleitem'

const reducer = combineReducers({
  user,
  items,
  orderHistory,
  cart,
  categories,
  reviews,
  allUsers,
  singleitem
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
