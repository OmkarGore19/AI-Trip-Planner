import { db } from "@/service/firebaseConfig";
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserTripCardItem from "./components/UserTripCardItem";

function MyTrips() {
  const navigate = useNavigate();
  const [usertrips, setUserTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserTrips();
  }, []);

  // Fetch all user trips from Firestore
  const getUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/"); // Redirect to home if no user found
      return;
    }

    const q = query(
      collection(db, "AITrips"),
      where("userEmail", "==", user?.email)
    );
    const querySnapshot = await getDocs(q);
    setUserTrips([]); // Reset user trips before fetching
    querySnapshot.forEach((doc) => {
      setUserTrips((prevValue) => [
        ...prevValue,
        { id: doc.id, ...doc.data() }, // Include doc.id for future actions
      ]);
    });
    setLoading(false); // Set loading to false once trips are fetched
  };

  // Delete trip from Firestore
  const deleteTrip = async (tripId) => {
    try {
      await deleteDoc(doc(db, "AITrips", tripId)); // Delete the document with the tripId
      setUserTrips((prevTrips) =>
        prevTrips.filter((trip) => trip.id !== tripId)
      ); // Remove the trip from state
    } catch (error) {
      console.error("Error deleting trip: ", error);
    }
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10 font-ubuntu">
      <h2 className="font-bold text-3xl">My Trips</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-10">
        {loading ? (
          // Show loading placeholders while trips are being fetched
          [1, 2, 3, 4, 5, 6].map((item, index) => (
            <div
              key={index}
              className="h-[300px] w-full bg-slate-200 animate-pulse rounded-xl"
            ></div>
          ))
        ) : usertrips.length > 0 ? (
          // Render trip cards if trips are available
          usertrips.map((trip, index) => (
            <UserTripCardItem
              key={trip.id}
              index={index}
              trip={trip}
              onDelete={deleteTrip} // Pass the deleteTrip function to the child component
            />
          ))
        ) : (
          // Show message if no trips are generated yet
          <div className="flex flex-col justify-center items-center gap-5 col-span-2 md:col-span-3">
            <img
              src="/notraveldatafound.svg"
              alt="No trips found"
              className="w-full max-w-xs md:max-w-md lg:max-w-lg"
            />
            <h2 className="text-bold text-2xl">No Trips Generated Yet!!</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyTrips;
