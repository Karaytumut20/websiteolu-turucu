"use client";
import React, { useState } from "react";
import { useNode, Element } from "@craftjs/core";
import { FreeformWrapper, CommonElementProps } from "./FreeformWrapper";
import { Container } from "./Container";
import { Text } from "./Text";
import { Image } from "./Image";

// Mocking a CMS Hook
const useCMS = () => {
    return [
        {
            id: 1,
            title: "Exploring React Server Components",
            excerpt: "How RSCs are changing the way we build fully dynamic web applications.",
            coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop"
        },
        {
            id: 2,
            title: "Mastering Tailwind CSS Overrides",
            excerpt: "A deep dive into cascading utility classes and keeping your stylesheets clean.",
            coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop"
        },
        {
            id: 3,
            title: "Framer Motion vs Native CSS",
            excerpt: "When to use JavaScript-driven physics versus hardware-accelerated CSS keyframes.",
            coverImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop"
        }
    ];
};

export interface CollectionListProps extends CommonElementProps {
    columns?: number;
    gap?: number;
}

export const CollectionList = ({ 
    columns = 3, 
    gap = 24,
    width = "100%", height = "auto", padding = "40px 0px", margin = "0px",
    isAbsolute = true, x = 0, y = 0,
    zIndex = 1, opacity = 100, borderRadius = "0px", boxShadow = "none"
}: CollectionListProps) => {
    const { connectors: { connect, drag } } = useNode();
    const data = useCMS();

    return (
        <FreeformWrapper
            width={width} height={height} padding={padding} margin={margin}
            isAbsolute={isAbsolute} x={x} y={y}
            zIndex={zIndex} opacity={opacity} borderRadius={borderRadius} boxShadow={boxShadow}
        >
            <div 
                ref={(ref) => { if (ref) connect(drag(ref)); }}
                className="w-full h-full"
            >
                <div 
                    style={{
                        display: "grid",
                        gridTemplateColumns: `repeat(${columns}, 1fr)`,
                        gap: `${gap}px`,
                        width: "100%",
                        height: "100%"
                    }}
                >
                    {data.map((item) => (
                        <div key={item.id} className="w-full flex flex-col gap-4 bg-card rounded-xl border shadow-sm p-4 overflow-hidden hover:shadow-md transition-shadow">
                            {/* Read-only representation of the card based on dynamic content */}
                            <div className="w-full h-48 relative rounded-md overflow-hidden bg-muted">
                                <img src={item.coverImage} alt={item.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <h3 className="text-xl font-bold text-foreground" style={{ fontFamily: 'var(--builder-font)'}}>{item.title}</h3>
                                <p className="text-sm text-muted-foreground">{item.excerpt}</p>
                            </div>
                            <div className="mt-auto pt-4">
                                <span className="text-sm font-medium" style={{ color: 'var(--builder-primary)'}}>Read Post &rarr;</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </FreeformWrapper>
    );
};

export const CollectionListSettings = () => {
    const { actions: { setProp }, columns, gap } = useNode((node) => ({
        columns: node.data.props.columns,
        gap: node.data.props.gap,
    }));

    return (
        <div className="flex flex-col gap-4 p-4">
            <div>
                <label className="text-sm font-medium">Columns (Grid)</label>
                <input
                    type="range"
                    min="1" max="4"
                    value={columns || 3}
                    onChange={(e) => setProp((props: any) => props.columns = parseInt(e.target.value))}
                    className="w-full mt-2"
                />
                <div className="text-xs text-center mt-1 text-muted-foreground">{columns || 3} Columns</div>
            </div>
            <div>
                <label className="text-sm font-medium">Gap (px)</label>
                <input
                    type="range"
                    min="0" max="64"
                    value={gap || 24}
                    onChange={(e) => setProp((props: any) => props.gap = parseInt(e.target.value))}
                    className="w-full mt-2"
                />
                <div className="text-xs text-center mt-1 text-muted-foreground">{gap || 24}px</div>
            </div>
            <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-md">
                <p className="text-xs text-indigo-800">
                    <strong>Pro Feature:</strong> This block automatically pulls repeating data from your connected CMS collections.
                </p>
            </div>
        </div>
    );
};

CollectionList.craft = {
    displayName: "CMS Collection",
    props: {
        columns: 3,
        gap: 24,
        width: "100%", height: "auto", padding: "40px 0px", margin: "0px",
        isAbsolute: false, x: 0, y: 0,
        zIndex: 1, opacity: 100, borderRadius: "0px", boxShadow: "none"
    },
    related: {
        settings: CollectionListSettings
    }
};
