"use client";
import React, { useEffect, useState } from "react";
import { Editor as CraftEditor, Frame, Element, useEditor } from "@craftjs/core";
import { Container } from "./selectors/Container";
import { Text } from "./selectors/Text";
import { Button } from "./selectors/Button";
import { Heading } from "./selectors/Heading";
import { Image } from "./selectors/Image";
import { HeroSection } from "./selectors/HeroSection";
import { InfoCard } from "./selectors/InfoCard";
import { PricingTable } from "./selectors/PricingTable";
import { NavigationBar } from "./selectors/NavigationBar";
import { Video } from "./selectors/Video";
import { Icon } from "./selectors/Icon";
import { Divider } from "./selectors/Divider";
import { Footer } from "./selectors/Footer";
import { Testimonials } from "./selectors/Testimonials";
import { Gallery } from "./selectors/Gallery";
import { CustomHTML } from "./selectors/CustomHTML";
import { CollectionList } from "./selectors/CollectionList";
import { Topbar } from "./Topbar";
import { SettingsPanel } from "./SettingsPanel";
import { Toolbox } from "./Toolbox";
import { RenderNode } from "./RenderNode";
import LZUTF8 from "lzutf8";
import { DeviceProvider, useDevice } from "./DeviceContext";
import { PreviewProvider, usePreview } from "./PreviewContext";

// Suppress React 19 DOM ref warnings caused by @craftjs/core before they trigger Next.js error overlay
if (typeof window !== "undefined") {
    const originalConsoleError = console.error;
    console.error = (...args: any[]) => {
        if (typeof args[0] === "string" && args[0].includes("Accessing element.ref was removed in React 19")) {
            return; // Ignore
        }
        // Also suppress the secondary warning that sometimes follows
        if (typeof args[0] === "string" && args[0].includes("ref is now a regular prop")) {
            return;
        }
        originalConsoleError(...args);
    };
}

const userComponents = { Container, Text, Button, Heading, Image, HeroSection, InfoCard, PricingTable, NavigationBar, Video, Icon, Divider, Footer, Testimonials, Gallery, CustomHTML, CollectionList };

const GridOverlay = () => {
    const { isDragging } = useEditor((state) => ({
        isDragging: state.events.dragged !== null,
    }));
    return (
        <div 
            className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${isDragging ? 'opacity-100' : 'opacity-0'}`} 
            style={{
                backgroundImage: `linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)`,
                backgroundSize: '10px 10px'
            }}
        />
    );
};

// Inner Editor that consumes DeviceContext & PreviewContext
const EditorInner = ({ pageId, hydratedState }: { pageId?: string, hydratedState: string | null }) => {
    const { device } = useDevice();
    const { isPreview } = usePreview();

    // Track global mouse position so we can spawn absolute components exactly at the mouse cursor
    useEffect(() => {
        if (isPreview) return;
        const trackMouse = (e: MouseEvent | DragEvent) => {
            (window as any).lastCraftMouseX = e.clientX;
            (window as any).lastCraftMouseY = e.clientY;
        };
        // Listen broadly on the document so we catch the mouse even during a drag session
        document.addEventListener('dragover', trackMouse);
        document.addEventListener('mousemove', trackMouse);
        return () => {
            document.removeEventListener('dragover', trackMouse);
            document.removeEventListener('mousemove', trackMouse);
        };
    }, [isPreview]);

    // STRICT VALIDATION: Ensure all userComponents are actually valid React components with .craft definitions before passing to CraftEditor
    if (typeof window !== "undefined") {
        for (const key of Object.keys(userComponents)) {
            const comp = (userComponents as any)[key];
            if (!comp) {
                console.error(`CRAFT RESOLVER FATAL: Component ${key} is exported as undefined or null! Check import/export paths.`);
            } else if (!comp.craft) {
                console.warn(`CRAFT RESOLVER WARN: Component ${key} does not have a .craft property! Defaulting values.`);
            }
        }
    }

    return (
        <CraftEditor
            enabled={!isPreview}
            resolver={userComponents}
            onRender={RenderNode}
            indicator={{
                success: "#3b82f6", // tailwind blue-500
                error: "#ef4444", // tailwind red-500
                thickness: 3,
                transition: "all 0.2s ease",
            }}
        >
            <Topbar pageId={pageId} />

            <div className="flex flex-1 h-full overflow-hidden">
                {/* Left Sidebar - Toolbox */}
                {!isPreview && <Toolbox />}

                {/* Main Canvas Area */}
                <div className="flex-1 overflow-auto bg-neutral-100 p-8 flex justify-center relative">
                    {/* Visual Grid for Absolute Positioning Snapping */}
                    {!isPreview && <GridOverlay />}
                    
                    <div className={`bg-white min-h-[800px] shadow-sm ring-1 ring-neutral-200 transition-all duration-300 origin-top z-10 relative ${device === 'mobile' ? 'w-[375px]' : 'w-full'}`}>
                        <Frame data={hydratedState || undefined}>
                            <Element is={Container} padding="40px" background="#ffffff" isCanvasContext={true} canvas>
                                <Element is={Heading} text="Welcome to your new site!" level={1} />
                                <Element is={Text} text="Start dragging elements from the left panel to build your page." />
                            </Element>
                        </Frame>
                    </div>
                </div>

                {/* Right Sidebar - Properties/Settings */}
                {!isPreview && <SettingsPanel />}
            </div>
        </CraftEditor>
    );
};

export const Editor = ({
    pageId,
    initialState
}: {
    pageId?: string,
    initialState?: string
}) => {
    const [hydratedState] = useState<string | null>(() => {
        // TEMPORARY FAILSAFE: Hard return null to totally block DB payload from corrupting the canvas.
        // We will remove this once we prove it boots perfectly without it.
        return null;
    });

    return (
        <div className="h-screen flex flex-col overflow-hidden">
            <PreviewProvider>
                <DeviceProvider>
                    <EditorInner pageId={pageId} hydratedState={hydratedState} />
                </DeviceProvider>
            </PreviewProvider>
        </div>
    );
};
