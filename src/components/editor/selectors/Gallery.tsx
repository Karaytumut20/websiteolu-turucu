"use client";
import React from "react";
import { useNode, Element } from "@craftjs/core";
import { FreeformWrapper, CommonElementProps } from "./FreeformWrapper";
import { Image } from "./Image";

export interface GalleryProps extends CommonElementProps {
    columns?: number;
    gap?: number;
}

export const Gallery = ({
    columns = 3,
    gap = 16,
    width = "100%", height = "auto", padding = "20px", margin = "0px",
    isAbsolute = true, x = 0, y = 0,
    zIndex = 1, opacity = 100, borderRadius = "0px", boxShadow = "none",
    linkUrl, linkTarget, animationType, animationDelay
}: GalleryProps) => {

    return (
        <FreeformWrapper
            width={width} height={height} padding={padding} margin={margin}
            isAbsolute={isAbsolute} x={x} y={y}
            zIndex={zIndex} opacity={opacity} borderRadius={borderRadius} boxShadow={boxShadow}
            linkUrl={linkUrl} linkTarget={linkTarget} animationType={animationType} animationDelay={animationDelay}
        >
            <div 
                className="w-full h-full" 
                style={{ 
                    display: 'grid', 
                    gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`, 
                    gap: `${gap}px` 
                }}
            >
                <Element id="img-1" is={Image} width="100%" height="auto" isAbsolute={false} src="https://images.unsplash.com/photo-1498050108023-c5249f4df085" />
                <Element id="img-2" is={Image} width="100%" height="auto" isAbsolute={false} src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6" />
                <Element id="img-3" is={Image} width="100%" height="auto" isAbsolute={false} src="https://images.unsplash.com/photo-1555066931-4365d14bab8c" />
                {columns > 3 && (
                     <Element id="img-4" is={Image} width="100%" height="auto" isAbsolute={false} src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8" />
                )}
            </div>
        </FreeformWrapper>
    );
};

export const GallerySettings = () => {
    const { actions: { setProp }, columns, gap } = useNode((node) => ({
        columns: node.data.props.columns,
        gap: node.data.props.gap,
    }));

    return (
        <div className="flex flex-col gap-4 p-4">
            <div className="space-y-1.5">
                <label className="text-[11px] font-medium text-muted-foreground">Columns Grid</label>
                <input
                    type="range"
                    min="1" max="4"
                    value={columns || 3}
                    onChange={(e) => setProp((props: any) => props.columns = parseInt(e.target.value))}
                    className="w-full"
                />
                <div className="text-right text-[11px] text-muted-foreground">{columns || 3} cols</div>
            </div>
            <div className="space-y-1.5">
                <label className="text-[11px] font-medium text-muted-foreground">Gap Spacing (px)</label>
                <input
                    type="number"
                    min="0" max="64"
                    value={gap || 16}
                    onChange={(e) => setProp((props: any) => props.gap = parseInt(e.target.value))}
                    className="w-full h-8 text-[12px] bg-background border rounded px-2"
                />
            </div>
        </div>
    );
};

Gallery.craft = {
    displayName: "Gallery",
    props: {
        columns: 3,
        gap: 16,
        width: "100%", height: "auto", padding: "0px", margin: "0px",
        isAbsolute: false, x: 0, y: 0,
        zIndex: 1, opacity: 100, borderRadius: "0px", boxShadow: "none"
    },
    related: {
        settings: GallerySettings
    }
};
