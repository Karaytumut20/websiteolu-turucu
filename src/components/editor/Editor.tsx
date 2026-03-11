"use client";
import React, { useEffect, useState } from "react";
import { Editor as CraftEditor, Frame, Element } from "@craftjs/core";
import { Container } from "./selectors/Container";
import { Text } from "./selectors/Text";
import { Button } from "./selectors/Button";
import { Heading } from "./selectors/Heading";
import { Image } from "./selectors/Image";
import { HeroSection } from "./selectors/HeroSection";
import { InfoCard } from "./selectors/InfoCard";
import { PricingTable } from "./selectors/PricingTable";
import { NavigationBar } from "./selectors/NavigationBar";
import { Topbar } from "./Topbar";
import { SettingsPanel } from "./SettingsPanel";
import { Toolbox } from "./Toolbox";
import LZUTF8 from "lzutf8";
import { DeviceProvider, useDevice } from "./DeviceContext";

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

const userComponents = { Container, Text, Button, Heading, Image, HeroSection, InfoCard, PricingTable, NavigationBar };

// Inner Editor that consumes DeviceContext
const EditorInner = ({ pageId, hydratedState }: { pageId?: string, hydratedState: string | null }) => {
    const { device } = useDevice();

    return (
        <CraftEditor
            resolver={userComponents}
            onRender={({ render }) => <>{render}</>}
        >
            <Topbar pageId={pageId} />

            <div className="flex flex-1 h-full overflow-hidden">
                {/* Left Sidebar - Toolbox */}
                <Toolbox />

                {/* Main Canvas Area */}
                <div className="flex-1 overflow-auto bg-neutral-100 p-8 flex justify-center">
                    <div className={`bg-white min-h-[800px] shadow-sm ring-1 ring-neutral-200 transition-all duration-300 origin-top ${device === 'mobile' ? 'w-[375px]' : 'w-full'}`}>
                        <Frame data={hydratedState || undefined}>
                            <Element is={Container} padding="40px" background="#ffffff" canvas>
                                <Element is={Heading} text="Welcome to your new site!" level={1} />
                                <Element is={Text} text="Start dragging elements from the left panel to build your page." />
                            </Element>
                        </Frame>
                    </div>
                </div>

                {/* Right Sidebar - Properties/Settings */}
                <SettingsPanel />
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
        if (!initialState || initialState === "null" || initialState === "{}") return null;
        try {
            if (initialState.startsWith('{') || initialState.startsWith('[')) return initialState;
            return LZUTF8.decompress(initialState, { inputEncoding: "Base64" });
        } catch (e) {
            console.error("Failed to decompress Craft.js state", e);
            return null;
        }
    });

    return (
        <div className="h-screen flex flex-col overflow-hidden">
            <DeviceProvider>
                <EditorInner pageId={pageId} hydratedState={hydratedState} />
            </DeviceProvider>
        </div>
    );
};
