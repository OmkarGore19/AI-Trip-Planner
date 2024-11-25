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
      //console.log("Google Login Success:", tokenInfo);
      getUserProfile(tokenInfo);
    },
    onError: (error) => {
      //console.log("Google Login Error:", error);
    },
  });

  // Function to retrieve the user profile
  const getUserProfile = (tokenInfo) => {
    const accessToken = tokenInfo?.access_token; // Get the access token from the login response

    // Corrected access token URL and headers
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Correct header for Google API
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        //console.log("User Profile Data:", response.data); // Log user profile data
        localStorage.setItem("user", JSON.stringify(response.data));
        onGenerateTrip();
      })
      .catch((error) => {
        //console.error("Error fetching user profile:", error);
      });
  };

  // Trip generation logic
  const onGenerateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true);
      return;
    }
    // Check for missing or invalid form data
    if (
      formData.noOfDays > 10 ||
      formData.noOfDays === "" || // Empty string check
      formData.noOfDays === "0" || // Optional: check for "0"
      !formData.budget ||
      !formData.traveler ||
      !formData.location
    ) {
      toast("Please fill all the details!");
      return;
    }
    setLoading(true);
    // Construct the AI prompt
    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData?.location?.label
    )
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{traveler}", formData?.traveler)
      .replace("{budget}", formData?.budget)
      .replace("{totalDays}", formData?.noOfDays);
    //console.log("Generated Prompt:", FINAL_PROMPT);
    // Send the prompt to the chat session (assuming chatSession is an instance of your AI API)
    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      //console.log("AI Response:", result?.response?.text());
      setLoading(false);
      saveAITrip(result?.response?.text());
    } catch (error) {
      //console.error("Error sending message:", error);
    }
  };

  const saveAITrip = async (TripData) => {
    //console.log(TripData);
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

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10 font-ubuntu">
      <h2 className="font-bold text-3xl text-default">
        Tell us your travel preferences..✈️🏝️
      </h2>
      <p className="mt-3 text-gray-600 text-xl">
        Just provide some basic information and our trip planner will generate a
        customized itinerary based on your preferences.
      </p>
  
      <div className="mt-10 flex flex-col gap-10">
        <div>
          <h2 className="text-xl my-3 font-medium">What is your destination of choice?</h2>
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
        <h2 className="text-xl my-3 font-medium">How many days are you planning your trip?</h2>
        <Input
          onChange={(e) => handleInputChange("noOfDays", e.target.value)}
        />
      </div>
  
      <div>
        <h2 className="text-xl my-3 font-medium">What is your budget?</h2>
        <p className="text-gray-600 text-l">
          The budget is exclusively allocated for activities and dining purposes.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5 p-2">
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
              <h2 className="font-bold text-lg break-words">{item.title}</h2>
              <h2 className="text-sm text-gray-600 break-words overflow-hidden text-ellipsis">
                {item.desc}
              </h2>
            </div>
          ))}
        </div>
      </div>
  
      <div>
        <h2 className="text-xl my-3 font-medium">Who are you planning to travel with?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5 p-2">
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
              <h2 className="font-bold text-lg break-words">{item.title}</h2>
              <h2 className="text-sm text-gray-600 break-words overflow-hidden text-ellipsis">
                {item.desc}
              </h2>
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
  
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.png" alt="Logo" width={150} />
              <h2 className="font-bold text-lg mt-7 text-black">
                Sign In with Google
              </h2>
              <p>
                To proceed with the application, you need to sign in with Google
                Authentication securely.
              </p>
              <Button className="w-full mt-5 flex gap-3" onClick={login}>
                <img src="/google.png" alt="Google icon" width={20} />
                Sign In with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}  

export default CreateTrip;
