import React from 'react'

export default function Modal({handleClick}) {
  return (
    <div className='w-screen h-screen absolute inset-0 flex p-2 justify-center items-center z-30 bg-slate-950/40 backdrop-blur-lg'>
        <div className=' w-full md:w-1/2 h-1/2 flex flex-col justify-center items-center gap-y-10 border-2 p-8 bg-white/80 rounded-lg shadow-[0_0_0.5rem_#fff] scrollbar'>
            <p className=' text-lg md:text-2xl w-3/4 text-center text-wrap font-["Ubuntu"] font-thin text-purple-500 break-words ' >Please Enable Full Screen For Quiz App.Toggling tabs will reduce your marks.</p>
            <button className='hover:scale-125 text-md md:text-xl p-2 transition duration-300 bg-sky-500 rounded-lg text-white' onClick={handleClick}>Enable</button>
        </div>
    </div>
  )
}
