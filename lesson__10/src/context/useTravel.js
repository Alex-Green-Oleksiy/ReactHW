import { useContext } from "react";
import { TravelContext } from "./TravelContext.js";

export const useTravel = () => useContext(TravelContext);
