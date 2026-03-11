"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

type DeviceTypes = "desktop" | "mobile";

interface DeviceContextType {
    device: DeviceTypes;
    setDevice: (device: DeviceTypes) => void;
}

const DeviceContext = createContext<DeviceContextType | undefined>(undefined);

export const DeviceProvider = ({ children }: { children: ReactNode }) => {
    const [device, setDevice] = useState<DeviceTypes>("desktop");

    return (
        <DeviceContext.Provider value={{ device, setDevice }}>
            {children}
        </DeviceContext.Provider>
    );
};

export const useDevice = () => {
    const context = useContext(DeviceContext);
    if (!context) {
        throw new Error("useDevice must be used within a DeviceProvider");
    }
    return context;
};
