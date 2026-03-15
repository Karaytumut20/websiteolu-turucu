"use client";
import React from "react";
import { useNode } from "@craftjs/core";
import { FreeformWrapper, CommonElementProps } from "./FreeformWrapper";
import * as LucideIcons from "lucide-react";

export interface IconProps extends CommonElementProps {
    iconName?: string;
    iconSize?: number;
    iconColor?: string;
    padding?: string;
    margin?: string;
    isAbsolute?: boolean;
}

export const Icon = ({
    iconName = "Star",
    iconSize = 24,
    iconColor = "#000000",
    width = "auto", height = "auto", padding, margin,
    isAbsolute = true, x = 0, y = 0,
    zIndex = 1, opacity = 100, borderRadius = "0px", boxShadow = "none"
}: IconProps) => {

    const LucideIcon = (LucideIcons as any)[iconName] || LucideIcons.HelpCircle;

    return (
        <FreeformWrapper
            width={width} height={height} padding={padding} margin={margin}
            isAbsolute={isAbsolute} x={x} y={y}
            zIndex={zIndex} opacity={opacity} borderRadius={borderRadius} boxShadow={boxShadow}
        >
            <div className="flex items-center justify-center w-full h-full">
                <LucideIcon size={iconSize} color={iconColor} strokeWidth={2} />
            </div>
        </FreeformWrapper>
    );
};

export const IconSettings = () => {
    const { actions: { setProp }, iconName, iconSize, iconColor } = useNode((node) => ({
        iconName: node.data.props.iconName,
        iconSize: node.data.props.iconSize,
        iconColor: node.data.props.iconColor,
    }));

    return (
        <div className="flex flex-col gap-4 p-4">
            <div className="space-y-1.5">
                <label className="text-[11px] font-medium text-muted-foreground block">Icon Name (Lucide)</label>
                <input
                    type="text"
                    value={iconName || "Star"}
                    onChange={(e) => setProp((props: any) => props.iconName = e.target.value)}
                    className="w-full h-8 px-2 border rounded bg-background text-[12px] font-mono"
                    placeholder="e.g. Heart, Play, User"
                />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                    <label className="text-[11px] font-medium text-muted-foreground">Size (px)</label>
                    <input
                        type="number"
                        value={iconSize || 24}
                        onChange={(e) => setProp((props: any) => props.iconSize = parseInt(e.target.value))}
                        className="w-full h-8 text-[12px] bg-background border rounded px-2"
                    />
                </div>
                <div className="space-y-1.5">
                    <label className="text-[11px] font-medium text-muted-foreground">Color</label>
                    <input
                        type="color"
                        value={iconColor || "#000000"}
                        onChange={(e) => setProp((props: any) => props.iconColor = e.target.value)}
                        className="w-full h-8 px-1 py-1 rounded cursor-pointer border-none"
                    />
                </div>
            </div>
        </div>
    );
};

Icon.craft = {
    displayName: "Icon",
    props: {
        iconName: "Star",
        iconSize: 24,
        iconColor: "#4f46e5",
        width: "auto", height: "auto", padding: "0px", margin: "0px",
        isAbsolute: false, x: 0, y: 0,
        zIndex: 1, opacity: 100, borderRadius: "0px", boxShadow: "none"
    },
    related: {
        settings: IconSettings
    }
};
