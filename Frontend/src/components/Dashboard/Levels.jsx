import React from 'react'
import CustomButton from '../CustomButton'
import { Star, Copy } from 'lucide-react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
const Levels = () => {

  const {referralCode} = useSelector((state) => state.authUser)
  return (
    <div className="flex flex-col gap-4">
        <p className="text-lg font-semibold text-red-500">Level Achieved : <span className="text-gray-800">Star</span></p>
        <div className="flex gap-4">
          <CustomButton className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-purple-500 text-white">
            <Star className="w-4 h-4" /> Rewards
          </CustomButton>
          <CustomButton 
          onClick={() => {
            navigator.clipboard.writeText(`${import.meta.env.VITE_FRONTEND_URL}/donate/${referralCode}`)
            toast.success('Donation Link Copied to Clipboard')
          }}
          className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-purple-500 text-white">
            <Copy className="w-4 h-4" /> Copy Donation Link
          </CustomButton>
        </div>
        <p className="italic text-sm text-gray-600">Unlock <span className="font-semibold">Ninja Level</span> at 5000</p>

        <p className="text-red-500 font-semibold">Time Left: <span className="text-gray-800">Campaign Expired</span></p>
        <CustomButton className="bg-red-500 text-white w-40">Extend Now</CustomButton>

        <hr className="my-4 border-red-300" />

        <p className="text-lg font-medium text-gray-700">Reference Code : <span className="text-red-500 font-semibold">{referralCode}</span></p>

        <CustomButton className="bg-gradient-to-r from-red-500 to-purple-500 text-white w-40">Start Here</CustomButton>
      </div>
  )
}

export default Levels
