import React from 'react'
import Alert from "@mui/material/Alert";


const Error = () => {
  return (
    <div className='error-container'>
          <Alert severity ="error">
            {`Sorry, Can't find your city`}
          </Alert>
    </div>
  );
}

export default Error