import { useState } from "react";
import { Clock, Landmark } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LocationSelector } from "@/components/LocationSelector";
import { cities } from "@/data/cities";
import { usePrayerTimes } from "@/hooks/usePrayerTimes";

const DEFAULT_PRAYER_TIMES = {
  Fajr: "05:30",
  Dhuhr: "12:30",
  Asr: "15:45",
  Maghrib: "18:15",
  Isha: "19:45"
};

const Index = () => {
  const [selectedLocation, setSelectedLocation] = useState("London-UK");
  const { data: prayerTimes = DEFAULT_PRAYER_TIMES, isLoading } = usePrayerTimes(selectedLocation);

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