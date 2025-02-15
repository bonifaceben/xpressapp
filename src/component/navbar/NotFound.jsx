import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div>
      <h1 className='text-white'>PAGE NOT FOUND</h1>
      <h5 className='text-center'>Return to <Link to="/">HOMEPAGE</Link></h5>
    </div>
  )
}

export default NotFound
