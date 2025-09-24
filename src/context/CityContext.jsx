import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CityContext = createContext({ city: null, setCity: () => {} });

export const CityProvider = ({ children }) => {
  const [city, setCityState] = useState(() => {
    try {
      return localStorage.getItem('city') || 'Delhi';
    } catch {
      return null;
    }
  });

  const setCity = (c) => {
    setCityState(c);
    try { localStorage.setItem('city', c); } catch {}
  };

  // keep state in sync if another tab changes it
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'city') setCityState(e.newValue || null);
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  const value = useMemo(() => ({ city, setCity }), [city]);

  return <CityContext.Provider value={value}>{children}</CityContext.Provider>;
};

export const useCity = () => useContext(CityContext);
