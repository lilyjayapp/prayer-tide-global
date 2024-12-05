import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Clock, MapPin } from "lucide-react";
import citiesData from "cities.json";

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

// Process cities data more efficiently
const locations: Location[] = (citiesData as any[])
  .filter(city => city.population > 500000) // Increased population threshold
  .slice(0, 1000) // Limit to top 1000 cities
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
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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

  const filteredLocations = locations.filter(location => {
    if (!searchQuery) return true;
    const searchLower = searchQuery.toLowerCase();
    return (
      location.city.toLowerCase().includes(searchLower) ||
      location.country.toLowerCase().includes(searchLower)
    );
  }).slice(0, 50); // Limit filtered results

  const handleLocationSelect = (location: Location) => {
    setSelectedCity(location.city);
    setSelectedCountry(location.country);
    setOpen(false);
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
        </div>

        <div className="w-full max-w-xs mx-auto">
          <button
            className="w-full flex items-center justify-between px-3 py-2 bg-white/90 backdrop-blur-sm border border-emerald-200 hover:border-emerald-300 transition-colors rounded-md"
            onClick={() => setOpen(true)}
          >
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2 text-emerald-600" />
              <span>{selectedCity}, {selectedCountry}</span>
            </div>
          </button>
          <CommandDialog open={open} onOpenChange={setOpen}>
            <Command>
              <CommandInput 
                placeholder="Search cities..." 
                value={searchQuery}
                onValueChange={setSearchQuery}
              />
              <CommandList>
                <CommandEmpty>No cities found.</CommandEmpty>
                <CommandGroup heading="Cities">
                  {filteredLocations.map((location) => (
                    <CommandItem
                      key={`${location.city}-${location.country}`}
                      value={`${location.city}-${location.country}`}
                      onSelect={() => handleLocationSelect(location)}
                    >
                      <MapPin className="mr-2 h-4 w-4" />
                      {location.city}, {location.country}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </CommandDialog>
        </div>

        {isLoading ? (
          <div className="text-center text-white/80">Loading prayer times...</div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
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
            <Card className="bg-white/90 backdrop-blur-sm border-none hover:shadow-xl transition-all duration-300 group">
              <CardHeader className="bg-emerald-50/50 rounded-t-lg border-b border-emerald-100/50 p-3">
                <CardTitle className="text-center text-lg text-emerald-900">
                  Inspiration
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3">
                <p className="font-dancing-script text-xl text-emerald-900 italic tracking-wide">
                  One Prayer at a Time
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