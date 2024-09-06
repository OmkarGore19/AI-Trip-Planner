import React, { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Input } from "@/components/ui/input";
import { SelectBudgetOptions, SelectTravelerList } from "@/constants/options";
import { Button } from "@/components/ui/button";

function CreateTrip() {
  const [place, Setplace] = useState("");

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-6 gap-10">
      <h2 className="font-bold text-3xl">Tell us your travel preferences</h2>
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
              place,
              onChange: (v) => {
                Setplace(v);
                console.log(v);
              },
            }}
          />
        </div>
      </div>

      <div>
        <h2 className="text-xl my-3 font-medium">
          How many days are you planning your trip?
        </h2>
        <Input placeholder={"Ex.4"} type="number" />
      </div>

      <div>
        <h2 className="text-xl my-3 font-medium">What is your budget?</h2>
        <p className="text-gray-600 text-l">
          The budget is exclusively allocated for activities and dinig purposes.
        </p>
        <div className="grid grid-cols-3 gap-5 mt-5 p-2">
          {SelectBudgetOptions.map((item, index) => (
            <div key={index} className="p-4 border rounded-lg hover:shadow-lg cursor-pointer">
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.titles}</h2>
              <h2 className="text-sm text-gray-600">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl my-3 font-medium">Who do you plan on traveling with on your next adventure?</h2>
        <div className="grid grid-cols-3 gap-5 mt-5 p-2">
          {SelectTravelerList.map((item, index) => (
            <div key={index} className="p-4 border rounded-lg hover:shadow-lg cursor-pointer">
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.titles}</h2>
              <h2 className="text-sm text-gray-600">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-end my-10">
        <Button>Submit </Button>
    </div>
    </div>
    
          
          

  );
}

export default CreateTrip;
