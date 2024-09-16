import React from "react";
import PlaceCardItem from "./PlaceCardItem";

function ItineraryDays({ trip }) {
  // Debugging: Log the trip object to verify its structure
  //console.log("Trip Data:", trip);

  return (
    <div>
      <h2 className="text-xl font-bold mt-5">Places to Visit</h2>
      <div>
        {trip?.tripData?.itinerary?.length ? (
          trip.tripData.itinerary.map((item, index) => (
            <div key={index} className="mt-2">
              <h2 className="font-medium text-xl">Day {item.Day}</h2>
              <div className="grid md:grid-cols-2 gap-5">
                {item.Plan.map((place, index) => (
                  <div className="my-1" key={index}>
                    <h2 className="font-medium text-sm text-[#ed4069]">
                      {place["best time to visit"]}
                    </h2>
                    <PlaceCardItem place={place} />
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div>No itinerary available.</div>
        )}
      </div>
    </div>
  );
}

export default ItineraryDays;
