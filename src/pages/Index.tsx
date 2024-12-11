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

const Index = () => {
  const [selectedLocation, setSelectedLocation] = useState("London-UK");

  const { data: prayerTimes = DEFAULT_PRAYER_TIMES, isLoading } = useQuery({
    queryKey: ["prayerTimes", selectedLocation],
    queryFn: async () => {
      const [city, country] = selectedLocation.split("-");
      try {
        console.log(`Fetching prayer times for ${city}, ${country}`);
        
        const cityConfig = CITY_METHODS[city] || CITY_METHODS["DEFAULT"];
        console.log(`Using calculation method ${cityConfig.method} for ${city}`);
        
        const response = await fetch(
          `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=${cityConfig.method}`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch prayer times');
        }
        
        const data = await response.json();
        console.log("Prayer times response:", data);
        const { Fajr, Dhuhr, Asr, Maghrib, Isha } = data.data.timings;

        // Apply offsets if they exist for the city
        const offsets = cityConfig.offsets || {};
        const adjustTime = (time: string, offset: number = 0) => {
          if (offset === 0) return time;
          const [hours, minutes] = time.split(':').map(Number);
          const totalMinutes = hours * 60 + minutes + offset;
          const newHours = Math.floor(totalMinutes / 60) % 24;
          const newMinutes = totalMinutes % 60;
          return `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}`;
        };

        return {
          Fajr: adjustTime(Fajr, offsets.Fajr),
          Dhuhr: adjustTime(Dhuhr, offsets.Dhuhr),
          Asr: adjustTime(Asr, offsets.Asr),
          Maghrib: adjustTime(Maghrib, offsets.Maghrib),
          Isha: adjustTime(Isha, offsets.Isha)
        };
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