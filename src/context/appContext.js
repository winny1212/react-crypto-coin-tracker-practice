import React, { useContext, useReducer } from 'react';

//create a context
const AppContext = React.createContext();

//initial state
const initialState = {
  search: '',
};

//reducer function
const reducer = (state, action) => {
  if (action.type === 'HANDLE_SEARCH') {
    return {
      ...state,
      search: action.payload,
    };
  }
};

//context wrapper function used for manage the state
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSearch = (value) => {
    dispatch({ type: 'HANDLE_SEARCH', payload: value });
  };

  return (
    <AppContext.Provider value={{ ...state, handleSearch }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useAppContext };
