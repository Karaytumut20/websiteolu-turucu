"use client";
import React from "react";
import { useNode } from "@craftjs/core";
import ContentEditable from "react-contenteditable";
import { FreeformWrapper, CommonElementProps } from "./FreeformWrapper";

export interface HeadingProps extends CommonElementProps {
    text?: string;
    level?: number;
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

export const Heading = ({
    text = "Heading", level = 2, textAlign = "left", color = "var(--builder-text)",
    fontWeight = "600", letterSpacing = "-0.02em", textTransform = "none", href,
    width = "auto", height = "auto", padding, margin,
    isAbsolute = true, x = 0, y = 0,
    zIndex = 1, opacity = 100, borderRadius = "0px", boxShadow = "none"
}: HeadingProps) => {
    const { hasSelectedNode, actions: { setProp } } = useNode((node) => ({
        hasSelectedNode: node.events.selected,
    }));

    const Tag = `h${level}` as any;
    const sizes = {
        1: "text-4xl font-extrabold tracking-tight lg:text-5xl",
        2: "text-3xl font-semibold tracking-tight first:mt-0",
        3: "text-2xl font-semibold tracking-tight",
        4: "text-xl font-semibold tracking-tight",
        5: "text-lg font-semibold tracking-tight",
        6: "text-base font-semibold tracking-tight",
    };

    return (
        <FreeformWrapper
            width={width} height={height} padding={padding} margin={margin}
            isAbsolute={isAbsolute} x={x} y={y}
            zIndex={zIndex} opacity={opacity} borderRadius={borderRadius} boxShadow={boxShadow}
        >
            <div
                className={`w-full h-full ${sizes[level as keyof typeof sizes]}`}
                style={{ 
                    textAlign: textAlign as any, 
                    color,
                    fontWeight,
                    letterSpacing,
                    textTransform: textTransform as any,
                    fontFamily: 'var(--builder-font)'
                }}
            >
                <ContentEditable
                    html={text}
                    disabled={!hasSelectedNode}
                    onChange={(e: any) =>
                        setProp((props: any) => (props.text = e.target.value))
                    }
                    tagName={Tag as string}
                    className="outline-none w-full h-full content-editable-block"
                />
            </div>
        </FreeformWrapper>
    );
};

export const HeadingSettings = () => {
    const { actions: { setProp }, level, textAlign, color, fontWeight, letterSpacing, textTransform } = useNode((node) => ({
        level: node.data.props.level,
        textAlign: node.data.props.textAlign,
        color: node.data.props.color,
        fontWeight: node.data.props.fontWeight,
        letterSpacing: node.data.props.letterSpacing,
        textTransform: node.data.props.textTransform,
    }));

    return (
        <div className="flex flex-col gap-4 p-4">
            <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                    <label className="text-[11px] font-medium text-muted-foreground">Heading Level</label>
                    <select
                        value={level || 2}
                        onChange={(e) => setProp((props: any) => props.level = parseInt(e.target.value))}
                        className="w-full h-8 text-[12px] bg-background border rounded px-2"
                    >
                        {[1, 2, 3, 4, 5, 6].map(l => (
                            <option key={l} value={l}>H{l}</option>
                        ))}
                    </select>
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
                        value={fontWeight || "600"}
                        onChange={(e) => setProp((props: any) => props.fontWeight = e.target.value)}
                        className="w-full h-8 text-[12px] bg-background border rounded px-2"
                    >
                        <option value="300">Light (300)</option>
                        <option value="400">Regular (400)</option>
                        <option value="500">Medium (500)</option>
                        <option value="600">Semibold (600)</option>
                        <option value="700">Bold (700)</option>
                        <option value="800">ExtraBold (800)</option>
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
                            value={color || "#000000"}
                            onChange={(e) => setProp((props: any) => props.color = e.target.value)}
                            className="w-8 h-8 p-0 border-0 rounded cursor-pointer"
                        />
                        <input 
                            type="text" 
                            value={color || "#000000"}
                            onChange={(e) => setProp((props: any) => props.color = e.target.value)}
                            className="flex-1 h-8 text-[12px] bg-background border rounded px-2 uppercase font-mono"
                        />
                    </div>
                </div>
                <div className="space-y-1.5">
                    <label className="text-[11px] font-medium text-muted-foreground">Letter Spacing</label>
                    <input
                        type="text"
                        value={letterSpacing || "-0.02em"}
                        onChange={(e) => setProp((props: any) => props.letterSpacing = e.target.value)}
                        className="w-full h-8 text-[12px] bg-background border rounded px-2 font-mono"
                        placeholder="e.g. -1px or 2px"
                    />
                </div>
            </div>
        </div>
    );
};

Heading.craft = {
    displayName: "Heading",
    props: {
        text: "Heading",
        level: 2,
        textAlign: "left",
        fontWeight: "600",
        letterSpacing: "-0.02em",
        textTransform: "none",
        color: "#0f172a",
        width: "100%", height: "auto", padding: "0px", margin: "0px",
        isAbsolute: false, x: 0, y: 0,
        zIndex: 1, opacity: 100, borderRadius: "0px", boxShadow: "none"
    },
    related: {
        settings: HeadingSettings
    }
};
