import React from 'react'
import {withRouter} from 'react-router-dom'

const Advertisements = props => {
  return (
    <div className="ads">
      <img src="/macbook-pro-new-ad.jpg" />
      <img src="/surface-ad.png" />
      <img src="/macbook-ad.jpg" />
      <img src="/dell-xp-ad.png" />
      <img src="/surface-family-ad.png" />
      <img src="/razer-blade-ad.png" />
      <img src="/surface-pro4-ad.jpg" />
      <img src="/lenovo-thinkpad-ad.jpg" />
      <img src="/macbook-pro-ad.jpg" />
    </div>
  )
}

export default withRouter(Advertisements)
