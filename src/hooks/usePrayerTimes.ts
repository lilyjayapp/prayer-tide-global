import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { CITY_METHODS } from "@/data/prayerMethods";
import { PrayerTimes } from "@/types/prayer";

const DEFAULT_PRAYER_TIMES: PrayerTimes = {
  Fajr: "05:30",
  Dhuhr: "12:30",
  Asr: "15:45",
  Maghrib: "18:15",
  Isha: "19:45"
};

export const usePrayerTimes = (selectedLocation: string) => {
  return useQuery({
    queryKey: ["prayerTimes", selectedLocation],
    queryFn: async () => {
      const [city, country] = selectedLocation.split("-");
      try {
        console.log(`Fetching prayer times for ${city}, ${country}`);
        
        const cityConfig = CITY_METHODS[city] || CITY_METHODS["DEFAULT"];
        console.log(`Using calculation method ${cityConfig.method} for ${city}`);
        
        const response = await fetch(
          `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=${cityConfig.method}`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch prayer times');
        }
        
        const data = await response.json();
        console.log("Prayer times response:", data);
        const { Fajr, Dhuhr, Asr, Maghrib, Isha } = data.data.timings;

        // Apply offsets if they exist for the city
        const offsets = cityConfig.offsets || {};
        const adjustTime = (time: string, offset: number = 0) => {
          if (offset === 0) return time;
          const [hours, minutes] = time.split(':').map(Number);
          const totalMinutes = hours * 60 + minutes + offset;
          const newHours = Math.floor(totalMinutes / 60) % 24;
          const newMinutes = totalMinutes % 60;
          return `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}`;
        };

        return {
          Fajr: adjustTime(Fajr, offsets.Fajr),
          Dhuhr: adjustTime(Dhuhr, offsets.Dhuhr),
          Asr: adjustTime(Asr, offsets.Asr),
          Maghrib: adjustTime(Maghrib, offsets.Maghrib),
          Isha: adjustTime(Isha, offsets.Isha)
        };
      } catch (error) {
        console.error("Prayer times fetch error:", error);
        toast.error("Unable to fetch prayer times", {
          description: "Using default times instead"
        });
        return DEFAULT_PRAYER_TIMES;
      }
    },
  });
};