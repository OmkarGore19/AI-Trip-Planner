import { db } from "@/service/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Corrected from useNavigation to useNavigate
import UserTripCardItem from "./components/UserTripCardItem";

function MyTrips() {
  const navigate = useNavigate(); // useNavigate instead of useNavigation
  const [usertrips, setUserTrips] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    getUserTrips();
  }, []);

  // Used to get all user trips
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
      //console.log(doc.id, "=>", doc.data());
      setUserTrips((prevValue) => [...prevValue, doc.data()]);
    });
    setLoading(false); // Set loading to false once trips are fetched
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
            <UserTripCardItem index={index} trip={trip} />
          ))
        ) : (
          // Show message if no trips are generated yet
          <div className="flex flex-col justify-center items-center gap-5 col-span-2 md:col-span-3">
            <img
              src="/notraveldatafound.svg"
              alt="No trips found"
              className="w-full max-w-xs md:max-w-md lg:max-w-lg" // Responsive widths
            />
            <h2 className="text-bold text-2xl">No Trips Generated Yet!!</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyTrips;
