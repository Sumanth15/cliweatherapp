import React, { createContext, useContext, useReducer } from "react";

const defaultState = {
  units: "metric",
  categories: {
    business: true,
    entertainment: false,
    general: true,
    health: false,
    science: false,
    sports: false,
    technology: true,
  },
};

// Reducer to handle state changes
function reducer(state, action) {
  switch (action.type) {
    case "SET_UNITS":
      return { ...state, units: action.payload };
    case "TOGGLE_CATEGORY":
      return {
        ...state,
        categories: {
          ...state.categories,
          [action.payload]: !state.categories[action.payload],
        },
      };
    default:
      return state;
  }
}

/**
 * @typedef {{ type: string, payload?: any }} Action
 * @typedef {{ state: typeof defaultState, dispatch: (action: Action) => void }} SettingsContextType
 */

/** @type {import('react').Context<SettingsContextType>} */
const SettingsContext = createContext({
  state: defaultState,
  dispatch: () => {}, // TS now knows this function can take an argument
});

export const SettingsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);
  return (
    <SettingsContext.Provider value={{ state, dispatch }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);

