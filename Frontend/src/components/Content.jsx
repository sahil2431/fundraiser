import { Home } from 'lucide-react'
import React, { useEffect , useState } from 'react'
import { useLocation } from 'react-router'

const Content = () => {
    const location = useLocation();
    const [pageName , setPageName] = useState("")
    useEffect(() => {
        setPageName(localStorage.getItem('currentNavItem'))
    } , [location])
  return (
    <div className='md:ml-64 pt-24 p-10 bg-slate-200' >
      <div>
      <div className='flex items-center justify-between'>
           <h1 className='font-bold text-2xl'>{pageName}</h1>
           <div className='flex sm:gap-3 gap-1 items-center'>
             <Home className="w-5 h-5" /> 
             <span>/</span>
             <span>General</span>
             <span>/</span>
             <span>{pageName}</span>
           </div>
        </div>
      </div>
    </div>
  )
}

export default Content
