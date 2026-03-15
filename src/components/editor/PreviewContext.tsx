"use client";
import React, { createContext, useContext, useState } from 'react';

interface PreviewContextType {
    isPreview: boolean;
    setIsPreview: (val: boolean) => void;
}

const PreviewContext = createContext<PreviewContextType | undefined>(undefined);

export const PreviewProvider = ({ children }: { children: React.ReactNode }) => {
    const [isPreview, setIsPreview] = useState(false);

    return (
        <PreviewContext.Provider value={{ isPreview, setIsPreview }}>
            {children}
        </PreviewContext.Provider>
    );
};

export const usePreview = () => {
    const context = useContext(PreviewContext);
    if (!context) {
        // Fallback for when components are rendered in DynamicRenderer (published site)
        return { isPreview: true, setIsPreview: () => {} };
    }
    return context;
};
