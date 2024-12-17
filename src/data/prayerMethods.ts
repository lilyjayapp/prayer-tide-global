export const CITY_METHODS: { [key: string]: { method: number; offsets?: { [key: string]: number } } } = {
  // Middle East - Using Umm Al-Qura for most Gulf cities (matches Google)
  "Dubai": { 
    method: 4,
    offsets: {
      Fajr: 2,
      Dhuhr: -3,
      Asr: -2,
      Maghrib: 3,
      Isha: 2
    }
  },
  "Abu Dhabi": { 
    method: 4,
    offsets: {
      Fajr: 2,
      Dhuhr: -3,
      Asr: -2,
      Maghrib: 3,
      Isha: 2
    }
  },
  "Sharjah": { method: 4 },
  "Mecca": { method: 4 },
  "Medina": { method: 4 },
  "Jeddah": { method: 4 },
  "Riyadh": { method: 4 },
  
  // Turkey - Using Turkish Diyanet (official method)
  "Istanbul": { 
    method: 13,
    offsets: {
      Fajr: 1,
      Isha: -1
    }
  },
  "Ankara": { method: 13 },
  "Izmir": { method: 13 },
  
  // Egypt - Using Egyptian General Authority
  "Cairo": { 
    method: 5,
    offsets: {
      Fajr: 2,
      Isha: -2
    }
  },
  "Alexandria": { method: 5 },
  
  // South Asia - Using Karachi method
  "Karachi": { 
    method: 1,
    offsets: {
      Fajr: 1,
      Maghrib: 2,
      Isha: 2
    }
  },
  "Lahore": { method: 1 },
  "Islamabad": { method: 1 },
  "Dhaka": { method: 1 },
  "Mumbai": { method: 1 },
  "Delhi": { method: 1 },
  "Kolkata": { method: 1 },
  
  // Southeast Asia - Using Singapore method
  "Singapore": { 
    method: 11,
    offsets: {
      Fajr: 2,
      Maghrib: 2
    }
  },
  "Kuala Lumpur": { method: 11 },
  "Jakarta": { method: 11 },
  "Bandung": { method: 11 },
  
  // Iran - Using Institute of Geophysics method
  "Tehran": { method: 7 },
  "Mashhad": { method: 7 },
  
  // Other Middle Eastern cities - Using Muslim World League
  "Baghdad": { method: 3 },
  "Amman": { method: 3 },
  "Damascus": { method: 3 },
  "Beirut": { method: 3 },
  "Kuwait City": { method: 3 },
  "Manama": { method: 3 },
  "Doha": { method: 3 },
  "Muscat": { method: 3 },
  "Sana'a": { method: 3 },
  
  // Additional Turkish cities
  "Bursa": { method: 13 },
  "Antalya": { method: 13 },
  "Mersin": { method: 13 },
  "Adana": { method: 13 },
  
  // Additional Saudi cities
  "Dammam": { method: 4 },
  "Taif": { method: 4 },
  "Buraidah": { method: 4 },
  
  // Additional Egyptian cities
  "Port Said": { method: 5 },
  "Asyut": { method: 5 },
  "Ismailia": { method: 5 },
  "Faiyum": { method: 5 },
  
  // Additional Pakistani cities
  "Rawalpindi": { method: 1 },
  "Faisalabad": { method: 1 },
  "Multan": { method: 1 },
  "Peshawar": { method: 1 },
  
  // Additional Indonesian cities
  "Palembang": { method: 11 },
  "Makassar": { method: 11 },
  "Depok": { method: 11 },
  "Tangerang": { method: 11 },
  
  // Additional Iranian cities
  "Isfahan": { method: 7 },
  "Shiraz": { method: 7 },
  "Tabriz": { method: 7 },
  
  // Default method for all other cities - Using ISNA
  "DEFAULT": { method: 2 }
};
