import { MapPin } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Location } from "@/types/prayer";

interface LocationSelectorProps {
  locations: Location[];
  onLocationSelect: (value: string) => void;
  defaultValue: string;
}

export const LocationSelector = ({ locations, onLocationSelect, defaultValue }: LocationSelectorProps) => (
  <div className="w-full max-w-xs mx-auto">
    <Select onValueChange={onLocationSelect} defaultValue={defaultValue}>
      <SelectTrigger className="w-full bg-white/90 backdrop-blur-sm border-emerald-200 hover:border-emerald-300">
        <SelectValue placeholder="Select a city" />
      </SelectTrigger>
      <SelectContent>
        {locations.map((location) => (
          <SelectItem 
            key={`${location.city}-${location.country}`}
            value={`${location.city}-${location.country}`}
          >
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2 text-emerald-600" />
              {location.city}, {location.country}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);