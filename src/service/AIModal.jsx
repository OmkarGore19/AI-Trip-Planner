/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

import { GoogleGenerativeAI } from "@google/generative-ai";



const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

    export  const chatSession = model.startChat({
    generationConfig,
    // safetySettings: Adjust safety settings
    // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [
      {
        role: "user",
        parts: [
          {
            text: "Generate Travel Plan for Location: Las Vegas, for 3 Days for Couple with a Cheap budget, Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for 3 days with each day plan with best time to visit in JSON format.",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: '```json\n{\n  "hotel_options": [\n    {\n      "hotel_name": "The D Las Vegas",\n      "hotel_address": "301 Fremont Street, Las Vegas, NV 89101",\n      "price": "$50-$100 per night",\n      "hotel_image_url": "https://images.trvl-media.com/hotels/4000000/3985000/3984700/3984726/3984726_14.jpg",\n      "geo_coordinates": [36.1686, -115.1429],\n      "rating": 4.0,\n      "description": "A retro-themed hotel with a focus on affordability, offering a lively casino, diverse dining options, and free live entertainment."\n    },\n    {\n      "hotel_name": "Golden Nugget Las Vegas",\n      "hotel_address": "129 E Fremont Street, Las Vegas, NV 89101",\n      "price": "$75-$150 per night",\n      "hotel_image_url": "https://images.trvl-media.com/hotels/4000000/3978000/3977900/3977920/3977920_40.jpg",\n      "geo_coordinates": [36.1674, -115.1434],\n      "rating": 4.5,\n      "description": "A historic hotel with a vibrant casino, a popular pool area, and a variety of restaurants and bars, known for its aquarium and water slide."\n    },\n    {\n      "hotel_name": "Circus Circus Hotel & Casino",\n      "hotel_address": "2880 S Las Vegas Blvd, Las Vegas, NV 89109",\n      "price": "$40-$80 per night",\n      "hotel_image_url": "https://images.trvl-media.com/hotels/4000000/3979000/3978400/3978459/3978459_19.jpg",\n      "geo_coordinates": [36.1168, -115.1723],\n      "rating": 3.5,\n      "description": "A family-friendly option with a carnival theme, featuring a circus act, amusement park, and a variety of affordable dining options."\n    }\n  ],\n  "itinerary": {\n    "day1": {\n      "morning": {\n        "place_name": "Fremont Street Experience",\n        "place_details": "A vibrant pedestrian mall with a canopy of lights and free live entertainment. You can also find street performers and unique shops here.",\n        "place_image_url": "https://www.visitlasvegas.com/sites/default/files/styles/hero/public/images/2023/04/fremont-street-experience-las-vegas-hero.jpg",\n        "geo_coordinates": [36.1679, -115.1423],\n        "ticket_pricing": "Free",\n        "rating": 4.5,\n        "time_travel": "9:00 AM - 12:00 PM"\n      },\n      "afternoon": {\n        "place_name": "The Mob Museum",\n        "place_details": "A museum dedicated to the history of organized crime in America, with interactive exhibits and stories about famous gangsters.",\n        "place_image_url": "https://www.themobmuseum.org/media/images/mob-museum-header.jpg",\n        "geo_coordinates": [36.1690, -115.1425],\n        "ticket_pricing": "$29.95 per adult",\n        "rating": 4.0,\n        "time_travel": "1:00 PM - 4:00 PM"\n      },\n      "evening": {\n        "place_name": "Neon Museum",\n        "place_details": "A museum displaying historic neon signs from Las Vegas, offering a glimpse into the city\'s past and unique charm.",\n        "place_image_url": "https://www.neonmuseum.org/wp-content/uploads/2022/01/IMG_3354-scaled.jpg",\n        "geo_coordinates": [36.1716, -115.1451],\n        "ticket_pricing": "$22 per adult",\n        "rating": 4.5,\n        "time_travel": "5:00 PM - 7:00 PM"\n      }\n    },\n    "day2": {\n      "morning": {\n        "place_name": "Hoover Dam",\n        "place_details": "A historic dam and engineering marvel, offering tours, scenic views, and a chance to learn about its construction and importance.",\n        "place_image_url": "https://www.nps.gov/media/images/3474/6163.jpg",\n        "geo_coordinates": [36.0049, -114.8916],\n        "ticket_pricing": "Free (parking is $10)",\n        "rating": 5.0,\n        "time_travel": "9:00 AM - 12:00 PM"\n      },\n      "afternoon": {\n        "place_name": "Red Rock Canyon National Conservation Area",\n        "place_details": "A scenic area with dramatic red rock formations, offering hiking trails, rock climbing opportunities, and stunning views.",\n        "place_image_url": "https://www.nps.gov/media/images/3474/8005.jpg",\n        "geo_coordinates": [36.0704, -115.3215],\n        "ticket_pricing": "$15 per vehicle",\n        "rating": 4.5,\n        "time_travel": "1:00 PM - 4:00 PM"\n      },\n      "evening": {\n        "place_name": "Bellagio Conservatory & Botanical Garden",\n        "place_details": "A beautiful botanical garden located inside the Bellagio Hotel, showcasing seasonal floral displays and artistic creations.",\n        "place_image_url": "https://www.bellagio.com/content/dam/bellagio/images/conservatory/2023/Spring-2023-Bellagio-Conservatory-and-Botanical-Garden-hero.jpg",\n        "geo_coordinates": [36.1110, -115.1728],\n        "ticket_pricing": "Free",\n        "rating": 4.0,\n        "time_travel": "5:00 PM - 7:00 PM"\n      }\n    },\n    "day3": {\n      "morning": {\n        "place_name": "The Strip",\n        "place_details": "The famous Las Vegas Strip, lined with iconic hotels, casinos, entertainment venues, and plenty of things to see and do.",\n        "place_image_url": "https://www.visitlasvegas.com/sites/default/files/styles/hero/public/images/2023/03/las-vegas-strip-hero.jpg",\n        "geo_coordinates": [36.1149, -115.1739],\n        "ticket_pricing": "Free (except for specific attractions)",\n        "rating": 5.0,\n        "time_travel": "9:00 AM - 12:00 PM"\n      },\n      "afternoon": {\n        "place_name": "High Roller Observation Wheel",\n        "place_details": "A giant observation wheel offering panoramic views of Las Vegas, with various packages including an open bar or a VIP experience.",\n        "place_image_url": "https://www.caesars.com/content/dam/caesars/las-vegas/attractions/high-roller/high-roller-overview.jpg",\n        "geo_coordinates": [36.1189, -115.1737],\n        "ticket_pricing": "$34.95 per adult",\n        "rating": 4.5,\n        "time_travel": "1:00 PM - 4:00 PM"\n      },\n      "evening": {\n        "place_name": "Fountains of Bellagio",\n        "place_details": "A spectacular water and light show synchronized to music, held every 15 minutes in front of the Bellagio Hotel.",\n        "place_image_url": "https://www.bellagio.com/content/dam/bellagio/images/fountains/fountains-show-night-hero.jpg",\n        "geo_coordinates": [36.1110, -115.1728],\n        "ticket_pricing": "Free",\n        "rating": 5.0,\n        "time_travel": "7:00 PM - 9:00 PM"\n      }\n    }\n  }\n}\n```\n\n**Please note:**\n\n* Prices are approximate and may vary based on the season and availability.\n* Itineraries are suggestions and can be customized based on your preferences.\n* It\'s recommended to book tickets in advance for popular attractions, especially during peak season.\n* Consider taking advantage of free activities like walking along the Strip, exploring the casinos, and enjoying free shows.\n* Look for discounts and deals online or at your hotel.\n* Pack comfortable shoes as you\'ll be doing a lot of walking.\n* Remember to stay hydrated, especially during the summer months.\n* Have fun and enjoy your trip!\n',
          },
        ],
      },
    ],
  });