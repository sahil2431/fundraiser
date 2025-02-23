import React, { useState } from "react";
import { donation } from "../../features/api/transaction";
import {toast} from 'react-toastify';

const DonationFormModal = ({ amount, referralCode, onClose }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [taxExemption, setTaxExemption] = useState(false);
  const [refCode, setRefCode] = useState(referralCode || "");
  const [donationAmount, setDonationAmount] = useState(amount);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e) => {
    setProcessing(true);
    e.preventDefault();
    const payeeDetails = { email, name: fullName, phone };
    const transactionID = Math.random().toString(36).substr(2, 9);
    const data = await donation({payeeDetails , transactionID , amount : donationAmount , referralCode : refCode});

    if(data.success){
      toast.success(data.message);
    }else {
      toast.error('Transaction failed');
    }

    setProcessing(false);
    
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
    
      <div className="bg-white w-full max-w-md p-6 rounded shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        <h2 className="text-xl font-bold mb-4">Personal Information</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Full Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Email Address</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Phone</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center">
            <input
              id="taxExemption"
              type="checkbox"
              className="mr-2"
              checked={taxExemption}
              onChange={(e) => setTaxExemption(e.target.checked)}
            />
            <label htmlFor="taxExemption" className="font-medium">
              Do you wish to receive Tax Exemption?
            </label>
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Reference Code (if available)
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={refCode}
              onChange={(e) => setRefCode(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Donation Amount</label>
            <input
              type="number"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={donationAmount}
              onChange={(e) => setDonationAmount(e.target.value)}
              required
            />
          </div>

          <button
            disabled={processing}
            type="submit"
            className={`w-full ${processing ? 'bg-red-400' : 'bg-red-600 hover:bg-red-600'} text-white py-2 rounded`}
          >
            {processing ? 'Processing...' : 'Continue to Payment'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DonationFormModal;
