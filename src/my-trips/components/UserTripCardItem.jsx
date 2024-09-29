import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalAPI";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function UserTripCardItem({ trip, index }) {
  const [photoURL, setPhotoURL] = useState();

  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.location?.label,
    };
    try {
      const result = await GetPlaceDetails(data);
      //console.log(result.data);
      const photoURL = PHOTO_REF_URL.replace(
        "{NAME}",
        result.data.places[0].photos[2].name
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
    <Link to={"/view-trip/" + trip?.id}>
      <div className="border rounded-xl p-5 mt-2 gap-10 hover:scale-105 cursor-pointer transition-all hover:shadow-md font-ubuntu">
        <img
          src={photoURL ? photoURL : "/placeholder.jpg"}
          alt=""
          className="rounded-xl object-cover w-full h-[160px]"
        />
        <div className="my-2">
          <h2 className="font-bold text-lg">
            {trip?.userSelection?.location?.label}
          </h2>
          <h2 className="text-gray-500 text-sm">
            {trip.userSelection?.noOfDays} days with{" "}
            {trip.userSelection?.budget} budget
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default UserTripCardItem;
