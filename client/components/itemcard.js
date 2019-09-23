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
        <li>Name:{item.name}</li>
        <li>Price: {item.price}</li>
        {item.inventory ? (
          item.inventory < 10 ? (
            <li>Left in Stock: {item.inventory}</li>
          ) : (
            <li>Currently in Stock</li>
          )
        ) : (
          <li>Out of Stock, Check Back Later</li>
        )}
      </ul>
    </div>
  )
}

export default ItemCard
