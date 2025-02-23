import React from "react";

const DonationOptions = ({ onDonationClick }) => {
  const donationOptions = [
    {
      id: 1,
      img: "/donation1.jpeg",
      label: "Contribute for 2 Months",
      amount: 3000,
    },
    {
      id: 2,
      img: "/donation2.jpeg",
      label: "Contribute for 6 Months",
      amount: 9000,
    },
    {
      id: 3,
      img: "/donation3.jpeg",
      label: "Contribute for 1 Year",
      amount: 18000,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {donationOptions.map((option) => (
        <div
          key={option.id}
          className="bg-white shadow-md p-6 text-center rounded-lg flex flex-col justify-center"
        >
            <img src={option.img} alt=""  className="w-full h-auto max-w-[600px] max-h-[600px] object-cover" />
          <h3 className="text-xl font-semibold mb-2">{option.label}</h3>
          <p className="text-gray-700 mb-4">₹ {option.amount}</p>
          <button
            onClick={() => onDonationClick(option.amount)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Donate ₹{option.amount}
          </button>
        </div>
      ))}
    </div>
  );
};

export default DonationOptions;
