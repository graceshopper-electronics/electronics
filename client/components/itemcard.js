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
        <li>
          <h3>{item.name}</h3>
        </li>
        <li>
          <h4>${item.price}</h4>
        </li>
        {item.inventory ? (
          item.inventory < 10 ? (
            <li className="orange small">Almost out of stock</li>
          ) : (
            <li className="green small">Currently in Stock</li>
          )
        ) : (
          <li className="red small">Out of Stock, Check Back Later</li>
        )}
      </ul>
    </div>
  )
}

export default ItemCard
