import React from 'react'

const LandingPageHeader = ({ name }) => {
  return (
    <h3
      style={{
        color: '#5D675B',
        textDecoration: 'underline',
        ':hover': { cursor: 'pointer' }
      }}>
      {name}
    </h3>
  )
}

export default LandingPageHeader
