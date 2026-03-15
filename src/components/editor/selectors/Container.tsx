"use client";
import React from "react";
import { useNode } from "@craftjs/core";
import { CommonElementProps, FreeformWrapper } from "./FreeformWrapper";

export interface ContainerProps extends CommonElementProps {
    background?: string;
    // Flex Layout properties for children
    flexDirection?: "row" | "column";
    alignItems?: "flex-start" | "center" | "flex-end" | "stretch";
    justifyContent?: "flex-start" | "center" | "flex-end" | "space-between" | "space-around";
    gap?: string;
    // Canvas switch
    isCanvasContext?: boolean;
    children?: React.ReactNode;
}

export const Container = ({
    background = "#ffffff",
    padding = "20px",
    margin = "0px",
    flexDirection = "column",
    alignItems = "flex-start",
    justifyContent = "flex-start",
    gap = "0px",
    width = "100%",
    height = "auto",
    isAbsolute = true,
    isCanvasContext = false,
    x = 0, y = 0, zIndex = 1, opacity = 100, borderRadius = "0px", boxShadow = "none",
    children,
}: ContainerProps) => {
    return (
        <FreeformWrapper
            width={width} height={height} padding={padding} margin={margin}
            isAbsolute={isAbsolute} x={x} y={y}
            zIndex={zIndex} opacity={opacity} borderRadius={borderRadius} boxShadow={boxShadow}
        >
            <div
                style={{ 
                    background,
                    display: isCanvasContext ? "block" : "flex",
                    flexDirection: isCanvasContext ? undefined : flexDirection,
                    alignItems: isCanvasContext ? undefined : alignItems,
                    justifyContent: isCanvasContext ? undefined : justifyContent,
                    gap: isCanvasContext ? undefined : gap,
                    minHeight: "50px", // A base so empty containers don't collapse fully
                    position: "relative" // Ensure nested absolute items stay in bounds
                }}
                className="w-full h-full"
            >
                {children}
            </div>
        </FreeformWrapper>
    );
};

export const ContainerSettings = () => {
    // Settings logic moved to main SettingsPanel for global handling, but we leave the blank component for Craft to bind.
    return null;
};

Container.craft = {
    displayName: "Container",
    props: {
        background: "#ffffff",
        padding: "20px",
        margin: "0px",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        gap: "0px",
        width: "100%", height: "auto",
        isAbsolute: false, x: 0, y: 0,
        zIndex: 1, opacity: 100, borderRadius: "0px", boxShadow: "none"
    },
    related: {
        settings: ContainerSettings,
    },
    rules: {
        canDrag: () => true,
        canMoveIn: () => true, // Ensure we can drop things inside
    },
};
