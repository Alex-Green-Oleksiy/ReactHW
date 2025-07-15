import React, { createContext, useContext, useReducer } from "react";

const TravelContext = createContext();

// Початковий стан для useReducer
const initialState = {
    selectedBuses: [],
    selectedHotels: []
};

// Редуктор для керування вибором
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
    // Використовуємо useReducer замість useState
    const [state, dispatch] = useReducer(travelReducer, initialState);

    // Функції-диспатчери для зручності
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

export const useTravel = () => useContext(TravelContext);
