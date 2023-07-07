import { useState, useContext, createContext } from "react";
const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [Auth, setAuth] = useState({
    keyword: "",
    results: [],
  });

  return (
    <SearchContext.Provider value={[Auth, setAuth]}>
      {children}
    </SearchContext.Provider>
  );
};
// custom hook
const useSearch = () => useContext(SearchContext);
export { useSearch, SearchProvider };
