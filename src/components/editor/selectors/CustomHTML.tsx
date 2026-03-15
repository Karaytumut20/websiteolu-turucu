"use client";
import React, { useEffect, useState } from "react";
import { useNode } from "@craftjs/core";
import { FreeformWrapper, CommonElementProps } from "./FreeformWrapper";

export interface CustomHTMLProps extends CommonElementProps {
    htmlContent?: string;
}

export const CustomHTML = ({
    htmlContent = "<div style='padding: 20px; background: #f3f4f6; color: #374151; font-family: monospace; border: 1px dashed #9ca3af; text-align: center;'>Paste your Custom HTML/Embeds in Settings</div>",
    width = "100%", height = "auto", padding = "0px", margin = "0px",
    isAbsolute = true, x = 0, y = 0,
    zIndex = 1, opacity = 100, borderRadius = "0px", boxShadow = "none",
    linkUrl, linkTarget, animationType, animationDelay
}: CustomHTMLProps) => {
    const { connectors: { connect } } = useNode();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <FreeformWrapper
            width={width} height={height} padding={padding} margin={margin}
            isAbsolute={isAbsolute} x={x} y={y}
            zIndex={zIndex} opacity={opacity} borderRadius={borderRadius} boxShadow={boxShadow}
            linkUrl={linkUrl} linkTarget={linkTarget} animationType={animationType} animationDelay={animationDelay}
        >
            <div 
                className="w-full h-full min-h-[50px] custom-html-container overflow-hidden" 
                dangerouslySetInnerHTML={{ __html: mounted ? htmlContent : '' }}
                style={{ pointerEvents: "none" }} // Important: prevents CraftJS drag issues over iframes/complex DOMs
            />
        </FreeformWrapper>
    );
};

export const CustomHTMLSettings = () => {
    const { actions: { setProp }, htmlContent } = useNode((node) => ({
        htmlContent: node.data.props.htmlContent,
    }));

    return (
        <div className="flex flex-col gap-4 p-4">
            <div className="space-y-1.5">
                <label className="text-[11px] font-medium text-muted-foreground flex justify-between">
                    <span>HTML Embed Code</span>
                    <span className="text-blue-500 cursor-help" title="Supports Google Maps, Typeforms, Twitter feeds, and any raw HTML.">Help</span>
                </label>
                <textarea
                    value={htmlContent || ""}
                    onChange={(e) => setProp((props: any) => props.htmlContent = e.target.value)}
                    className="w-full h-48 text-[11px] font-mono bg-background border rounded p-2 focus:ring-1 focus:ring-blue-500"
                    placeholder="<!-- Paste your code here -->"
                />
            </div>
            <p className="text-[10px] text-muted-foreground leading-snug">
                Warning: Scripts embedded here might only execute fully on the published live site due to editor security sandboxing. Check Live Preview mode to verify.
            </p>
        </div>
    );
};

CustomHTML.craft = {
    displayName: "Custom HTML",
    props: {
        htmlContent: "<div style='padding: 20px; background: #f3f4f6; color: #374151; font-family: monospace; border: 1px dashed #9ca3af; text-align: center;'>Paste your Custom HTML/Embeds in Settings</div>",
        width: "100%", height: "auto", padding: "0px", margin: "0px",
        isAbsolute: false, x: 0, y: 0,
        zIndex: 1, opacity: 100, borderRadius: "0px", boxShadow: "none"
    },
    related: {
        settings: CustomHTMLSettings
    }
};
