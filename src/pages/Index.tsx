import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Clock, Mosque } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Simplified city data structure
const cities = [
  { name: "London", country: "UK" },
  { name: "New York", country: "USA" },
  { name: "Tokyo", country: "Japan" },
  { name: "Istanbul", country: "Turkey" },
  { name: "Dubai", country: "UAE" },
  { name: "Singapore", country: "Singapore" },
  { name: "Kuala Lumpur", country: "Malaysia" },
  { name: "Jakarta", country: "Indonesia" }
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
        const response = await fetch(
          `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=2`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch prayer times');
        }
        
        const data = await response.json();
        const { Fajr, Dhuhr, Asr, Maghrib, Isha } = data.data.timings;
        return { Fajr, Dhuhr, Asr, Maghrib, Isha };
      } catch (error) {
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
          <p className="text-2xl text-white/80 font-serif italic">
            Stay connected with your daily prayers
          </p>
        </div>

        <div className="w-full max-w-xs mx-auto">
          <Select 
            onValueChange={setSelectedLocation} 
            defaultValue={selectedLocation}
          >
            <SelectTrigger className="w-full bg-white/90 backdrop-blur-sm border-emerald-200 hover:border-emerald-300">
              <SelectValue placeholder="Select a city" />
            </SelectTrigger>
            <SelectContent>
              {cities.map((city) => (
                <SelectItem 
                  key={`${city.name}-${city.country}`}
                  value={`${city.name}-${city.country}`}
                >
                  <div className="flex items-center">
                    <Mosque className="w-4 h-4 mr-2 text-emerald-600" />
                    {city.name}, {city.country}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

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
            <div className="absolute -bottom-8 right-0 text-sm text-emerald-100/70 font-serif italic">
              One pray at a time
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;