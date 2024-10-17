import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalAPI";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function UserTripCardItem({ trip, index, onDelete }) {
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
      const photoURL = PHOTO_REF_URL.replace(
        "{NAME}",
        result.data.places[0].photos[2].name
      );
      setPhotoURL(photoURL);
    } catch (error) {
      if (error.response) {
        // Handle error
      }
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(trip?.id); // Call the deletion handler from the parent
    }
  };

  return (
    <div className="border rounded-xl p-5 mt-2 gap-10 hover:scale-105 cursor-pointer transition-all hover:shadow-md font-ubuntu relative">
      <Link to={"/view-trip/" + trip?.id}>
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
      </Link>
      {/* Delete Button */}
      <button
        onClick={handleDelete}
        className="bg-[#ed4069] text-white px-3 py-1 rounded-md hover:bg-red-700 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
      </button>
    </div>
  );
}

export default UserTripCardItem;
