"use client";
import React from "react";
import { useNode } from "@craftjs/core";
import { ElementWrapper } from "./ElementWrapper";

export const Image = React.forwardRef(({
    src, alt, objectFit, href,
    width = "300px", height = "auto",
    x = 0, y = 0,
    mobileX, mobileY, mobileWidth, mobileHeight,
    zIndex = 1, opacity = 100, borderRadius = "0px", boxShadow = "none"
}: any, ref) => {

    return (
        <ElementWrapper
            x={x} y={y} width={width} height={height}
            mobileX={mobileX} mobileY={mobileY} mobileWidth={mobileWidth} mobileHeight={mobileHeight}
            zIndex={zIndex} opacity={opacity} borderRadius={borderRadius} boxShadow={boxShadow}
        >
            <div ref={ref as any} className="w-full h-full">
                <img
                    src={src}
                    alt={alt}
                    style={{ width: "100%", height: "100%", objectFit }}
                />
            </div>
        </ElementWrapper>
    );
});

export const ImageSettings = () => {
    const { actions: { setProp }, src, alt, width, height, objectFit } = useNode((node) => ({
        src: node.data.props.src,
        alt: node.data.props.alt,
        width: node.data.props.width,
        height: node.data.props.height,
        objectFit: node.data.props.objectFit,
    }));

    return (
        <div className="flex flex-col gap-4 p-4">
            <div>
                <label className="text-sm font-medium">Image URL</label>
                <input
                    type="text"
                    value={src || ""}
                    onChange={(e) => setProp((props: any) => props.src = e.target.value)}
                    className="w-full mt-1 border rounded px-2 py-1"
                />
            </div>
            <div>
                <label className="text-sm font-medium">Alt Text</label>
                <input
                    type="text"
                    value={alt || ""}
                    onChange={(e) => setProp((props: any) => props.alt = e.target.value)}
                    className="w-full mt-1 border rounded px-2 py-1"
                />
            </div>
            <div>
                <label className="text-sm font-medium">Width</label>
                <input
                    type="text"
                    value={width || "auto"}
                    onChange={(e) => setProp((props: any) => props.width = e.target.value)}
                    className="w-full mt-1 border rounded px-2 py-1"
                />
            </div>
            <div>
                <label className="text-sm font-medium">Height</label>
                <input
                    type="text"
                    value={height || "auto"}
                    onChange={(e) => setProp((props: any) => props.height = e.target.value)}
                    className="w-full mt-1 border rounded px-2 py-1"
                />
            </div>
            <div>
                <label className="text-sm font-medium">Object Fit</label>
                <select
                    value={objectFit || "cover"}
                    onChange={(e) => setProp((props: any) => props.objectFit = e.target.value)}
                    className="w-full mt-1 border rounded px-2 py-1"
                >
                    <option value="fill">Fill</option>
                    <option value="contain">Contain</option>
                    <option value="cover">Cover</option>
                    <option value="none">None</option>
                    <option value="scale-down">Scale Down</option>
                </select>
            </div>
        </div>
    );
};

(Image as any).craft = {
    props: {
        src: "https://via.placeholder.com/300x200",
        alt: "Placeholder Image",
        objectFit: "cover",
        x: 0, y: 0, width: "300px", height: "200px",
        mobileX: 0, mobileY: 0, mobileWidth: "300px", mobileHeight: "200px",
        zIndex: 1, opacity: 100, borderRadius: "0px", boxShadow: "none"
    },
    related: {
        settings: ImageSettings,
    },
};
