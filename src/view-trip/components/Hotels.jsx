import React from "react";
import { Link } from 'react-router-dom';

function Hotels({ trip }) {
  return (
    <div>
      <h2 className="text-xl font-bold mt-5">Hotel Recommendation</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5 ">
        {trip?.tripData?.hotels?.map((hotel, index) => (
          <Link 
            to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.HotelName)}+${encodeURIComponent(hotel['Hotel address'])}`}
            target="_blank"
            key={index}
          >
            <div className="hover:scale-110 transition-all cursor-pointer border hover:shadow-xl rounded-xl p-3">
              <img 
                src="/placeholder.jpg" className="rounded-xl"
              />
              <div className="my-2">
                <h2 className="font-medium">{hotel.HotelName}</h2>
                <h2 className="text-xs text-gray-600 my-1">
                  📍 {hotel['Hotel address']}
                </h2>
                <h2 className="text-sm text-gray-600">🪙 {hotel.Price}</h2>
                <h2 className="text-sm text-gray-600">⭐ {hotel.rating}</h2>
                {/* <p className="text-sm text-gray-500 mt-1">{hotel.description}</p> */}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Hotels;
