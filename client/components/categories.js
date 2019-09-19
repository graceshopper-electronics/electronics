import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'

class Categories extends Component {
  render() {
    const list = this.props.categories
    console.log(this.props)
    return (
      <div>
        <h3>Categories</h3>
        <div>
          {list.map(ctg => (
            <Link to={`/categories/${ctg.id}`} key={ctg.id}>
              <li>{ctg.name}</li>
            </Link>
          ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categories
  }
}

export default withRouter(connect(mapStateToProps)(Categories))
