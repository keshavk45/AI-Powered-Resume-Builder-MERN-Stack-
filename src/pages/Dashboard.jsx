import React from 'react';

const Dashboard = () => {
  return (
    <div>
        <div className='max-w-7xl mx-auto px-4 py-8'>
          <p className='text-2xl font-medium mb-6 bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent sm:hidden'>
            Welcome, Joe Doe

          <div className='flex gap-4'>
            <button className='class="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-heading rounded-base group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-heading focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800 class=" relative px-4 py-2.5 transition-all ease-in duration-75 bg-neutral-primary-soft rounded-base group-hover:bg-transparent group-hover:dark:bg-transparent leading-5'>
              <PlusIcon className='size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-indigo-300 to indigo-500 text-white rounded-full'/>
              <p className='text-sm group-hover:text-indigo-600 transition-all duration-300'>Create Resume</p>
            </button>

          </div>
          </p>

        </div>
        
    </div>
  )
}

export default Dashboard;