import { useState } from "react";
import { toast } from "sonner";

interface GeolocationResult {
  city: string;
  country: string;
}

export const useGeolocation = () => {
  const [isLoading, setIsLoading] = useState(false);

  const getLocation = async (): Promise<GeolocationResult | null> => {
    setIsLoading(true);
    
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const { latitude, longitude } = position.coords;
      
      // Using OpenStreetMap's Nominatim service for reverse geocoding
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      
      const data = await response.json();
      
      setIsLoading(false);
      
      return {
        city: data.address.city || data.address.town || data.address.village || "Unknown",
        country: data.address.country || "Unknown"
      };
    } catch (error) {
      setIsLoading(false);
      toast.error("Unable to detect location", {
        description: "Please select your location manually"
      });
      return null;
    }
  };

  return { getLocation, isLoading };
};