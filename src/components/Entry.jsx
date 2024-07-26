import React from 'react'

const Entry = (props) => {
    function grantLocation()
    {
        props.getLocation();     {/*this is getting getLATLong function in app.jsx */}
    }
  return (
    <div className="entry">
    <div className="entry-icon-container">
      <img className="entry-icon" src="/assets/location.png" />
    </div>
    <h2 className="entry-heading">Grant Location Access</h2>
    <p className="entry-description">
      Allow access to get weather information
    </p>
    <button className="entry-button" onClick={grantLocation}>
      Grant Access
    </button>
  </div>

  );
}

export default Entry;