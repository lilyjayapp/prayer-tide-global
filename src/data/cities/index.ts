import { Location } from "@/types/prayer";
import { africanCities } from "./africa";
import { asianCities } from "./asia";
import { europeanCities } from "./europe";
import { northAmericanCities } from "./northAmerica";
import { southAmericanCities } from "./southAmerica";
import { oceanianCities } from "./oceania";

export const cities: Location[] = [
  ...africanCities,
  ...asianCities,
  ...europeanCities,
  ...northAmericanCities,
  ...southAmericanCities,
  ...oceanianCities
];