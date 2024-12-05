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
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white p-8 relative">
      {/* Islamic Pattern Background */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23015c3b' fill-opacity='0.4'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-4xl mx-auto space-y-8 relative">
        <div className="text-center space-y-4">
          <h1 className="text-6xl font-bold text-emerald-900 tracking-tight">
            Prayer Times
          </h1>
          <div className="h-16 w-full bg-contain bg-center bg-no-repeat opacity-30"
               style={{
                 backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='20' viewBox='0 0 200 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 10 C50 0, 150 0, 200 10 C150 20, 50 20, 0 10' stroke='%23047857' fill='none' /%3E%3C/svg%3E")`
               }} />
        </div>

        <div className="w-full max-w-xs mx-auto">
          <Select onValueChange={handleCitySelect} value={`${selectedCity}-${selectedCountry}`}>
            <SelectTrigger className="w-full bg-white/80 backdrop-blur-sm border-emerald-200 hover:border-emerald-300 transition-colors">
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
          <div className="text-center text-emerald-700">Loading prayer times...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {prayerData && Object.entries(prayerData).map(([prayer, time]) => (
              <Card key={prayer} className="bg-white/80 backdrop-blur-sm border-emerald-100 hover:shadow-lg transition-all duration-300 group relative overflow-hidden">
                <div className="absolute inset-0 opacity-5 pointer-events-none"
                     style={{
                       backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20 L40 20 L30 30 L20 20 L10 30 L0 20 L20 20' stroke='%23047857' fill='none' /%3E%3C/svg%3E")`,
                       backgroundSize: '40px 40px'
                     }} />
                <CardHeader className="bg-emerald-50/50 rounded-t-lg border-b border-emerald-100">
                  <CardTitle className="text-center text-lg text-emerald-800 flex items-center justify-center gap-2">
                    <Clock className="w-4 h-4 text-emerald-600 group-hover:rotate-12 transition-transform" />
                    {prayer}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-2xl font-semibold text-emerald-900 py-4">{time}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
