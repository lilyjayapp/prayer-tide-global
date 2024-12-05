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
      // Check if geolocation is supported
      if (!navigator.geolocation) {
        console.log("Geolocation is not supported by this browser");
        toast.error("Geolocation not supported", {
          description: "Your browser doesn't support location detection"
        });
        return null;
      }

      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        console.log("Requesting user location...");
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            console.log("Location obtained:", pos.coords);
            resolve(pos);
          },
          (error) => {
            console.log("Geolocation error:", error.message);
            reject(error);
          }
        );
      });

      const { latitude, longitude } = position.coords;
      console.log(`Fetching city data for coordinates: ${latitude}, ${longitude}`);
      
      // Using OpenStreetMap's Nominatim service for reverse geocoding
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=en`
      );
      
      const data = await response.json();
      console.log("Reverse geocoding response:", data);
      
      setIsLoading(false);
      
      return {
        city: data.address.city || data.address.town || data.address.village || "Unknown",
        country: data.address.country || "Unknown"
      };
    } catch (error) {
      console.error("Location detection error:", error);
      setIsLoading(false);
      toast.error("Unable to detect location", {
        description: "Please select your location manually"
      });
      return null;
    }
  };

  return { getLocation, isLoading };
};