import React from 'react'

const Button = ({ onClick, children}) => {
  return (
    <button onClick={onClick} className='text-{20} bg-indigo-600 text-white py-2 px-6 rounded md:ml-8 hover:bg-indigo-400 
    duration-500'>
      {children}
    </button>
  )
}

export default Button