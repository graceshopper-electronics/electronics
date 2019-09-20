import React from 'react'
import {withRouter, Link} from 'react-router-dom'
import {fetchSingleItemThunk} from '../store/singleitem'
import {connect} from 'react-redux'

const ItemCard = props => {
  const item = props.item
  return (
    <div key={item.id} className="wrap">
      <Link to={`/items/${item.id}`}>
        <img
          src={item.photo}
          className="itemPhoto"
          onClick={() => props.setItem(item.id)}
        />
      </Link>
      <ul>
        <li>Price: {item.price}</li>
        <li>Name:{item.name}</li>
      </ul>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    setItem: id => dispatch(fetchSingleItemThunk(id))
  }
}

export default withRouter(connect(null, mapDispatchToProps)(ItemCard))
