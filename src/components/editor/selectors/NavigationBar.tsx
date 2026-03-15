"use client";
import React from "react";
import { useNode, Element } from "@craftjs/core";
import { FreeformWrapper } from "./FreeformWrapper";
import { Text } from "./Text";
import { Button } from "./Button";

export const NavigationBar = ({
    backgroundColor = "#ffffff", href,
    width = "100%", height = "70px", padding, margin,
    isAbsolute = true, x = 0, y = 0,
    zIndex = 50, opacity = 100, borderRadius = "0px", boxShadow = "0 1px 3px rgba(0,0,0,0.1)"
}: any) => {
    return (
        <FreeformWrapper
            width={width} height={height} padding={padding} margin={margin}
            isAbsolute={isAbsolute} x={x} y={y}
            zIndex={zIndex} opacity={opacity} borderRadius={borderRadius} boxShadow={boxShadow}
        >
            <header className="w-full h-full flex items-center justify-between px-6 md:px-10" style={{ backgroundColor }}>

                <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
                    <div className="w-8 h-8 rounded-md bg-indigo-600 flex items-center justify-center text-white">L</div>
                    <Element id="nav-logo-text" is={Text} text="Logo" fontSize={20} />
                </div>

                <nav className="hidden md:flex items-center gap-8 justify-center flex-1">
                    <span className="text-sm font-medium text-gray-600 hover:text-black cursor-pointer">Features</span>
                    <span className="text-sm font-medium text-gray-600 hover:text-black cursor-pointer">Pricing</span>
                    <span className="text-sm font-medium text-gray-600 hover:text-black cursor-pointer">About</span>
                    <span className="text-sm font-medium text-gray-600 hover:text-black cursor-pointer">Contact</span>
                </nav>

                <div className="flex items-center gap-4">
                    <span className="text-sm font-medium cursor-pointer hidden sm:block">Log in</span>
                    <Element id="nav-cta" is={Button} text="Sign Up Free" size="sm" />
                </div>

            </header>
        </FreeformWrapper>
    );
};

export const NavigationBarSettings = () => {
    const { actions: { setProp }, backgroundColor } = useNode((node) => ({
        backgroundColor: node.data.props.backgroundColor,
    }));

    return (
        <div className="flex flex-col gap-4 p-4">
            <div>
                <label className="text-sm font-medium">Background Color</label>
                <input
                    type="color"
                    value={backgroundColor || "#ffffff"}
                    onChange={(e) => setProp((props: any) => props.backgroundColor = e.target.value)}
                    className="w-full mt-1 h-10 px-1 py-1 rounded cursor-pointer"
                />
            </div>
        </div>
    );
};

NavigationBar.craft = {
    displayName: "NavigationBar",
    props: {
        backgroundColor: "#ffffff",
        width: "100%", height: "70px", padding: "0px", margin: "0px",
        isAbsolute: false, x: 0, y: 0,
        zIndex: 50, opacity: 100, borderRadius: "0px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
    },
    related: {
        settings: NavigationBarSettings,
    },
};
