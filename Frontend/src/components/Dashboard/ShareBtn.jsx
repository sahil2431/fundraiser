import React from 'react'
import CustomButton from '../CustomButton'
import { Share2 } from 'lucide-react'
import { useSelector } from 'react-redux'
const ShareBtn = () => {

  const {referralCode} = useSelector((state) => state.authUser)

  const shareOnWhatsapp = () => {
    const message = `Hi, I am raising funds for ngo. Please support me by donating through this link: ${import.meta.env.VITE_FRONTEND_URL}/donate/${referralCode} and make a difference!`

    const encodedMessage = encodeURIComponent(message)

    const url = `https://wa.me?text=${encodedMessage}`

    window.open(url , '_blank')
  }
  return (
    <div className="col-span-1 md:col-span-2 flex justify-center mt-6">
        <CustomButton 
        onClick={shareOnWhatsapp}
        className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-purple-500 text-white">
          <Share2 className="w-4 h-4" /> Share On Whatsapp
        </CustomButton>
      </div>
  )
}

export default ShareBtn
