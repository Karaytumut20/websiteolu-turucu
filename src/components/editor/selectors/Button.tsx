"use client";
import React from "react";
import { useNode } from "@craftjs/core";
import { ElementWrapper } from "./ElementWrapper";

export const Button = React.forwardRef(({
    text, size, variant, color, href,
    x = 0, y = 0, width = "auto", height = "auto",
    mobileX, mobileY, mobileWidth, mobileHeight,
    zIndex = 1, opacity = 100, borderRadius = "0px", boxShadow = "none"
}: any, ref) => {
    const { connectors: { connect } } = useNode();

    const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";
    const sizeClasses = {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
    };
    const variantClasses = {
        default: "text-white hover:opacity-90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground text-black",
    };

    return (
        <ElementWrapper
            x={x} y={y} width={width} height={height}
            mobileX={mobileX} mobileY={mobileY} mobileWidth={mobileWidth} mobileHeight={mobileHeight}
            zIndex={zIndex} opacity={opacity} borderRadius={borderRadius} boxShadow={boxShadow}
        >
            <button
                ref={ref as any}
                className={`w-full h-full ${baseClasses} ${sizeClasses[size as keyof typeof sizeClasses]} ${variantClasses[variant as keyof typeof variantClasses]}`}
                style={{ backgroundColor: variant === "default" ? color : undefined }}
            >
                {text}
            </button>
        </ElementWrapper>
    );
});

export const ButtonSettings = () => {
    const { actions: { setProp }, text, size, variant, color } = useNode((node) => ({
        text: node.data.props.text,
        size: node.data.props.size,
        variant: node.data.props.variant,
        color: node.data.props.color,
    }));

    return (
        <div className="flex flex-col gap-4 p-4">
            <div>
                <label className="text-sm font-medium">Text</label>
                <input
                    type="text"
                    value={text || "Click Me"}
                    onChange={(e) => setProp((props: any) => props.text = e.target.value)}
                    className="w-full mt-1 border rounded px-2 py-1"
                />
            </div>
            <div>
                <label className="text-sm font-medium">Size</label>
                <select
                    value={size || "default"}
                    onChange={(e) => setProp((props: any) => props.size = e.target.value)}
                    className="w-full mt-1 border rounded px-2 py-1"
                >
                    <option value="sm">Small</option>
                    <option value="default">Default</option>
                    <option value="lg">Large</option>
                </select>
            </div>
            <div>
                <label className="text-sm font-medium">Variant</label>
                <select
                    value={variant || "default"}
                    onChange={(e) => setProp((props: any) => props.variant = e.target.value)}
                    className="w-full mt-1 border rounded px-2 py-1"
                >
                    <option value="default">Solid</option>
                    <option value="outline">Outline</option>
                </select>
            </div>
            {variant === "default" && (
                <div>
                    <label className="text-sm font-medium">Button Color</label>
                    <input
                        type="color"
                        value={color || "#000000"}
                        onChange={(e) => setProp((props: any) => props.color = e.target.value)}
                        className="w-full mt-1 h-10 px-1 py-1 rounded"
                    />
                </div>
            )}
        </div>
    );
};

(Button as any).craft = {
    props: {
        text: "Click Me",
        size: "default",
        variant: "default",
        color: "#0f172a",
        x: 0, y: 0, width: "auto", height: "auto",
        mobileX: 0, mobileY: 0, mobileWidth: "auto", mobileHeight: "auto",
        zIndex: 1, opacity: 100, borderRadius: "0px", boxShadow: "none"
    },
    related: {
        settings: ButtonSettings,
    },
};
