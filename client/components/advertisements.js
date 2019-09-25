import React from 'react'
import {withRouter} from 'react-router-dom'

const Advertisements = props => {
  return (
    <div className="ads">
      <a href="https://www.apple.com/iphone-11-pro/" target="_blank">
        <img src="/macbook-pro-new-ad.jpg" />
      </a>
      <a href="https://www.apple.com/iphone-11-pro/" target="_blank">
        <img src="/surface-ad.png" />
      </a>
      <a href="https://www.apple.com/iphone-11-pro/" target="_blank">
        <img src="/macbook-ad.jpg" />
      </a>
      <a href="https://www.apple.com/iphone-11-pro/" target="_blank">
        <img src="/dell-xp-ad.png" />
      </a>
      <a href="https://www.apple.com/iphone-11-pro/" target="_blank">
        <img src="/surface-family-ad.png" />
      </a>

      <a href="https://www.apple.com/iphone-11-pro/" target="_blank">
        <img src="/razer-blade-ad.png" />
      </a>
      <a href="https://www.apple.com/iphone-11-pro/" target="_blank">
        <img src="/surface-pro4-ad.jpg" />
      </a>
      <a href="https://www.apple.com/iphone-11-pro/" target="_blank">
        <img src="/lenovo-thinkpad-ad.jpg" />
      </a>
      <a href="https://www.apple.com/iphone-11-pro/" target="_blank">
        <img src="/macbook-pro-ad.jpg" />
      </a>
    </div>
  )
}

export default withRouter(Advertisements)
