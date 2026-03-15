"use client";
import React from "react";
import { useNode } from "@craftjs/core";
import { FreeformWrapper, CommonElementProps } from "./FreeformWrapper";

export interface DividerProps extends CommonElementProps {
    color?: string;
    thickness?: number;
    styleType?: "solid" | "dashed" | "dotted";
}

export const Divider = ({
    color = "#e5e7eb",
    thickness = 1,
    styleType = "solid",
    width = "100%", height = "auto", padding, margin,
    isAbsolute = true, x = 0, y = 0,
    zIndex = 1, opacity = 100, borderRadius = "0px", boxShadow = "none",
    linkUrl, linkTarget, animationType, animationDelay
}: DividerProps) => {
    return (
        <FreeformWrapper
            width={width} height={height} padding={padding} margin={margin}
            isAbsolute={isAbsolute} x={x} y={y}
            zIndex={zIndex} opacity={opacity} borderRadius={borderRadius} boxShadow={boxShadow}
            linkUrl={linkUrl} linkTarget={linkTarget} animationType={animationType} animationDelay={animationDelay}
        >
            <div className="w-full flex items-center justify-center min-h-[10px]">
                <div 
                    style={{ 
                        width: "100%", 
                        borderTopWidth: `${thickness}px`, 
                        borderTopColor: color, 
                        borderTopStyle: styleType 
                    }} 
                />
            </div>
        </FreeformWrapper>
    );
};

export const DividerSettings = () => {
    const { actions: { setProp }, color, thickness, styleType } = useNode((node) => ({
        color: node.data.props.color,
        thickness: node.data.props.thickness,
        styleType: node.data.props.styleType,
    }));

    return (
        <div className="flex flex-col gap-4 p-4">
            <div className="space-y-1.5">
                <label className="text-[11px] font-medium text-muted-foreground">Color</label>
                <input
                    type="color"
                    value={color || "#e5e7eb"}
                    onChange={(e) => setProp((props: any) => props.color = e.target.value)}
                    className="w-full h-8 px-1 py-1 rounded cursor-pointer border-none"
                />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                    <label className="text-[11px] font-medium text-muted-foreground">Thickness (px)</label>
                    <input
                        type="number"
                        min="1" max="20"
                        value={thickness || 1}
                        onChange={(e) => setProp((props: any) => props.thickness = parseInt(e.target.value))}
                        className="w-full h-8 text-[12px] bg-background border rounded px-2"
                    />
                </div>
                <div className="space-y-1.5">
                    <label className="text-[11px] font-medium text-muted-foreground">Style</label>
                    <select
                        value={styleType || "solid"}
                        onChange={(e) => setProp((props: any) => props.styleType = e.target.value)}
                        className="w-full h-8 text-[12px] bg-background border rounded px-2"
                    >
                        <option value="solid">Solid</option>
                        <option value="dashed">Dashed</option>
                        <option value="dotted">Dotted</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

Divider.craft = {
    displayName: "Divider",
    props: {
        color: "#e5e7eb",
        thickness: 1,
        styleType: "solid",
        width: "100%", height: "auto", padding: "0px", margin: "10px 0px",
        isAbsolute: false, x: 0, y: 0,
        zIndex: 1, opacity: 100, borderRadius: "0px", boxShadow: "none"
    },
    related: {
        settings: DividerSettings
    }
};
