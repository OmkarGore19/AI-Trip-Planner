import React from "react";

function Hotels({ trip }) {
  return (
    <div>
      <h2 className="text-xl font-bold mt-5">Hotel Recommendation</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5">
        {trip?.tripData?.hotel_options?.map((hotel, index) => (
          <div key={index}>
            <img src="/placeholder.jpg" alt="Hotel" className="rounded-xl" />
            <div className="my-2">
              <h2 className="font-medium">{hotel.hotel_name}</h2>
              <h2 className="text-xs text-gray-600">
                📍 {hotel.hotel_address}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Hotels;
