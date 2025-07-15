import React, { useReducer } from "react";
import { TravelContext } from "../context/TravelContext.js";

// Початковий стан для useReducer
const initialState = {
    selectedBuses: [],
    selectedHotels: []
};

// для керування вибором
function travelReducer(state, action) {
    switch (action.type) {
        case "TOGGLE_BUS":
            return {
                ...state,
                selectedBuses: state.selectedBuses.includes(action.id)
                    ? state.selectedBuses.filter((id) => id !== action.id)
                    : [...state.selectedBuses, action.id]
            };
        case "TOGGLE_HOTEL":
            return {
                ...state,
                selectedHotels: state.selectedHotels.includes(action.id)
                    ? state.selectedHotels.filter((id) => id !== action.id)
                    : [...state.selectedHotels, action.id]
            };
        case "REMOVE_BUS":
            return {
                ...state,
                selectedBuses: state.selectedBuses.filter(
                    (id) => id !== action.id
                )
            };
        case "REMOVE_HOTEL":
            return {
                ...state,
                selectedHotels: state.selectedHotels.filter(
                    (id) => id !== action.id
                )
            };
        default:
            return state;
    }
}

export const TravelProvider = ({ children }) => {
    //useReducer
    const [state, dispatch] = useReducer(travelReducer, initialState);

    // Функції-диспатчери
    const toggleBus = (busId) => dispatch({ type: "TOGGLE_BUS", id: busId });
    const toggleHotel = (hotelId) =>
        dispatch({ type: "TOGGLE_HOTEL", id: hotelId });
    const removeBus = (busId) => dispatch({ type: "REMOVE_BUS", id: busId });
    const removeHotel = (hotelId) =>
        dispatch({ type: "REMOVE_HOTEL", id: hotelId });

    return (
        <TravelContext.Provider
            value={{
                selectedBuses: state.selectedBuses,
                selectedHotels: state.selectedHotels,
                toggleBus,
                toggleHotel,
                removeBus,
                removeHotel
            }}
        >
            {children}
        </TravelContext.Provider>
    );
};
