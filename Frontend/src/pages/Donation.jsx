import React, { useState, useEffect } from "react";
import Options from "../components/Donation/Options";
import DonationForm from "../components/Donation/DonationForm";

const Donation= () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(0);
  const [referralCode, setReferralCode] = useState("");

  // Check if there's a referral code in the URL
  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.pathname.split('/')[2]
    if (code) {
      setReferralCode(code);
    }
  }, []);

  // Handle the donation option click
  const handleDonationClick = (amount) => {
    setSelectedAmount(amount);
    setShowForm(true);
  };

  // Close the modal
  const closeModal = () => {
    setShowForm(false);
    setSelectedAmount(0);
  };

  return (
    <div className="w-[80vw] h-[70vw] mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">
        Contribute towards a child's education
      </h1>

      <Options onDonationClick={handleDonationClick} />

      {showForm && (
        <DonationForm
          amount={selectedAmount}
          referralCode={referralCode}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default Donation;
