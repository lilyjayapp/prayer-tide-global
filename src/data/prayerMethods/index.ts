import { middleEastMethods } from './middleEast';
import { asiaMethods } from './asia';
import { europeMethods } from './europe';
import { africaMethods } from './africa';
import { americasMethods } from './americas';

export const CITY_METHODS = {
  ...middleEastMethods,
  ...asiaMethods,
  ...europeMethods,
  ...africaMethods,
  ...americasMethods,
  "DEFAULT": { method: 2 },
};