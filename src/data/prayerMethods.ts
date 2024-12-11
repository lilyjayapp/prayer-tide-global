export const CITY_METHODS: { [key: string]: number } = {
  // Middle East - Using Umm Al-Qura for most Gulf cities (matches Google)
  "Dubai": 4,        // Umm Al-Qura
  "Abu Dhabi": 4,    // Umm Al-Qura
  "Sharjah": 4,      // Umm Al-Qura
  "Mecca": 4,        // Umm Al-Qura
  "Medina": 4,       // Umm Al-Qura
  "Jeddah": 4,       // Umm Al-Qura
  "Riyadh": 4,       // Umm Al-Qura
  
  // Turkey - Using Turkish Diyanet (official method)
  "Istanbul": 13,    // Turkish Diyanet
  "Ankara": 13,      // Turkish Diyanet
  "Izmir": 13,       // Turkish Diyanet
  
  // Egypt - Using Egyptian General Authority
  "Cairo": 5,        // Egyptian General Authority
  "Alexandria": 5,   // Egyptian General Authority
  
  // South Asia - Using Karachi method
  "Karachi": 1,      // University of Islamic Sciences, Karachi
  "Lahore": 1,      // University of Islamic Sciences, Karachi
  "Islamabad": 1,    // University of Islamic Sciences, Karachi
  "Dhaka": 1,        // University of Islamic Sciences, Karachi
  "Mumbai": 1,       // University of Islamic Sciences, Karachi
  "Delhi": 1,        // University of Islamic Sciences, Karachi
  "Kolkata": 1,      // University of Islamic Sciences, Karachi
  
  // Southeast Asia - Using Singapore method
  "Singapore": 11,   // Singapore MUIS
  "Kuala Lumpur": 11, // Similar to Singapore
  "Jakarta": 11,     // Similar to Singapore
  "Bandung": 11,     // Similar to Singapore
  
  // Iran - Using Institute of Geophysics method
  "Tehran": 7,       // Institute of Geophysics, University of Tehran
  "Mashhad": 7,      // Institute of Geophysics, University of Tehran
  
  // Other Middle Eastern cities - Using Muslim World League
  "Baghdad": 3,      // Muslim World League
  "Amman": 3,        // Muslim World League
  "Damascus": 3,     // Muslim World League
  "Beirut": 3,       // Muslim World League
  "Kuwait City": 3,  // Muslim World League
  "Manama": 3,       // Muslim World League
  "Doha": 3,         // Muslim World League
  "Muscat": 3,       // Muslim World League
  "Sana'a": 3,       // Muslim World League
  
  // Default method for all other cities - Using ISNA
  "DEFAULT": 2       // ISNA (North America and unlisted cities)
};
