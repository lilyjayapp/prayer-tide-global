import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Clock, Landmark } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LocationSelector } from "@/components/LocationSelector";
import { Location } from "@/types/prayer";

const cities: Location[] = [
  { city: "Addis Ababa", country: "Ethiopia", lat: 9.0450, lng: 38.7468 },
  { city: "Amman", country: "Jordan", lat: 31.9454, lng: 35.9284 },
  { city: "Amsterdam", country: "Netherlands", lat: 52.3676, lng: 4.9041 },
  { city: "Andorra", country: "Andorra", lat: 42.5063, lng: 1.5218 },
  { city: "Antananarivo", country: "Madagascar", lat: -18.8792, lng: 47.5079 },
  { city: "Athens", country: "Greece", lat: 37.9838, lng: 23.7275 },
  { city: "Ashgabat", country: "Turkmenistan", lat: 37.9509, lng: 58.3794 },
  { city: "Baghdad", country: "Iraq", lat: 33.3152, lng: 44.3661 },
  { city: "Baku", country: "Azerbaijan", lat: 40.4093, lng: 49.8671 },
  { city: "Bangkok", country: "Thailand", lat: 13.7563, lng: 100.5018 },
  { city: "Beijing", country: "China", lat: 39.9042, lng: 116.4074 },
  { city: "Beirut", country: "Lebanon", lat: 33.8938, lng: 35.5018 },
  { city: "Belgrade", country: "Serbia", lat: 44.7866, lng: 20.4489 },
  { city: "Berlin", country: "Germany", lat: 52.5200, lng: 13.4050 },
  { city: "Bishkek", country: "Kyrgyzstan", lat: 42.8746, lng: 74.5698 },
  { city: "Bratislava", country: "Slovakia", lat: 48.1486, lng: 17.1077 },
  { city: "Brussels", country: "Belgium", lat: 50.8503, lng: 4.3517 },
  { city: "Bucharest", country: "Romania", lat: 44.4268, lng: 26.1025 },
  { city: "Budapest", country: "Hungary", lat: 47.4979, lng: 19.0402 },
  { city: "Cairo", country: "Egypt", lat: 30.0444, lng: 31.2357 },
  { city: "Cape Town", country: "South Africa", lat: -33.9249, lng: 18.4241 },
  { city: "Colombo", country: "Sri Lanka", lat: 6.9271, lng: 79.8612 },
  { city: "Copenhagen", country: "Denmark", lat: 55.6761, lng: 12.5683 },
  { city: "Dar es Salaam", country: "Tanzania", lat: -6.8160, lng: 39.2833 },
  { city: "Dhaka", country: "Bangladesh", lat: 23.8103, lng: 90.4125 },
  { city: "Doha", country: "Qatar", lat: 25.2854, lng: 51.5310 },
  { city: "Dubai", country: "UAE", lat: 25.2048, lng: 55.2708 },
  { city: "Dublin", country: "Ireland", lat: 53.3498, lng: -6.2603 },
  { city: "Gaborone", country: "Botswana", lat: -24.6282, lng: 25.9231 },
  { city: "Hanoi", country: "Vietnam", lat: 21.0278, lng: 105.8342 },
  { city: "Harare", country: "Zimbabwe", lat: -17.8292, lng: 31.0522 },
  { city: "Helsinki", country: "Finland", lat: 60.1699, lng: 24.9384 },
  { city: "Hong Kong", country: "China", lat: 22.3193, lng: 114.1694 },
  { city: "Istanbul", country: "Turkey", lat: 41.0082, lng: 28.9784 },
  { city: "Jakarta", country: "Indonesia", lat: -6.2088, lng: 106.8456 },
  { city: "Jerusalem", country: "Israel", lat: 31.7683, lng: 35.2137 },
  { city: "Kampala", country: "Uganda", lat: 0.3476, lng: 32.5825 },
  { city: "Kathmandu", country: "Nepal", lat: 27.7172, lng: 85.3240 },
  { city: "Khartoum", country: "Sudan", lat: 15.5007, lng: 32.5599 },
  { city: "Kuala Lumpur", country: "Malaysia", lat: 3.1390, lng: 101.6869 },
  { city: "Kuwait City", country: "Kuwait", lat: 29.3759, lng: 47.9774 },
  { city: "Lagos", country: "Nigeria", lat: 6.5244, lng: 3.3792 },
  { city: "Lisbon", country: "Portugal", lat: 38.7223, lng: -9.1393 },
  { city: "London", country: "UK", lat: 51.5074, lng: -0.1278 },
  { city: "Luxembourg", country: "Luxembourg", lat: 49.6116, lng: 6.1319 },
  { city: "Madrid", country: "Spain", lat: 40.4168, lng: -3.7038 },
  { city: "Male", country: "Maldives", lat: 4.1755, lng: 73.5093 },
  { city: "Manama", country: "Bahrain", lat: 26.2285, lng: 50.5860 },
  { city: "Mexico City", country: "Mexico", lat: 19.4326, lng: -99.1332 },
  { city: "Moscow", country: "Russia", lat: 55.7558, lng: 37.6173 },
  { city: "Mumbai", country: "India", lat: 19.0760, lng: 72.8777 },
  { city: "Muscat", country: "Oman", lat: 23.5880, lng: 58.3829 },
  { city: "Nairobi", country: "Kenya", lat: -1.2921, lng: 36.8219 },
  { city: "New York", country: "USA", lat: 40.7128, lng: -74.0060 },
  { city: "Oslo", country: "Norway", lat: 59.9139, lng: 10.7522 },
  { city: "Paris", country: "France", lat: 48.8566, lng: 2.3522 },
  { city: "Phnom Penh", country: "Cambodia", lat: 11.5564, lng: 104.9282 },
  { city: "Port Louis", country: "Mauritius", lat: -20.1609, lng: 57.5012 },
  { city: "Prague", country: "Czech Republic", lat: 50.0755, lng: 14.4378 },
  { city: "Pretoria", country: "South Africa", lat: -25.7461, lng: 28.1881 },
  { city: "Riyadh", country: "Saudi Arabia", lat: 24.7136, lng: 46.6753 },
  { city: "Rome", country: "Italy", lat: 41.9028, lng: 12.4964 },
  { city: "Seoul", country: "South Korea", lat: 37.5665, lng: 126.9780 },
  { city: "Singapore", country: "Singapore", lat: 1.3521, lng: 103.8198 },
  { city: "Stockholm", country: "Sweden", lat: 59.3293, lng: 18.0686 },
  { city: "Sydney", country: "Australia", lat: -33.8688, lng: 151.2093 },
  { city: "Tehran", country: "Iran", lat: 35.6892, lng: 51.3890 },
  { city: "Tokyo", country: "Japan", lat: 35.6762, lng: 139.6503 },
  { city: "Toronto", country: "Canada", lat: 43.6532, lng: -79.3832 },
  { city: "Vienna", country: "Austria", lat: 48.2082, lng: 16.3738 },
  { city: "Warsaw", country: "Poland", lat: 52.2297, lng: 21.0122 },
  { city: "Yangon", country: "Myanmar", lat: 16.8661, lng: 96.1951 }
];

const DEFAULT_PRAYER_TIMES = {
  Fajr: "05:30",
  Dhuhr: "12:30",
  Asr: "15:45",
  Maghrib: "18:15",
  Isha: "19:45"
};

const Index = () => {
  const [selectedLocation, setSelectedLocation] = useState("London-UK");

  const { data: prayerTimes = DEFAULT_PRAYER_TIMES, isLoading } = useQuery({
    queryKey: ["prayerTimes", selectedLocation],
    queryFn: async () => {
      const [city, country] = selectedLocation.split("-");
      try {
        console.log(`Fetching prayer times for ${city}, ${country}`);
        // Use method 13 (Turkish Diyanet) for Istanbul, method 2 (ISNA) for others
        const method = city === "Istanbul" ? 13 : 2;
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