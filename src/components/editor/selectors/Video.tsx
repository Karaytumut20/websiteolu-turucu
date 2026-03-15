"use client";
import React from "react";
import { useNode } from "@craftjs/core";
import { FreeformWrapper, CommonElementProps } from "./FreeformWrapper";

export interface VideoProps extends CommonElementProps {
    videoId?: string;
    padding?: string;
    margin?: string;
    isAbsolute?: boolean;
}

export const Video = ({
    videoId = "dQw4w9WgXcQ", // Default Rick Astley
    width = "100%", height = "315px", padding, margin,
    isAbsolute = true, x = 0, y = 0,
    zIndex = 1, opacity = 100, borderRadius = "0px", boxShadow = "none"
}: VideoProps) => {
    return (
        <FreeformWrapper
            width={width} height={height} padding={padding} margin={margin}
            isAbsolute={isAbsolute} x={x} y={y}
            zIndex={zIndex} opacity={opacity} borderRadius={borderRadius} boxShadow={boxShadow}
        >
            <div className="w-full h-full relative" style={{ borderRadius: borderRadius !== "0px" ? borderRadius : undefined, overflow: 'hidden' }}>
                <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${videoId}?rel=0`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                    style={{ pointerEvents: "none" }} // Crucial so Craft can drag it without the iframe swallowing the event
                ></iframe>
            </div>
        </FreeformWrapper>
    );
};

export const VideoSettings = () => {
    const { actions: { setProp }, videoId } = useNode((node) => ({
        videoId: node.data.props.videoId,
    }));

    return (
        <div className="flex flex-col gap-4 p-4">
            <div>
                <label className="text-[11px] font-medium text-muted-foreground block mb-1.5">YouTube Video ID</label>
                <input
                    type="text"
                    value={videoId || ""}
                    onChange={(e) => setProp((props: any) => props.videoId = e.target.value)}
                    className="w-full h-8 px-2 border rounded bg-background text-[12px] font-mono"
                    placeholder="e.g. dQw4w9WgXcQ"
                />
                <p className="text-[10px] text-muted-foreground mt-2">
                    Enter the ID at the end of the YouTube URL.
                </p>
            </div>
        </div>
    );
};

Video.craft = {
    displayName: "Video",
    props: {
        videoId: "dQw4w9WgXcQ",
        width: "560px", height: "315px", padding: "0px", margin: "0px",
        isAbsolute: false, x: 0, y: 0,
        zIndex: 1, opacity: 100, borderRadius: "8px", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)"
    },
    related: {
        settings: VideoSettings
    }
};
