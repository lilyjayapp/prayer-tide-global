import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Clock, Landmark } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const cities = [
  { name: "London", country: "UK" },
  { name: "New York", country: "USA" },
  { name: "Tokyo", country: "Japan" },
  { name: "Istanbul", country: "Turkey" },
  { name: "Dubai", country: "UAE" },
  { name: "Singapore", country: "Singapore" },
  { name: "Kuala Lumpur", country: "Malaysia" },
  { name: "Jakarta", country: "Indonesia" },
  { name: "Paris", country: "France" },
  { name: "Berlin", country: "Germany" },
  { name: "Rome", country: "Italy" },
  { name: "Madrid", country: "Spain" },
  { name: "Moscow", country: "Russia" },
  { name: "Cairo", country: "Egypt" },
  { name: "Mumbai", country: "India" },
  { name: "Beijing", country: "China" },
  { name: "Seoul", country: "South Korea" },
  { name: "Sydney", country: "Australia" },
  { name: "Toronto", country: "Canada" },
  { name: "Mexico City", country: "Mexico" },
  { name: "São Paulo", country: "Brazil" },
  { name: "Buenos Aires", country: "Argentina" },
  { name: "Cape Town", country: "South Africa" },
  { name: "Lagos", country: "Nigeria" },
  { name: "Riyadh", country: "Saudi Arabia" },
  { name: "Tehran", country: "Iran" },
  { name: "Bangkok", country: "Thailand" },
  { name: "Hong Kong", country: "China" },
  { name: "Amsterdam", country: "Netherlands" },
  { name: "Vienna", country: "Austria" },
  { name: "Stockholm", country: "Sweden" },
  { name: "Oslo", country: "Norway" },
  { name: "Copenhagen", country: "Denmark" },
  { name: "Warsaw", country: "Poland" },
  { name: "Prague", country: "Czech Republic" },
  { name: "Athens", country: "Greece" },
  { name: "Budapest", country: "Hungary" },
  { name: "Lisbon", country: "Portugal" },
  { name: "Dublin", country: "Ireland" },
  { name: "Brussels", country: "Belgium" },
  { name: "Helsinki", country: "Finland" },
  { name: "Bucharest", country: "Romania" },
  { name: "Sofia", country: "Bulgaria" },
  { name: "Belgrade", country: "Serbia" },
  { name: "Zagreb", country: "Croatia" },
  { name: "Bratislava", country: "Slovakia" },
  { name: "Ljubljana", country: "Slovenia" },
  { name: "Riga", country: "Latvia" },
  { name: "Tallinn", country: "Estonia" },
  { name: "Vilnius", country: "Lithuania" },
  { name: "Reykjavik", country: "Iceland" },
  { name: "Malta", country: "Malta" },
  { name: "Luxembourg", country: "Luxembourg" },
  { name: "Andorra", country: "Andorra" },
  { name: "Monaco", country: "Monaco" },
  { name: "Vatican City", country: "Vatican City" },
  { name: "San Marino", country: "San Marino" },
  { name: "Chisinau", country: "Moldova" },
  { name: "Tirana", country: "Albania" },
  { name: "Skopje", country: "North Macedonia" },
  { name: "Sarajevo", country: "Bosnia and Herzegovina" },
  { name: "Podgorica", country: "Montenegro" },
  { name: "Tbilisi", country: "Georgia" },
  { name: "Yerevan", country: "Armenia" },
  { name: "Baku", country: "Azerbaijan" },
  { name: "Ashgabat", country: "Turkmenistan" },
  { name: "Tashkent", country: "Uzbekistan" },
  { name: "Bishkek", country: "Kyrgyzstan" },
  { name: "Dushanbe", country: "Tajikistan" },
  { name: "Nur-Sultan", country: "Kazakhstan" },
  { name: "Ulaanbaatar", country: "Mongolia" },
  { name: "Pyongyang", country: "North Korea" },
  { name: "Hanoi", country: "Vietnam" },
  { name: "Vientiane", country: "Laos" },
  { name: "Phnom Penh", country: "Cambodia" },
  { name: "Yangon", country: "Myanmar" },
  { name: "Dhaka", country: "Bangladesh" },
  { name: "Colombo", country: "Sri Lanka" },
  { name: "Kathmandu", country: "Nepal" },
  { name: "Thimphu", country: "Bhutan" },
  { name: "Male", country: "Maldives" },
  { name: "Kabul", country: "Afghanistan" },
  { name: "Baghdad", country: "Iraq" },
  { name: "Damascus", country: "Syria" },
  { name: "Beirut", country: "Lebanon" },
  { name: "Amman", country: "Jordan" },
  { name: "Jerusalem", country: "Israel" },
  { name: "Kuwait City", country: "Kuwait" },
  { name: "Manama", country: "Bahrain" },
  { name: "Doha", country: "Qatar" },
  { name: "Muscat", country: "Oman" },
  { name: "Sanaa", country: "Yemen" },
  { name: "Khartoum", country: "Sudan" },
  { name: "Addis Ababa", country: "Ethiopia" },
  { name: "Nairobi", country: "Kenya" },
  { name: "Kampala", country: "Uganda" },
  { name: "Dar es Salaam", country: "Tanzania" },
  { name: "Lusaka", country: "Zambia" },
  { name: "Harare", country: "Zimbabwe" },
  { name: "Maputo", country: "Mozambique" },
  { name: "Windhoek", country: "Namibia" },
  { name: "Gaborone", country: "Botswana" },
  { name: "Pretoria", country: "South Africa" },
  { name: "Maseru", country: "Lesotho" },
  { name: "Mbabane", country: "Eswatini" },
  { name: "Antananarivo", country: "Madagascar" },
  { name: "Port Louis", country: "Mauritius" }
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
        console.log(`Fetching prayer times for ${city}, ${country}`);
        const response = await fetch(
          `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=2`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch prayer times');
        }
        
        const data = await response.json();
        console.log("Prayer times response:", data);
        const { Fajr, Dhuhr, Asr, Maghrib, Isha } = data.data.timings;
        return { Fajr, Dhuhr, Asr, Maghrib, Isha };
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

        <div className="w-full max-w-xs mx-auto">
          <Select 
            onValueChange={setSelectedLocation} 
            value={selectedLocation}
          >
            <SelectTrigger className="w-full bg-white/90 backdrop-blur-sm border-emerald-200 hover:border-emerald-300">
              <SelectValue placeholder="Select a city" />
            </SelectTrigger>
            <SelectContent className="max-h-[300px] overflow-y-auto">
              {cities.map((city) => (
                <SelectItem 
                  key={`${city.name}-${city.country}`}
                  value={`${city.name}-${city.country}`}
                >
                  <div className="flex items-center">
                    <Landmark className="w-4 h-4 mr-2 text-emerald-600" />
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
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;