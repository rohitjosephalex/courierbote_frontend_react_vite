import React from 'react'
import './style.css'

export const Results = () => {
  return (
    <div className='result-section'>
      <h2 className='results-heading'>Our results</h2>
      <div className='results-type'>
        <div className='results'>
          <p className='results-no'>
            99%
          </p>
          <p className='results-category'>
            Customer Satisfaction
          </p>
        </div>
        <div className='results'>
          <p className='results-no'>
            20K
          </p>
          <p className='results-category'>
            Active Users
          </p>
        </div>
        <div className='results'>
          <p className='results-no'>
            50+
          </p>
          <p className='results-category'>
            Team Members
          </p>
        </div>
      </div>
    </div>
  )
}
