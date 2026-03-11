"use client";
import React from "react";
import { useNode } from "@craftjs/core";
import ContentEditable from "react-contenteditable";
import { ElementWrapper, CommonElementProps } from "./ElementWrapper";

export interface HeadingProps extends CommonElementProps {
    text?: string;
    level?: number;
    textAlign?: any; // ContentEditable alignment
    color?: string;
    href?: string;
}

export const Heading = React.forwardRef<HTMLDivElement, HeadingProps>(({
    text = "Heading", level = 2, textAlign = "left", color = "#000000", href,
    x = 0, y = 0, width = "auto", height = "auto",
    mobileX, mobileY, mobileWidth, mobileHeight,
    zIndex = 1, opacity = 100, borderRadius = "0px", boxShadow = "none"
}, ref) => {
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
        <ElementWrapper
            x={x} y={y} width={width} height={height}
            mobileX={mobileX} mobileY={mobileY} mobileWidth={mobileWidth} mobileHeight={mobileHeight}
            zIndex={zIndex} opacity={opacity} borderRadius={borderRadius} boxShadow={boxShadow}
        >
            <div
                ref={ref as any}
                className={`w-full h-full ${sizes[level as keyof typeof sizes]}`}
                style={{ textAlign, color }}
            >
                <ContentEditable
                    html={text}
                    disabled={!hasSelectedNode}
                    onChange={(e: any) =>
                        setProp((props: any) => (props.text = e.target.value))
                    }
                    tagName={Tag as string}
                    className="outline-none w-full h-full"
                />
            </div>
        </ElementWrapper>
    );
});

export const HeadingSettings = () => {
    const { actions: { setProp }, level, textAlign, color } = useNode((node) => ({
        level: node.data.props.level,
        textAlign: node.data.props.textAlign,
        color: node.data.props.color,
    }));

    return (
        <div className="flex flex-col gap-4 p-4">
            <div>
                <label className="text-sm font-medium">Heading Level</label>
                <select
                    value={level || 2}
                    onChange={(e) => setProp((props: any) => props.level = parseInt(e.target.value))}
                    className="w-full mt-1 border rounded px-2 py-1"
                >
                    {[1, 2, 3, 4, 5, 6].map(l => (
                        <option key={l} value={l}>H{l}</option>
                    ))}
                </select>
            </div>
            <div>
                <label className="text-sm font-medium">Text Align</label>
                <select
                    value={textAlign || "left"}
                    onChange={(e) => setProp((props: any) => props.textAlign = e.target.value)}
                    className="w-full mt-1 border rounded px-2 py-1"
                >
                    <option value="left">Left</option>
                    <option value="center">Center</option>
                    <option value="right">Right</option>
                </select>
            </div>
            <div>
                <label className="text-sm font-medium">Text Color</label>
                <input
                    type="color"
                    value={color || "#000000"}
                    onChange={(e) => setProp((props: any) => props.color = e.target.value)}
                    className="w-full mt-1 h-10 px-1 py-1 rounded"
                />
            </div>
        </div>
    );
};

(Heading as any).craft = {
    props: {
        text: "Heading Title",
        level: 2,
        textAlign: "left",
        color: "#000000",
        x: 0, y: 0, width: "auto", height: "auto",
        mobileX: 0, mobileY: 0, mobileWidth: "auto", mobileHeight: "auto",
        zIndex: 1, opacity: 100, borderRadius: "0px", boxShadow: "none"
    },
    related: {
        settings: HeadingSettings,
    },
};
