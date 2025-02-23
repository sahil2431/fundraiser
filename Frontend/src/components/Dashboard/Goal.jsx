import React from 'react'

const Goal = () => {
  return (
    <div className="flex flex-col items-center justify-center border p-6 rounded-lg">
        <div className="relative w-40 h-40 border-4 border-dashed border-red-300 rounded-full flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-500 font-semibold">Goal Achieved</p>
            <p className="text-3xl font-bold">10</p>
          </div>
        </div>
        <p className="mt-4 text-lg font-medium text-gray-700">Total Goal</p>
        <p className="text-2xl font-bold text-gray-800">₹30000</p>
      </div>

  )
}

export default Goal
