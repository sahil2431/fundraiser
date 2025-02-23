
import React, { useEffect, useState } from 'react'
import Levels from '../components/Dashboard/Levels'
import ShareBtn from '../components/Dashboard/ShareBtn'
import Goal from '../components/Dashboard/Goal'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { setReferralCode } from '../features/authSlice'
import axiosInstance from '../utils/axios'

const Dashboard = () => {
  const {user , isLoggedIn} = useSelector(state => state.authUser)

  const navigate = useNavigate()

  const dispatch = useDispatch()
  useEffect(() => {
      if (!isLoggedIn) {
        navigate("/");
      }
    }, [isLoggedIn, navigate]);
  
    useEffect(() => {
      if(!user) {
        return
      }
      const getRefCode = async () => {
        const response = await axiosInstance.post('/user/referral-code' , {
          uid : user.uid
        })
        
        dispatch(setReferralCode({referralCode : response.data.referralCode}))
      }

       getRefCode()
    } , [isLoggedIn , user , dispatch])

  return (
    <div className='md:ml-64 p-10 bg-slate-200' >
        <div className='bg-[url(banner.jpg)] bg-cover bg-center rounded-lg'>

        <div className='h-[400px] bg-[#0c0b0bc7] flex items-center justify-center rounded-lg'>
            <div className='px-5 mx-7 bg-[#101010a8] rounded-lg py-4 flex flex-col gap-3'>
              <h1 className='font-bold text-3xl text-red-600'>{user?.displayName}</h1>
              <p className='text-white '>Initiate push is the toghest! Go through the learning modules , or reach out to your fundraising manager to level up.</p>
            </div>
        </div>
        </div>

        <div className="p-6 bg-slate-200 shadow-lg grid grid-cols-1 md:grid-cols-2 gap-6">
            <Goal/>
            <Levels />
            <ShareBtn/>
        </div>
    </div>
  )
}

export default Dashboard
