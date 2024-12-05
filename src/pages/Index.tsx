import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, MapPin } from "lucide-react";
import citiesData from "cities.json";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PrayerTimes {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

interface Location {
  city: string;
  country: string;
  lat: number;
  lng: number;
}

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

  const { data: prayerData, isLoading } = useQuery({
    queryKey: ["prayerTimes", selectedCity, selectedCountry],
    queryFn: async () => {
      const response = await fetch(
        `https://api.aladhan.com/v1/timingsByCity?city=${selectedCity}&country=${selectedCountry}&method=2`
      );
      const data = await response.json();
      const { Fajr, Dhuhr, Asr, Maghrib, Isha } = data.data.timings;
      return { Fajr, Dhuhr, Asr, Maghrib, Isha };
    },
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
          <p className="text-2xl text-white/80 font-dancing-script">
            Stay connected with your daily prayers
          </p>
        </div>

        <div className="w-full max-w-xs mx-auto">
          <Select onValueChange={handleLocationSelect} defaultValue={`${selectedCity}-${selectedCountry}`}>
            <SelectTrigger className="w-full bg-white/90 backdrop-blur-sm border-emerald-200 hover:border-emerald-300">
              <SelectValue placeholder="Select a city" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((location) => (
                <SelectItem 
                  key={`${location.city}-${location.country}`}
                  value={`${location.city}-${location.country}`}
                >
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-emerald-600" />
                    {location.city}, {location.country}
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
            {prayerData && Object.entries(prayerData).map(([prayer, time]) => (
              <Card key={prayer} className="bg-white/90 backdrop-blur-sm border-none hover:shadow-xl transition-all duration-300 group">
                <CardHeader className="bg-emerald-50/50 rounded-t-lg border-b border-emerald-100/50 p-3">
                  <CardTitle className="text-center text-lg text-emerald-900 flex items-center justify-center gap-2">
                    <Clock className="w-4 h-4 text-emerald-600 group-hover:rotate-12 transition-transform" />
                    {prayer}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3">
                  <p className="text-center text-2xl font-semibold text-emerald-950">{time}</p>
                </CardContent>
              </Card>
            ))}
            
            {/* Slogan added back near the Isha card */}
            <div className="absolute bottom-0 right-0 p-4 text-sm text-white/70 font-dancing-script opacity-80">
              One pray at a time
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;