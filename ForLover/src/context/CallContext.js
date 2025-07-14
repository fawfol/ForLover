// src/context/CallContext.js
import React, { createContext, useContext, useState } from 'react';

const CallContext = createContext();

export const CallProvider = ({children}) => {
  const [callType, setCallType] = useState(null); // 'voice' | 'video' | null
  const [joined, setJoined] = useState(false);

  return (
    <CallContext.Provider value={{ callType, setCallType, joined, setJoined }}>
      {children}
    </CallContext.Provider>
  );
};

export const useCall = () => useContext(CallContext);
