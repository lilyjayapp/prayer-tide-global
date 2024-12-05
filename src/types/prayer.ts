export interface PrayerTimes {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

export interface Location {
  city: string;
  country: string;
  lat: number;
  lng: number;
}

export const DEFAULT_PRAYER_TIMES: PrayerTimes = {
  Fajr: "05:00",
  Dhuhr: "12:00",
  Asr: "15:30",
  Maghrib: "18:00",
  Isha: "19:30"
};