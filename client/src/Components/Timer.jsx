import React from 'react'

export default function Timer({min,sec}) {
  return (
    <div className="w-[4rem] h-[4rem] text-lg flex items-center justify-center p-2 rounded-md absolute top-2 right-2 font-bold border-1 bg-purple-600 text-white">
        <span>{min<10?`0${min}`:min}:</span>
        <span>{sec<10?`0${sec}`:sec}</span>
    </div>
  )
}
