"use client";
import React from "react";
import { useNode } from "@craftjs/core";
import ContentEditable from "react-contenteditable";
import { FreeformWrapper, CommonElementProps } from "./FreeformWrapper";

export interface TextProps extends CommonElementProps {
    text?: string;
    fontSize?: number;
    textAlign?: string;
    fontWeight?: string;
    letterSpacing?: string;
    textTransform?: string;
    color?: string;
    href?: string;
    padding?: string;
    margin?: string;
    isAbsolute?: boolean;
}

export const Text = ({
    text = "Text Element", fontSize = 16, textAlign = "left", 
    fontWeight = "400", letterSpacing = "0px", textTransform = "none", color = "var(--builder-text)",
    href,
    width = "auto", height = "auto", padding, margin,
    isAbsolute = true, x = 0, y = 0,
    zIndex = 1, opacity = 100, borderRadius = "0px", boxShadow = "none"
}: TextProps) => {
    const { hasSelectedNode, actions: { setProp } } = useNode((node) => ({
        hasSelectedNode: node.events.selected,
    }));

    return (
        <FreeformWrapper
            width={width} height={height} padding={padding} margin={margin}
            isAbsolute={isAbsolute} x={x} y={y}
            zIndex={zIndex} opacity={opacity} borderRadius={borderRadius} boxShadow={boxShadow}
        >
            <div className="w-full h-full text-base">
                <ContentEditable
                    html={text || ""}
                    disabled={!hasSelectedNode}
                    onChange={(e: any) =>
                        setProp((props: any) => (props.text = e.target.value))
                    }
                    tagName="p"
                    style={{ 
                        fontSize: `${fontSize}px`, 
                        textAlign: textAlign as any,
                        fontWeight,
                        letterSpacing,
                        textTransform: textTransform as any,
                        color,
                        margin: 0 
                    }}
                    className="w-full h-full outline-none content-editable-block"
                />
            </div>
        </FreeformWrapper>
    );
};

export const TextSettings = () => {
    const { actions: { setProp }, fontSize, textAlign, fontWeight, letterSpacing, textTransform, color } = useNode((node) => ({
        fontSize: node.data.props.fontSize,
        textAlign: node.data.props.textAlign,
        fontWeight: node.data.props.fontWeight,
        letterSpacing: node.data.props.letterSpacing,
        textTransform: node.data.props.textTransform,
        color: node.data.props.color,
    }));

    return (
        <div className="flex flex-col gap-4 p-4">
            <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                    <label className="text-[11px] font-medium text-muted-foreground">Font Size (px)</label>
                    <input
                        type="number"
                        value={fontSize || 16}
                        onChange={(e) => setProp((props: any) => props.fontSize = parseInt(e.target.value))}
                        className="w-full h-8 text-[12px] bg-background border rounded px-2"
                    />
                </div>
                <div className="space-y-1.5">
                    <label className="text-[11px] font-medium text-muted-foreground">Text Align</label>
                    <select
                        value={textAlign || "left"}
                        onChange={(e) => setProp((props: any) => props.textAlign = e.target.value)}
                        className="w-full h-8 text-[12px] bg-background border rounded px-2"
                    >
                        <option value="left">Left</option>
                        <option value="center">Center</option>
                        <option value="right">Right</option>
                        <option value="justify">Justify</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                    <label className="text-[11px] font-medium text-muted-foreground">Font Weight</label>
                    <select
                        value={fontWeight || "400"}
                        onChange={(e) => setProp((props: any) => props.fontWeight = e.target.value)}
                        className="w-full h-8 text-[12px] bg-background border rounded px-2"
                    >
                        <option value="300">Light (300)</option>
                        <option value="400">Regular (400)</option>
                        <option value="500">Medium (500)</option>
                        <option value="600">Semibold (600)</option>
                        <option value="700">Bold (700)</option>
                        <option value="900">Black (900)</option>
                    </select>
                </div>
                <div className="space-y-1.5">
                    <label className="text-[11px] font-medium text-muted-foreground">Transform</label>
                    <select
                        value={textTransform || "none"}
                        onChange={(e) => setProp((props: any) => props.textTransform = e.target.value)}
                        className="w-full h-8 text-[12px] bg-background border rounded px-2"
                    >
                        <option value="none">None</option>
                        <option value="uppercase">Uppercase</option>
                        <option value="lowercase">Lowercase</option>
                        <option value="capitalize">Capitalize</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                    <label className="text-[11px] font-medium text-muted-foreground">Text Color</label>
                    <div className="flex items-center gap-2 mt-1">
                        <input
                            type="color"
                            value={color || "#334155"}
                            onChange={(e) => setProp((props: any) => props.color = e.target.value)}
                            className="w-8 h-8 p-0 border-0 rounded cursor-pointer"
                        />
                        <input 
                            type="text" 
                            value={color || "#334155"}
                            onChange={(e) => setProp((props: any) => props.color = e.target.value)}
                            className="flex-1 h-8 text-[12px] bg-background border rounded px-2 uppercase font-mono"
                        />
                    </div>
                </div>
                <div className="space-y-1.5">
                    <label className="text-[11px] font-medium text-muted-foreground">Letter Spacing</label>
                    <input
                        type="text"
                        value={letterSpacing || "0px"}
                        onChange={(e) => setProp((props: any) => props.letterSpacing = e.target.value)}
                        className="w-full h-8 text-[12px] bg-background border rounded px-2 font-mono"
                        placeholder="e.g. -1px or 2px"
                    />
                </div>
            </div>
        </div>
    );
};

Text.craft = {
    displayName: "Text",
    props: {
        text: "Lorem ipsum dolor sit amet",
        fontSize: 16,
        textAlign: "left",
        fontWeight: "400",
        letterSpacing: "0px",
        textTransform: "none",
        color: "#334155",
        width: "auto", height: "auto", padding: "0px", margin: "0px",
        isAbsolute: false, x: 0, y: 0,
        zIndex: 1, opacity: 100, borderRadius: "0px", boxShadow: "none"
    },
    related: {
        settings: TextSettings
    }
};
