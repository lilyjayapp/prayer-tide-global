import { Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PrayerTimes } from "@/types/prayer";

interface PrayerTimeCardsProps {
  prayerTimes: PrayerTimes;
}

export const PrayerTimeCards = ({ prayerTimes }: PrayerTimeCardsProps) => (
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
          <p className="text-center text-2xl font-semibold text-emerald-950">{time}</p>
        </CardContent>
      </Card>
    ))}
    
    <div className="absolute bottom-0 right-0 p-4 text-sm text-white/70 font-dancing-script opacity-80">
      One pray at a time
    </div>
  </div>
);