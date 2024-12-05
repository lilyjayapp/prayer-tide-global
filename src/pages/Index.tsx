import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";

interface PrayerTimes {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

interface TimingsResponse {
  data: {
    timings: PrayerTimes;
  };
}

const Index = () => {
  const [selectedCity, setSelectedCity] = useState("London");
  const [selectedCountry, setSelectedCountry] = useState("UK");

  const { data: prayerData, isLoading } = useQuery({
    queryKey: ["prayerTimes", selectedCity, selectedCountry],
    queryFn: async () => {
      const response = await fetch(
        `https://api.aladhan.com/v1/timingsByCity?city=${selectedCity}&country=${selectedCountry}&method=2`
      );
      const data: TimingsResponse = await response.json();
      return data.data.timings;
    },
  });

  const cities = [
    { city: "London", country: "UK" },
    { city: "Paris", country: "France" },
    { city: "New York", country: "USA" },
    { city: "Dubai", country: "UAE" },
    { city: "Istanbul", country: "Turkey" },
    { city: "Mecca", country: "Saudi Arabia" },
    { city: "Medina", country: "Saudi Arabia" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-slate-900">Islamic Prayer Times</h1>
          <p className="text-slate-600">Select your city to view prayer times</p>
        </div>

        <div className="w-full max-w-xs mx-auto">
          <Select
            value={`${selectedCity}-${selectedCountry}`}
            onValueChange={(value) => {
              const [city, country] = value.split("-");
              setSelectedCity(city);
              setSelectedCountry(country);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a city" />
            </SelectTrigger>
            <SelectContent>
              {cities.map(({ city, country }) => (
                <SelectItem key={`${city}-${country}`} value={`${city}-${country}`}>
                  {city}, {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
          <div className="text-center text-slate-600">Loading prayer times...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {prayerData && Object.entries(prayerData).map(([prayer, time]) => (
              <Card key={prayer} className="bg-white">
                <CardHeader>
                  <CardTitle className="text-center text-lg">{prayer}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-2xl font-semibold">{time}</p>
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