import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Clock, Landmark } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LocationSelector } from "@/components/LocationSelector";
import { cities } from "@/data/cities";
import { CITY_METHODS } from "@/data/prayerMethods";

const DEFAULT_PRAYER_TIMES = {
  Fajr: "05:30",
  Dhuhr: "12:30",
  Asr: "15:45",
  Maghrib: "18:15",
  Isha: "19:45"
};

// Prayer calculation methods by city
const CITY_METHODS = {
  // Middle East
  "Istanbul": 13,    // Turkish Diyanet
  "Ankara": 13,     // Turkish Diyanet
  "Izmir": 13,      // Turkish Diyanet
  "Cairo": 5,       // Egyptian General Authority
  "Alexandria": 5,   // Egyptian General Authority
  "Dubai": 3,       // Muslim World League
  "Abu Dhabi": 3,   // Muslim World League
  "Sharjah": 3,     // Muslim World League
  "Mecca": 4,       // Umm Al-Qura University
  "Medina": 4,      // Umm Al-Qura University
  "Jeddah": 4,      // Umm Al-Qura University
  "Riyadh": 4,      // Umm Al-Qura University
  "Tehran": 7,      // Institute of Geophysics, University of Tehran
  "Mashhad": 7,     // Institute of Geophysics, University of Tehran
  "Baghdad": 5,     // Egyptian General Authority
  "Amman": 3,       // Muslim World League
  "Damascus": 3,    // Muslim World League
  "Beirut": 3,      // Muslim World League
  "Kuwait City": 3, // Muslim World League
  "Manama": 3,      // Muslim World League
  "Doha": 3,        // Muslim World League
  "Muscat": 3,      // Muslim World League
  "Sana'a": 3,      // Muslim World League

  // South Asia
  "Karachi": 1,     // University of Islamic Sciences, Karachi
  "Lahore": 1,      // University of Islamic Sciences, Karachi
  "Islamabad": 1,   // University of Islamic Sciences, Karachi
  "Dhaka": 1,       // University of Islamic Sciences, Karachi
  "Mumbai": 1,      // University of Islamic Sciences, Karachi
  "Delhi": 1,       // University of Islamic Sciences, Karachi
  "Kolkata": 1,     // University of Islamic Sciences, Karachi
  "Colombo": 1,     // University of Islamic Sciences, Karachi

  // Southeast Asia
  "Singapore": 11,  // Singapore MUIS
  "Kuala Lumpur": 11, // Similar to Singapore
  "Jakarta": 11,    // Similar to Singapore
  "Bandung": 11,    // Similar to Singapore

  // East Asia
  "Tokyo": 3,       // Muslim World League
  "Seoul": 3,       // Muslim World League
  "Beijing": 3,     // Muslim World League
  "Hong Kong": 3,   // Muslim World League

  // Central Asia
  "Tashkent": 3,    // Muslim World League
  "Almaty": 3,      // Muslim World League
  "Bishkek": 3,     // Muslim World League

  // Europe
  "Moscow": 14,     // Russian Council of Muftis
  "London": 2,      // ISNA
  "Paris": 2,       // ISNA
  "Berlin": 2,      // ISNA
  "Rome": 2,        // ISNA
  "Madrid": 2,      // ISNA
  "Amsterdam": 2,   // ISNA
  "Brussels": 2,    // ISNA
  "Vienna": 2,      // ISNA
  "Stockholm": 2,   // ISNA
  "Oslo": 2,        // ISNA
  "Copenhagen": 2,  // ISNA
  "Helsinki": 2,    // ISNA

  // North America
  "New York": 2,    // ISNA
  "Washington": 2,  // ISNA
  "Chicago": 2,     // ISNA
  "Los Angeles": 2, // ISNA
  "Toronto": 2,     // ISNA
  "Vancouver": 2,   // ISNA
  "Montreal": 2,    // ISNA

  // Africa
  "Casablanca": 3,  // Muslim World League
  "Algiers": 3,     // Muslim World League
  "Tunis": 3,       // Muslim World League
  "Tripoli": 3,     // Muslim World League
  "Khartoum": 3,    // Muslim World League
  "Nairobi": 3,     // Muslim World League
  "Lagos": 3,       // Muslim World League
  "Addis Ababa": 3, // Muslim World League

  // Oceania
  "Sydney": 2,      // ISNA
  "Melbourne": 2,   // ISNA
  "Perth": 2,       // ISNA
  "Auckland": 2     // ISNA
};

const Index = () => {
  const [selectedLocation, setSelectedLocation] = useState("London-UK");

  const { data: prayerTimes = DEFAULT_PRAYER_TIMES, isLoading } = useQuery({
    queryKey: ["prayerTimes", selectedLocation],
    queryFn: async () => {
      const [city, country] = selectedLocation.split("-");
      try {
        console.log(`Fetching prayer times for ${city}, ${country}`);
        
        // Get the specific method for the city, or use ISNA (method 2) as default
        const method = CITY_METHODS[city as keyof typeof CITY_METHODS] || 2;
        console.log(`Using calculation method ${method} for ${city}`);
        
        const response = await fetch(
          `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=${method}`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch prayer times');
        }
        
        const data = await response.json();
        console.log("Prayer times response:", data);
        const { Fajr, Dhuhr, Asr, Maghrib, Isha } = data.data.timings;
        return { Fajr, Dhuhr, Asr, Maghrib, Isha };
      } catch (error) {
        console.error("Prayer times fetch error:", error);
        toast.error("Unable to fetch prayer times", {
          description: "Using default times instead"
        });
        return DEFAULT_PRAYER_TIMES;
      }
    },
  });

  return (
    <div className="min-h-screen relative bg-gradient-to-b from-emerald-900/90 to-emerald-950/90 py-16">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 pointer-events-none"
        style={{
          backgroundImage: `url("https://images.pexels.com/photos/1537086/pexels-photo-1537086.jpeg?auto=compress&cs=tinysrgb&w=1920")`
        }}
      />

      <div className="max-w-4xl mx-auto space-y-8 relative px-4">
        <div className="text-center space-y-6">
          <h1 className="text-7xl font-bold text-white tracking-tight drop-shadow-lg font-serif">
            Prayer Times
          </h1>
        </div>

        <LocationSelector 
          locations={cities} 
          onLocationSelect={setSelectedLocation} 
          defaultValue={selectedLocation} 
        />

        {isLoading ? (
          <div className="text-center text-white/80">Loading prayer times...</div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 relative">
            {Object.entries(prayerTimes).map(([prayer, time]) => (
              <Card key={prayer} className="bg-white/90 backdrop-blur-sm border-none hover:shadow-xl transition-all duration-300 group">
                <CardHeader className="bg-emerald-50/50 rounded-t-lg border-b border-emerald-100/50 p-3">
                  <CardTitle className="text-center text-lg text-emerald-900 flex items-center justify-center gap-2">
                    <Clock className="w-4 h-4 text-emerald-600 group-hover:rotate-12 transition-transform" />
                    {prayer}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3">
                  <p className="text-center text-2xl font-semibold text-emerald-950">
                    {time}
                  </p>
                </CardContent>
              </Card>
            ))}
            <Card className="bg-white/90 backdrop-blur-sm border-none hover:shadow-xl transition-all duration-300 group">
              <CardHeader className="bg-emerald-50/50 rounded-t-lg border-b border-emerald-100/50 p-3">
                <CardTitle className="text-center text-lg text-emerald-900 flex items-center justify-center gap-2">
                  <Landmark className="w-4 h-4 text-emerald-600 group-hover:rotate-12 transition-transform" />
                  Connect
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3">
                <p className="text-center text-xl font-semibold text-emerald-950 font-serif italic">
                  One pray at a time
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
