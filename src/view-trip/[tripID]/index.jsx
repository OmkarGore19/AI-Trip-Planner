import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

function Viewtrip() {
  const { tripID } = useParams();

  useEffect(() => {
    if (tripID) {
      getTripData();
    }
  }, [tripID]);

  const getTripData = async () => {
    try {
      const docRef = doc(db, 'AITrips', tripID); // Assuming 'db' is the Firebase instance
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        console.log('doc found:', docSnap.data());
      } else {
        console.log('no such doc found');
        toast.error('No trip found!');
      }
    } catch (error) {
      console.error('Error getting trip data:', error);
      toast.error('Failed to fetch trip data!');
    }
  };

  return (
    <div>
      View Trip: {tripID}
    </div>
  );
}

export default Viewtrip;
