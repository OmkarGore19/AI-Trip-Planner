import { db } from "@/service/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import InfoSection from "../components/InfoSection";
import Hotels from "../components/Hotels";

function Viewtrip() {
  const { tripID } = useParams();
  const [trip, setTrip] = useState({});

  useEffect(() => {
    if (tripID) {
      getTripData();
    }
  }, [tripID]);

  const getTripData = async () => {
    try {
      const docRef = doc(db, "AITrips", tripID);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const tripData = docSnap.data();
        console.log("Trip Data:", tripData); // Check the structure of the trip object here
        setTrip(tripData);
      } else {
        console.log("No such doc found");
        toast.error("No trip found!");
      }
    } catch (error) {
      console.error("Error getting trip data:", error);
      toast.error("Failed to fetch trip data!");
    }
  };

  return (
    <div className="p-10 md:px-20 lg:px-44 xl:pc-56 ">
      {/* Information Section */}
      <InfoSection trip={trip} />
      {/* Recommended Hotels */}
      <Hotels trip={trip} />
      {/* Daily plan */}

      {/* Footer */}
    </div>
  );
}

export default Viewtrip;
