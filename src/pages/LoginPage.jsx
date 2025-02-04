import React, { useState } from 'react'

function LoginPage() {

  return (
    <div className='container px-5'>
      <div className='fromwrap'>
      <form>
        <h3>Sign In</h3>
        
        <div className="mb-3">
          
          <input type="text" className="form-control" placeholder="User name" />
        </div>
        

        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
          />
        </div>
         
        

        <div className="d-grid">
          <button type="submit" className="submitbt">
            Sign In
          </button>
        </div>
        <p className="forgot-password text-right">
        Don't have an account yet ? <a href="/Register">sign in</a>
        </p>
        <p className="forgot-password text-center">
         <a href="/Login">Forgot Password?</a>
        </p>
        
      </form>
      </div>
    </div>
  )
}

export default LoginPage;
