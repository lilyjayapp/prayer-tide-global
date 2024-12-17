import { useState, useRef, useEffect } from "react";
import { MapPin } from "lucide-react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Location } from "@/types/prayer";

interface LocationSelectorProps {
  locations: Location[];
  onLocationSelect: (value: string) => void;
  defaultValue: string;
}

export const LocationSelector = ({ locations, onLocationSelect, defaultValue }: LocationSelectorProps) => {
  const [open, setOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(() => {
    const [city, country] = defaultValue.split("-");
    return `${city}, ${country}`;
  });
  const listRef = useRef<HTMLDivElement>(null);

  // Scroll to top whenever the search input changes
  const handleSearchChange = () => {
    if (listRef.current) {
      listRef.current.scrollTop = 0;
    }
  };

  return (
    <div className="w-full max-w-xs mx-auto">
      <button
        onClick={() => setOpen(true)}
        className="w-full flex items-center justify-between rounded-md border border-emerald-200 bg-white/90 px-3 py-2 text-sm hover:border-emerald-300 backdrop-blur-sm"
      >
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-emerald-600" />
          <span>{selectedLocation}</span>
        </div>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command className="rounded-lg border shadow-md">
          <CommandInput placeholder="Search cities..." onValueChange={handleSearchChange} />
          <CommandList ref={listRef}>
            <CommandEmpty>No city found.</CommandEmpty>
            <CommandGroup>
              {locations.map((location) => (
                <CommandItem
                  key={`${location.city}-${location.country}`}
                  value={`${location.city}, ${location.country}`}
                  onSelect={(value) => {
                    const [city, country] = value.split(", ");
                    setSelectedLocation(value);
                    onLocationSelect(`${city}-${country}`);
                    setOpen(false);
                  }}
                >
                  <MapPin className="mr-2 h-4 w-4 text-emerald-600" />
                  {location.city}, {location.country}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  );
};