"use client";

import React, { createContext, useState, useContext } from 'react';

const TimeLineContext = createContext();

export const useTimeline = () => {
    return useContext(TimeLineContext);
};

export { TimeLineContext }; 

const TimelineProvider = ({ children }) => {  
    const [timeline, setTimeline] = useState([]);

    const addTimeline = (text,type) => {
        const newItem = {
            id: Date.now(),
            text,
            type,
            time: new Date().toLocaleString()
        };
        setTimeline((prev) => [newItem, ...prev]);
    };

    return (
        <TimeLineContext.Provider value={{ timeline, addTimeline }}>  {/* ← capital P */}
            {children}
        </TimeLineContext.Provider>
    );
};

export { TimelineProvider };

export default TimelineProvider;