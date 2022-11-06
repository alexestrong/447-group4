import React from 'react'

function LoadingComponent() {
  return (
    <div >
          <div className="spinner-grow text-primary" role="status">
              <span className="sr-only"></span>
          </div>
          <div className="spinner-grow text-success" role="status">
              <span className="sr-only"></span>
          </div>
          <div className="spinner-grow text-danger" role="status">
              <span className="sr-only"></span>
          </div>
    </div>
  )
}

export default LoadingComponent