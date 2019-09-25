import React from 'react'
import {withRouter} from 'react-router-dom'

class Footer extends React.Component {
  constructor() {
    super()
    this.state = {
      feedback: ''
    }
  }

  render() {
    return (
      <div className="footer">
        <div className="feedback-form">
          <h4>Tell us how we can improve</h4>
          <input type="text" />
          <button>Send feedback</button>
        </div>

        <div className="icon-links">
          <a href="https://github.com/graceshopper-electronics/electronics">
            <i className="fa fa-github fa-2x" />
          </a>

          <a href="https://www.amazon.com">
            <i className="fa fa-amazon fa-2x" />
          </a>
          <h3>Team Apple</h3>
        </div>

        <div className="get-to-know">
          <h4>Get to know us</h4>
          <div>
            <p>Careers</p>
            <p>About Team Apple</p>
            <p>Staff</p>
            <p>Blog</p>
            <p>Policies</p>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Footer)
