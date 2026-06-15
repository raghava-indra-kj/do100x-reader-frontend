import { createContext, useContext } from "react";
import type { MdViewColors } from "../types/theme";

export const MdViewColorContext = createContext<MdViewColors | null>(null);

export function useMdViewColors(): MdViewColors | null {
  return useContext(MdViewColorContext);
}
