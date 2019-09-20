import React from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'

const Menu = props => {
  const list = props.categories
  return (
    <ul>
      {list.map(ctg => (
        <Link to={`/categories/${ctg.id}`} key={ctg.id}>
          <li>{ctg.name}</li>
        </Link>
      ))}
      <Link to="/items">
        <li>All Producs</li>
      </Link>
    </ul>
  )
}

const mapStateToProps = state => {
  return {
    categories: state.categories
  }
}

export default withRouter(connect(mapStateToProps)(Menu))
