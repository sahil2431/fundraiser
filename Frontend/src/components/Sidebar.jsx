import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, List, PlayCircle, HelpCircle, BookOpen, Star, MessageSquare , X } from 'lucide-react';

const Sidebar = ({isSideOpen , close}) => {
  const [isOpen , setIsOpen] = useState(false)
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <Home className="w-5 h-5 mr-3" /> },
    { name: 'Transactions', path: '/transactions', icon: <List className="w-5 h-5 mr-3" /> },
    { name: 'Start Here', path: '/start-here', icon: <PlayCircle className="w-5 h-5 mr-3" /> },
    { name: 'FAQ', path: '/faq', icon: <HelpCircle className="w-5 h-5 mr-3" /> },
    { name: 'Learning Modules', path: '/learning-modules', icon: <BookOpen className="w-5 h-5 mr-3" /> },
    { name: 'Rewards', path: '/rewards', icon: <Star className="w-5 h-5 mr-3" /> },
    { name: 'Feedback', path: '/feedback', icon: <MessageSquare className="w-5 h-5 mr-3" /> },
  ];

  useEffect(() => {
    navItems.map((item) => {
        if(location.pathname === item.path){
            localStorage.setItem('currentNavItem', item.name);
        }
    });
  } , [location.pathname])


  useEffect(() => {
    setIsOpen(isSideOpen)
  } , [isSideOpen])

  return (
    <div className={`w-64 h-screen bg-white border-r flex flex-col fixed ${isOpen ? 'max-md:left-0' : 'max-md:left-[-250px]'} top-0 z-20 transition-all duration-300 ease-in-out`}>

      <div className="flex items-center justify-center gap-5 h-16 border-b">
        <div className="text-2xl font-bold text-blue-500 border border-blue-400 px-4 py-1 rounded">Logo</div>

        <X size={20} className='md:hidden' onClick={() => {
          setIsOpen(false)
          close()
          }} />

      </div>


      <nav className="flex-1 px-4 py-6 space-y-4">
        <div>
          <h2 className="text-sm font-semibold text-gray-500 uppercase">General</h2>
          <div className="mt-2 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center px-3 py-2 rounded-lg ${
                  location.pathname === item.path ? 'text-white bg-red-500' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
