import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
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

interface City {
  city: string;
  country: string;
}

const cities: City[] = [
  { city: "Abu Dhabi", country: "UAE" },
  { city: "Amsterdam", country: "Netherlands" },
  { city: "Bangkok", country: "Thailand" },
  { city: "Barcelona", country: "Spain" },
  { city: "Berlin", country: "Germany" },
  { city: "Cairo", country: "Egypt" },
  { city: "Cape Town", country: "South Africa" },
  { city: "Chicago", country: "USA" },
  { city: "Dubai", country: "UAE" },
  { city: "Hong Kong", country: "China" },
  { city: "Istanbul", country: "Turkey" },
  { city: "Jakarta", country: "Indonesia" },
  { city: "Kuala Lumpur", country: "Malaysia" },
  { city: "London", country: "UK" },
  { city: "Los Angeles", country: "USA" },
  { city: "Madrid", country: "Spain" },
  { city: "Mecca", country: "Saudi Arabia" },
  { city: "Medina", country: "Saudi Arabia" },
  { city: "Melbourne", country: "Australia" },
  { city: "Moscow", country: "Russia" },
  { city: "Mumbai", country: "India" },
  { city: "New York", country: "USA" },
  { city: "Paris", country: "France" },
  { city: "Rio de Janeiro", country: "Brazil" },
  { city: "Rome", country: "Italy" },
  { city: "Singapore", country: "Singapore" },
  { city: "Sydney", country: "Australia" },
  { city: "Tokyo", country: "Japan" },
  { city: "Toronto", country: "Canada" },
  { city: "Vancouver", country: "Canada" }
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
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div 
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23015c3b' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="text-center space-y-4 relative">
          <h1 className="text-5xl font-bold text-emerald-900 tracking-tight">
            Islamic Prayer Times
          </h1>
          <p className="text-emerald-700 text-lg">
            Select your city to view daily prayer times
          </p>
        </div>

        <div className="w-full max-w-xs mx-auto">
          <Select onValueChange={handleCitySelect} value={`${selectedCity}-${selectedCountry}`}>
            <SelectTrigger className="w-full bg-white/80 backdrop-blur-sm border-emerald-200 hover:border-emerald-300 transition-colors">
              <MapPin className="w-4 h-4 mr-2 text-emerald-600" />
              <SelectValue placeholder="Select a city" />
            </SelectTrigger>
            <SelectContent className="max-h-[300px]">
              <SelectGroup>
                {cities.map((cityItem) => (
                  <SelectItem
                    key={`${cityItem.city}-${cityItem.country}`}
                    value={`${cityItem.city}-${cityItem.country}`}
                  >
                    {cityItem.city}, {cityItem.country}
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
              <Card key={prayer} className="bg-white/80 backdrop-blur-sm border-emerald-100 hover:shadow-lg transition-all duration-300 group">
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