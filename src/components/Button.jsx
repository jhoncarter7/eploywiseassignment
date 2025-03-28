import React from 'react'

const Button = ({text, customCss, onClick, type}) => {
  return (
    <button className={`rounded-lg px-4 py-2 cursor-pointer bg-gray-700 text-white ${ customCss}`} onClick={onClick} type={type}>
        {text}
    </button>
  )
}

export default Button