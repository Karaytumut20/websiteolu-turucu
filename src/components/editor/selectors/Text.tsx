"use client";
import React from "react";
import { useNode } from "@craftjs/core";
import ContentEditable from "react-contenteditable";
import { ElementWrapper, CommonElementProps } from "./ElementWrapper";

export interface TextProps extends CommonElementProps {
    text?: string;
    fontSize?: number;
    textAlign?: any; // ContentEditable alignment
    href?: string;
}

export const Text = React.forwardRef<HTMLDivElement, TextProps>(({
    text, fontSize, textAlign, href,
    x = 0, y = 0, width = "auto", height = "auto",
    mobileX, mobileY, mobileWidth, mobileHeight,
    zIndex = 1, opacity = 100, borderRadius = "0px", boxShadow = "none"
}, ref) => {
    const { hasSelectedNode, actions: { setProp } } = useNode((node) => ({
        hasSelectedNode: node.events.selected,
    }));

    return (
        <ElementWrapper
            x={x} y={y} width={width} height={height}
            mobileX={mobileX} mobileY={mobileY} mobileWidth={mobileWidth} mobileHeight={mobileHeight}
            zIndex={zIndex} opacity={opacity} borderRadius={borderRadius} boxShadow={boxShadow}
        >
            <div ref={ref as any} className="w-full h-full text-base">
                <ContentEditable
                    html={text || ""}
                    disabled={!hasSelectedNode}
                    onChange={(e: any) =>
                        setProp((props: any) => (props.text = e.target.value))
                    }
                    tagName="div"
                    style={{ fontSize: `${fontSize}px`, textAlign }}
                    className="w-full h-full outline-none"
                />
            </div>
        </ElementWrapper>
    );
});

export const TextSettings = () => {
    const { actions: { setProp }, fontSize, textAlign } = useNode((node) => ({
        fontSize: node.data.props.fontSize,
        textAlign: node.data.props.textAlign,
    }));

    return (
        <div className="flex flex-col gap-4 p-4">
            <div>
                <label className="text-sm font-medium">Font Size</label>
                <input
                    type="number"
                    value={fontSize || 16}
                    onChange={(e) => setProp((props: any) => props.fontSize = parseInt(e.target.value))}
                    className="w-full mt-1 border rounded px-2 py-1"
                />
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
        </div>
    );
};

(Text as any).craft = {
    props: {
        text: "Editable Text",
        fontSize: 16,
        textAlign: "left",
        x: 0, y: 0, width: "auto", height: "auto",
        mobileX: 0, mobileY: 0, mobileWidth: "auto", mobileHeight: "auto",
        zIndex: 1, opacity: 100, borderRadius: "0px", boxShadow: "none"
    },
    related: {
        settings: TextSettings,
    },
};
