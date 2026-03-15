"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface ThemeSettings {
    primaryColor: string;
    secondaryColor: string;
    backgroundColor: string;
    textColor: string;
    borderRadius: string;
    fontFamily: string;
}

const defaultTheme: ThemeSettings = {
    primaryColor: '#4f46e5', // Indigo-600
    secondaryColor: '#f43f5e', // Rose-500
    backgroundColor: '#ffffff',
    textColor: '#1e293b', // Slate-800
    borderRadius: '8px',
    fontFamily: 'Inter, sans-serif'
};

export const ThemeContext = createContext<{
    theme: ThemeSettings;
    setTheme: (theme: Partial<ThemeSettings>) => void;
}>({
    theme: defaultTheme,
    setTheme: () => { }
});

export const ThemeProvider = ({ children, initialTheme }: { children: React.ReactNode, initialTheme?: Partial<ThemeSettings> }) => {
    const [theme, setThemeState] = useState<ThemeSettings>({ ...defaultTheme, ...initialTheme });

    const setTheme = (newTheme: Partial<ThemeSettings>) => {
        setThemeState((prev) => ({ ...prev, ...newTheme }));
    };

    useEffect(() => {
        // Inject Custom CSS Variables to the document root
        const root = document.documentElement;
        root.style.setProperty('--builder-primary', theme.primaryColor);
        root.style.setProperty('--builder-secondary', theme.secondaryColor);
        root.style.setProperty('--builder-bg', theme.backgroundColor);
        root.style.setProperty('--builder-text', theme.textColor);
        root.style.setProperty('--builder-radius', theme.borderRadius);
        root.style.setProperty('--builder-font', theme.fontFamily);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
