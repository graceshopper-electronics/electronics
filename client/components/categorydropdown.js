import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

const CategoryDropDown = props => {
  const ctgs = props.categories
  return (
    <div>
      <select name="category" type="text" onChange={props.handleChange}>
        <option value="">select category</option>
        {ctgs.map(ctg => (
          <option key={ctg.id} value={ctg.name}>
            {ctg.name}
          </option>
        ))}
      </select>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    categories: state.categories
  }
}
export default withRouter(connect(mapStateToProps)(CategoryDropDown))
