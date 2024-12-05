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
import { Input } from "@/components/ui/input";

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
  { city: "London", country: "UK" },
  { city: "Paris", country: "France" },
  { city: "New York", country: "USA" },
  { city: "Dubai", country: "UAE" },
  { city: "Istanbul", country: "Turkey" },
  { city: "Mecca", country: "Saudi Arabia" },
  { city: "Medina", country: "Saudi Arabia" },
  { city: "Cairo", country: "Egypt" },
  { city: "Jakarta", country: "Indonesia" },
  { city: "Kuala Lumpur", country: "Malaysia" },
];

const Index = () => {
  const [selectedCity, setSelectedCity] = useState<string>("London");
  const [selectedCountry, setSelectedCountry] = useState<string>("UK");
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

  const filteredCities = cities.filter(
    (city) =>
      city.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      city.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCitySelect = (value: string) => {
    const [city, country] = value.split("-");
    setSelectedCity(city);
    setSelectedCountry(country);
  };

  return (
    <div className="min-h-screen bg-[#f3f6f4] p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div 
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23015c3b' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="text-center space-y-4 relative">
          <h1 className="text-4xl font-bold text-emerald-900">Islamic Prayer Times</h1>
          <p className="text-emerald-700">Select your city to view prayer times</p>
        </div>

        <div className="w-full max-w-xs mx-auto space-y-2">
          <Input
            type="text"
            placeholder="Search cities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
          
          <Select onValueChange={handleCitySelect} value={`${selectedCity}-${selectedCountry}`}>
            <SelectTrigger className="w-full bg-white">
              <SelectValue placeholder="Select a city" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {filteredCities.map((cityItem) => (
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
              <Card key={prayer} className="bg-white border-emerald-100 hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="bg-emerald-50 rounded-t-lg border-b border-emerald-100">
                  <CardTitle className="text-center text-lg text-emerald-800">{prayer}</CardTitle>
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