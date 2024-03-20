import { type ClassValue, clsx } from "clsx";

function getValidClassNames(...inputs: ClassValue[]): string {
  return clsx(...inputs);
}

export { getValidClassNames };
