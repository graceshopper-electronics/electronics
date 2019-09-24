import React from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {fetchByCategoryThunk, fetchItemsThunk} from '../store/items'
import history from '../history'

const Menu = props => {
  const list = props.categories
  return (
    <ul>
      {list.map(ctg => (
        <Link to={`/categories/${ctg.id}`} key={ctg.id}>
          <li>{ctg.name}</li>
        </Link>
      ))}
      <Link to="/items" onCLick={() => history.push('/items')}>
        <li>All Producs</li>
      </Link>
    </ul>
  )
}

const mapStateToProps = state => {
  return {
    categories: state.categories,
    items: state.items
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getItemsByCat: id => dispatch(fetchByCategoryThunk(id)),
    getItems: () => dispatch(fetchItemsThunk())
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Menu))
