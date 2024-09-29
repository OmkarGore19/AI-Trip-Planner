import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalAPI";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function HotelCardItem({hotel,index}) {

  const [photoURL, setPhotoURL] = useState();  

  useEffect(() => {
      hotel&&GetPlacePhoto();
  }, [hotel]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: hotel?.HotelName,
    };
    try {
      const result = await GetPlaceDetails(data);
      //console.log(result.data)
      const photoURL = PHOTO_REF_URL.replace(
        "{NAME}",
        result.data.places[0].photos[1].name
      );
      setPhotoURL(photoURL);
    } catch (error) {
      //console.error(error);
      if (error.response) {
        //console.error(error.response.data);
      }
    }
  };



  return (
    <div>
      <Link
        to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          hotel.HotelName
        )}+${encodeURIComponent(hotel["Hotel address"])}`}
        target="_blank"
        key={index}
      >
        <div className="hover:scale-110 transition-all cursor-pointer border hover:shadow-xl rounded-xl p-3 font-ubuntu">
          <img src={photoURL?photoURL:'/placeholder.jpg'} className="rounded-xl h-[180px] w-full object-cover" />
          <div className="my-2">
            <h2 className="font-medium">{hotel.HotelName}</h2>
            <h2 className="text-xs text-gray-600 my-1">
              📍 {hotel["Hotel address"]}
            </h2>
            <h2 className="text-sm text-gray-600">🪙 {hotel.Price}</h2>
            <h2 className="text-sm text-gray-600">⭐ {hotel.rating}</h2>
            {/* <p className="text-sm text-gray-500 mt-1">{hotel.description}</p> */}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default HotelCardItem;
