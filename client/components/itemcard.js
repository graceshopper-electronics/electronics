import React from 'react'
import {Link} from 'react-router-dom'

const ItemCard = props => {
  const item = props.item
  return (
    <div key={item.id} className="wrap">
      <Link to={`/items/${item.id}`}>
        <img src={item.photo} className="itemPhoto" />
      </Link>
      <ul>
        <li>Price: {item.price}</li>
        <li>Name:{item.name}</li>
      </ul>
    </div>
  )
}

export default ItemCard
