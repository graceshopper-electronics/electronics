import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {deleteCategoryThunk} from '../store/categories'
import AddNewCategory from './addnewcategory'
import UpdateCategory from './updatecategory'

class Categories extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick = evt => {
    evt.preventDefault()
    if (evt.target.id) {
      this.props.deleteCategory(evt.target.id)
    }
  }
  render() {
    const list = this.props.categories
    const isAdmin = this.props.isAdmin
    return (
      <div>
        <h3>Categories</h3>
        <div>
          {isAdmin ? (
            <div>
              <AddNewCategory />
            </div>
          ) : (
            <div />
          )}
        </div>
        <div>
          {list.map(ctg => (
            <div key={ctg.id}>
              <Link to={`/categories/${ctg.id}`}>
                <li>
                  <img src={ctg.photo} />
                </li>
                <li>{ctg.name}</li>
              </Link>
              <div>
                {isAdmin ? (
                  <div>
                    <UpdateCategory id={ctg.id} />
                    <button
                      type="button"
                      id={ctg.id}
                      onClick={evt => this.handleClick(evt)}
                    >
                      Delete Category
                    </button>
                  </div>
                ) : (
                  <div />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categories,
    isAdmin: state.user.isAdmin
  }
}
const mapDispatchToProps = dispatch => {
  return {
    deleteCategory: id => dispatch(deleteCategoryThunk(id))
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Categories)
)
