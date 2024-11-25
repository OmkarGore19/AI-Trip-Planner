import { db } from "@/service/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import InfoSection from "../components/InfoSection";
import Hotels from "../components/Hotels";
import PlacesToVisit from "../components/PlacesToVisit";
import Footer from "../components/Footer";
import { AiOutlineLoading } from "react-icons/ai";

function Viewtrip() {
  const { tripID } = useParams();
  const [trip, setTrip] = useState({});
  const [loading, setLoading] = useState(true); // New loading state

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
        setTrip(tripData);
      } else {
        toast.error("No trip found!");
      }
    } catch (error) {
      toast.error("Failed to fetch trip data!");
    } finally {
      setLoading(false); // Set loading to false once the data is fetched
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <AiOutlineLoading className="h-7 w-7 animate-spin" /> {/* Display loading spinner while loading */}
      </div>
    );
  }


  return (
    <div className="p-10 md:px-20 lg:px-44 xl:pc-56 text-ubuntu">
      {/* Information Section */}
      <InfoSection trip={trip} />
      {/* Recommended Hotels */}
      <Hotels trip={trip} />
      {/* Daily plan */}
      <PlacesToVisit trip={trip} />
      {/* Footer */}
      <Footer trip={trip} />
    </div>
  );
}

export default Viewtrip;
