import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {fetchByCategoryThunk} from '../store/singlecategoryitems'
import history from '../history'

class Menu extends Component {
  constructor(props) {
    super(props)
    this.handleClickCategory = this.handleClickCategory.bind(this)
  }

  handleClickCategory(evt) {
    console.log('event id', evt.target.id)
    this.props.getItemsByCat(evt.target.id)
  }

  render() {
    return (
      <ul>
        {this.props.categories.map(ctg => (
          <Link to={`/categories/${ctg.id}`} key={ctg.id}>
            <li id={ctg.id} onClick={this.handleClickCategory}>
              {ctg.name}
            </li>
          </Link>
        ))}
        <Link to="/items" onClick={() => history.push('/items')}>
          <li>All Producs</li>
        </Link>
      </ul>
    )
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categories,
    items: state.items
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getItemsByCat: id => dispatch(fetchByCategoryThunk(id))
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Menu))
