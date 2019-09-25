import React from 'react'
import {Link} from 'react-router-dom'

const ItemCard = props => {
  const item = props.item
  return (
    <Link to={`/items/${item.id}`} className="remove-decoration product">
      <div key={item.id} className="flex-display flex-wrap">
        <img src={item.photo} className="item-photo" />
        <ul>
          <li>
            <h3>{item.name}</h3>
          </li>
          <li className="flex-display">
            <h4>${item.price}</h4>
            <h4 className="discount">
              ${(parseInt(item.price) + 440).toFixed(2)}
            </h4>
          </li>
          {item.inventory ? (
            item.inventory < 10 ? (
              <li className="orange small">Almost out of stock</li>
            ) : (
              <li className="green small">Currently in stock</li>
            )
          ) : (
            <li className="red small">Out of stock</li>
          )}
        </ul>
      </div>
    </Link>
  )
}

export default ItemCard
