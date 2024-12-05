import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Clock, MapPin } from "lucide-react";

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
}

const locations: Location[] = [
  // Middle East
  { city: "Mecca", country: "Saudi Arabia" },
  { city: "Medina", country: "Saudi Arabia" },
  { city: "Riyadh", country: "Saudi Arabia" },
  { city: "Dubai", country: "UAE" },
  { city: "Abu Dhabi", country: "UAE" },
  { city: "Doha", country: "Qatar" },
  { city: "Kuwait City", country: "Kuwait" },
  { city: "Manama", country: "Bahrain" },
  { city: "Muscat", country: "Oman" },
  { city: "Baghdad", country: "Iraq" },
  { city: "Tehran", country: "Iran" },
  
  // Asia
  { city: "Jakarta", country: "Indonesia" },
  { city: "Kuala Lumpur", country: "Malaysia" },
  { city: "Islamabad", country: "Pakistan" },
  { city: "Lahore", country: "Pakistan" },
  { city: "Karachi", country: "Pakistan" },
  { city: "Dhaka", country: "Bangladesh" },
  { city: "Istanbul", country: "Turkey" },
  { city: "Ankara", country: "Turkey" },
  
  // Africa
  { city: "Cairo", country: "Egypt" },
  { city: "Alexandria", country: "Egypt" },
  { city: "Casablanca", country: "Morocco" },
  { city: "Rabat", country: "Morocco" },
  { city: "Tunis", country: "Tunisia" },
  { city: "Algiers", country: "Algeria" },
  { city: "Tripoli", country: "Libya" },
  { city: "Khartoum", country: "Sudan" },
  
  // Europe
  { city: "London", country: "UK" },
  { city: "Birmingham", country: "UK" },
  { city: "Paris", country: "France" },
  { city: "Berlin", country: "Germany" },
  { city: "Amsterdam", country: "Netherlands" },
  { city: "Brussels", country: "Belgium" },
  { city: "Moscow", country: "Russia" },
  
  // Americas
  { city: "New York", country: "USA" },
  { city: "Los Angeles", country: "USA" },
  { city: "Chicago", country: "USA" },
  { city: "Toronto", country: "Canada" },
  { city: "Vancouver", country: "Canada" },
  
  // Asia Pacific
  { city: "Sydney", country: "Australia" },
  { city: "Melbourne", country: "Australia" },
  { city: "Auckland", country: "New Zealand" },
  { city: "Singapore", country: "Singapore" },
  { city: "Tokyo", country: "Japan" }
].sort((a, b) => a.city.localeCompare(b.city));

const Index = () => {
  const [selectedCity, setSelectedCity] = useState<string>("London");
  const [selectedCountry, setSelectedCountry] = useState<string>("UK");

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

  const handleCitySelect = (value: string) => {
    const [city, country] = value.split("-");
    setSelectedCity(city);
    setSelectedCountry(country);
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-b from-emerald-900/90 to-emerald-950/90">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 pointer-events-none"
        style={{
          backgroundImage: `url("https://images.pexels.com/photos/1537086/pexels-photo-1537086.jpeg?auto=compress&cs=tinysrgb&w=1920")`
        }}
      />

      <div className="max-w-4xl mx-auto space-y-8 relative p-8 pt-16 md:pt-8">
        <div className="text-center space-y-6">
          <h1 className="text-7xl font-bold text-white tracking-tight drop-shadow-lg font-serif">
            Prayer Times
          </h1>
        </div>

        <div className="w-full max-w-xs mx-auto">
          <Select onValueChange={handleCitySelect} value={`${selectedCity}-${selectedCountry}`}>
            <SelectTrigger className="w-full bg-white/90 backdrop-blur-sm border-emerald-200 hover:border-emerald-300 transition-colors">
              <MapPin className="w-4 h-4 mr-2 text-emerald-600" />
              <SelectValue placeholder="Select a city" />
            </SelectTrigger>
            <SelectContent className="max-h-[300px]">
              <SelectGroup>
                {locations.map((location) => (
                  <SelectItem
                    key={`${location.city}-${location.country}`}
                    value={`${location.city}-${location.country}`}
                  >
                    {location.city}, {location.country}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
          <div className="text-center text-white/80">Loading prayer times...</div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {prayerData && Object.entries(prayerData).map(([prayer, time]) => (
              <Card key={prayer} className="bg-white/90 backdrop-blur-sm border-none hover:shadow-xl transition-all duration-300 group">
                <CardHeader className="bg-emerald-50/50 rounded-t-lg border-b border-emerald-100/50">
                  <CardTitle className="text-center text-lg text-emerald-900 flex items-center justify-center gap-2">
                    <Clock className="w-4 h-4 text-emerald-600 group-hover:rotate-12 transition-transform" />
                    {prayer}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-2xl font-semibold text-emerald-950 py-4">{time}</p>
                </CardContent>
              </Card>
            ))}
            <Card className="bg-white/90 backdrop-blur-sm border-none hover:shadow-xl transition-all duration-300 group">
              <CardHeader className="bg-emerald-50/50 rounded-t-lg border-b border-emerald-100/50">
                <CardTitle className="text-center text-lg text-emerald-900">
                  Inspiration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-dancing-script text-2xl text-emerald-900 italic tracking-wide py-4">
                  Stay Connected to Allah, One Prayer at a Time
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
