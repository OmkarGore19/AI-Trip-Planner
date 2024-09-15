import React, { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Input } from "@/components/ui/input";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelerList,
} from "@/constants/options";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { chatSession } from "@/service/AIModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { AiOutlineLoading } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function CreateTrip() {
  const [place, setPlace] = useState("");
  const [formData, setFormData] = useState({ noOfDays: "0" });
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  //navigate to view-trip page
  const navigate = useNavigate();

  const handleInputChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Google login logic
  const login = useGoogleLogin({
    onSuccess: (tokenInfo) => {
      console.log("Google Login Success:", tokenInfo);
      getUserProfile(tokenInfo);
    },
    onError: (error) => {
      console.log("Google Login Error:", error);
    },
  });

  const saveAITrip = async (TripData) => {
    setLoading(true);
    const docId = Date.now().toString();
    const user = JSON.parse(localStorage.getItem("user"));
    // Add a new document in collection "cities"
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId,
    });
    setLoading(false);
    navigate(`/view-trip/${docId}`);
  };

  // Trip generation logic
  const onGenerateTrip = async () => {
    //authentication 
    const user = localStorage.getItem('user');
    if(!user){
      return ;
    }

    if (
      formData.noOfDays > 10 ||
      formData.noOfDays === "" || // Check if noOfDays is an empty string
      formData.noOfDays === "0" || // Optional: If you also want to check for "0" as invalid
      !formData.budget ||
      !formData.traveler ||
      !formData.location
    ) {
      toast("Please fill all the details!");
      return;
    }

    //console.log("Generated Trip Data:", formData);
    // Further logic to handle trip generation

    const FINAL_PROMPT = AI_PROMPT
    .replace(
      "{location}",
      formData?.location?.label
    )
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{traveler}", formData?.traveler)
      .replace("{budget}", formData?.budget)
      .replace("{totalDays}", formData?.noOfDays)

    console.log(FINAL_PROMPT);

    const result = await chatSession.sendMessage(FINAL_PROMPT);

    console.log(result?.response?.text());
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      <h2 className="font-bold text-3xl text-default">
        Tell us your travel preferences..✈️🏝️
      </h2>
      <p className="mt-3 text-gray-600 text-xl">
        Just provide some basic information and our trip planner will generate a
        customized itinerary based on your preferences.
      </p>

      <div className="mt-10 flex flex-col gap-10">
        <div>
          <h2 className="text-xl my-3 font-medium">
            What is destination of choose?
          </h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              value: place, // use controlled value for place
              onChange: (v) => {
                setPlace(v);
                handleInputChange("location", v);
              },
              placeholder: "Select a destination...",
              isClearable: true,
            }}
          />
        </div>
      </div>

      <div>
        <h2 className="text-xl my-3 font-medium">
          How many days are you planning your trip?
        </h2>
        <Input
          onChange={(e) => handleInputChange("noOfDays", e.target.value)}
        />
      </div>

      <div>
        <h2 className="text-xl my-3 font-medium">What is your budget?</h2>
        <p className="text-gray-600 text-l">
          The budget is exclusively allocated for activities and dining
          purposes.
        </p>
        <div className="grid grid-cols-3 gap-5 mt-5 p-2">
          {SelectBudgetOptions.map((item, index) => (
            <div
              key={index}
              className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer ${
                formData.budget === item.title &&
                "shadow-xl border-black border-2"
              }`}
              onClick={() => handleInputChange("budget", item.title)}
              value={formData.budget}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-600">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl my-3 font-medium">
          Who do you plan on traveling with on your next adventure?
        </h2>
        <div className="grid grid-cols-3 gap-5 mt-5 p-2">
          {SelectTravelerList.map((item, index) => (
            <div
              key={index}
              className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer ${
                formData.traveler === item.people &&
                "shadow-xl border-black border-2"
              }`}
              onClick={() => handleInputChange("traveler", item.people)}
              value={formData.traveler}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-600">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end my-10">
        <Button disabled={loading} onClick={onGenerateTrip}>
          {loading ? (
            <AiOutlineLoading className="h-7 w-7 animate-spin" />
          ) : (
            "Generate Trip"
          )}
        </Button>
      </div>
    </div>
  );
}

export default CreateTrip;
