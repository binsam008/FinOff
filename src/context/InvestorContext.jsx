import { createContext, useContext, useState } from "react";

const InvestorContext = createContext();

export const InvestorProvider = ({ children }) => {
  const [investorMode, setInvestorMode] = useState(false);
  return (
    <InvestorContext.Provider value={{ investorMode, setInvestorMode }}>
      {children}
    </InvestorContext.Provider>
  );
};

export const useInvestor = () => useContext(InvestorContext);
