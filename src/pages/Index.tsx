import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AlertTriangle } from "lucide-react";
import citiesData from "cities.json";
import { toast } from "sonner";
import { LocationSelector } from "@/components/LocationSelector";
import { PrayerTimeCards } from "@/components/PrayerTimeCards";
import { Location, DEFAULT_PRAYER_TIMES } from "@/types/prayer";

// Filter cities data to reduce memory usage
const locations: Location[] = (citiesData as any[])
  .filter(city => city.population > 1000000)
  .map(city => ({
    city: city.name,
    country: city.country,
    lat: city.lat,
    lng: city.lng
  }))
  .sort((a, b) => a.city.localeCompare(b.city));

const Index = () => {
  const [selectedCity, setSelectedCity] = useState<string>("London");
  const [selectedCountry, setSelectedCountry] = useState<string>("GB");

  const { data: prayerData, isLoading, isError } = useQuery({
    queryKey: ["prayerTimes", selectedCity, selectedCountry],
    queryFn: async () => {
      try {
        const response = await fetch(
          `https://api.aladhan.com/v1/timingsByCity?city=${selectedCity}&country=${selectedCountry}&method=2`
        );
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        const { Fajr, Dhuhr, Asr, Maghrib, Isha } = data.data.timings;
        return { Fajr, Dhuhr, Asr, Maghrib, Isha };
      } catch (error) {
        console.error("Prayer times fetch error:", error);
        toast.error("Unable to fetch prayer times. Using default times.", {
          description: "Please check your internet connection."
        });
        return DEFAULT_PRAYER_TIMES;
      }
    },
    retry: 1,
  });

  const handleLocationSelect = (value: string) => {
    const [city, country] = value.split("-");
    setSelectedCity(city);
    setSelectedCountry(country);
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-b from-emerald-900/90 to-emerald-950/90 py-16">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 pointer-events-none"
        style={{
          backgroundImage: `url("https://images.pexels.com/photos/1537086/pexels-photo-1537086.jpeg?auto=compress&cs=tinysrgb&w=1920")`
        }}
      />

      <div className="max-w-4xl mx-auto space-y-8 relative">
        <div className="text-center space-y-6">
          <h1 className="text-7xl font-bold text-white tracking-tight drop-shadow-lg font-serif">
            Prayer Times
          </h1>
          <p className="text-2xl text-white/80 font-serif italic">
            Stay connected with your daily prayers
          </p>
        </div>

        <LocationSelector 
          locations={locations} 
          onLocationSelect={handleLocationSelect}
          defaultValue={`${selectedCity}-${selectedCountry}`}
        />

        {isLoading ? (
          <div className="text-center text-white/80">Loading prayer times...</div>
        ) : (
          <PrayerTimeCards prayerTimes={prayerData || DEFAULT_PRAYER_TIMES} />
        )}

        {isError && (
          <div className="text-center text-red-500 flex items-center justify-center gap-2">
            <AlertTriangle className="w-6 h-6" />
            Unable to fetch prayer times. Please try again later.
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;