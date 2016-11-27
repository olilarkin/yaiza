import React from 'react'

export default (props) => {
  console.log('app');
  return (
    <div>
      <h1>React Router Tutorial</h1>
      {props.children}
    </div>
  )
}

