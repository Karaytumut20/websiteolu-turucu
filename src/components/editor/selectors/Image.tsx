"use client";
import React from "react";
import { useNode } from "@craftjs/core";
import { FreeformWrapper, CommonElementProps } from "./FreeformWrapper";

export interface ImageProps extends CommonElementProps {
    src?: string;
    alt?: string;
    objectFit?: any;
    href?: string;
    padding?: string;
    margin?: string;
    isAbsolute?: boolean;
}

export const Image = ({
    src, alt, objectFit, href,
    width = "300px", height = "auto", padding, margin,
    isAbsolute = true, x = 0, y = 0,
    zIndex = 1, opacity = 100, borderRadius = "0px", boxShadow = "none"
}: ImageProps) => {

    return (
        <FreeformWrapper
            width={width} height={height} padding={padding} margin={margin}
            isAbsolute={isAbsolute} x={x} y={y}
            zIndex={zIndex} opacity={opacity} borderRadius={borderRadius} boxShadow={boxShadow}
        >
            <div className="w-full h-full">
                <img
                    src={src}
                    alt={alt}
                    style={{ width: "100%", height: "100%", objectFit }}
                />
            </div>
        </FreeformWrapper>
    );
};

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

Image.craft = {
    displayName: "Image",
    props: {
        src: "https://via.placeholder.com/300x200",
        alt: "Placeholder Image",
        objectFit: "cover",
        width: "300px", height: "auto", padding: "0px", margin: "0px",
        isAbsolute: false, x: 0, y: 0,
        zIndex: 1, opacity: 100, borderRadius: "0px", boxShadow: "none"
    },
    related: {
        settings: ImageSettings
    }
};
