"use client";
import React from "react";
import { useNode } from "@craftjs/core";
import { CommonElementProps } from "./ElementWrapper";

export interface ContainerProps extends CommonElementProps {
    background?: string;
    padding?: string;
    margin?: string;
    children?: React.ReactNode;
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(({
    background = "#ffffff",
    padding = "20px",
    margin = "0px",
    children,
}, ref) => {
    const { connectors: { connect, drag } } = useNode();
    return (
        <div
            ref={(node: HTMLDivElement | null) => {
                if (node) {
                    connect(drag(node) as any);
                    if (typeof ref === 'function') ref(node);
                    else if (ref) ref.current = node;
                }
            }}
            style={{ background, padding, margin, minHeight: "200px", border: "1px dashed #ccc", position: "relative" }}
            className="w-full h-full"
        >
            {children}
        </div>
    );
});

export const ContainerSettings = () => {
    const { background, padding, margin, actions: { setProp } } = useNode((node) => ({
        background: node.data.props.background,
        padding: node.data.props.padding,
        margin: node.data.props.margin,
    }));

    return (
        <div className="flex flex-col gap-4 p-4">
            <div>
                <label className="text-sm font-medium">Background Color</label>
                <input
                    type="color"
                    value={background}
                    onChange={(e) => setProp((props: any) => props.background = e.target.value)}
                    className="w-full mt-1 h-10 px-1 py-1 rounded"
                />
            </div>
            <div>
                <label className="text-sm font-medium">Padding (px)</label>
                <input
                    type="text"
                    value={padding}
                    onChange={(e) => setProp((props: any) => props.padding = e.target.value)}
                    className="w-full mt-1 border rounded px-2 py-1"
                />
            </div>
            <div>
                <label className="text-sm font-medium">Margin (px)</label>
                <input
                    type="text"
                    value={margin}
                    onChange={(e) => setProp((props: any) => props.margin = e.target.value)}
                    className="w-full mt-1 border rounded px-2 py-1"
                />
            </div>
        </div>
    );
};

(Container as any).craft = {
    selected: ContainerSettings,
    props: {
        background: "#ffffff",
        padding: "20px",
        margin: "0px",
        x: 0, y: 0, width: "100%", height: "100%",
        mobileX: 0, mobileY: 0, mobileWidth: "100%", mobileHeight: "100%",
        zIndex: 1, opacity: 100, borderRadius: "0px", boxShadow: "none"
    },
    rules: {
        canDrag: () => true,
    },
};
