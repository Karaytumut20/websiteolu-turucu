"use client";
import React from "react";
import { useNode, Element } from "@craftjs/core";
import { ElementWrapper } from "./ElementWrapper";
import { Container } from "./Container";
import { Heading } from "./Heading";
import { Text } from "./Text";
import { Button } from "./Button";

export const HeroSection = React.forwardRef(({
    background = "#f8fafc", href,
    x = 0, y = 0, width = "100%", height = "auto",
    mobileX, mobileY, mobileWidth, mobileHeight,
    zIndex = 1, opacity = 100, borderRadius = "0px", boxShadow = "none"
}: any, ref) => {
    return (
        <ElementWrapper
            x={x} y={y} width={width} height={height}
            mobileX={mobileX} mobileY={mobileY} mobileWidth={mobileWidth} mobileHeight={mobileHeight}
            zIndex={zIndex} opacity={opacity} borderRadius={borderRadius} boxShadow={boxShadow}
        >
            <div ref={ref as any} className="w-full relative py-24 px-6 md:px-12 lg:px-24 rounded-2xl overflow-hidden shadow-sm" style={{ background }}>
                <Element id="hero-container" is={Container} padding="0px" canvas>
                    <Element id="hero-title" is={Heading} text="Elevate Your Vision" level={1} textAlign="center" color="#0f172a" />
                    <Element id="hero-subtitle" is={Text} text="Build stunning digital experiences with our advanced visual editor. No code required." fontSize={18} textAlign="center" />
                    <div className="flex justify-center mt-8 gap-4">
                        <Element id="hero-btn-primary" is={Button} text="Get Started" variant="default" color="#4f46e5" />
                        <Element id="hero-btn-secondary" is={Button} text="Learn More" variant="outline" />
                    </div>
                </Element>
            </div>
        </ElementWrapper>
    );
});

export const HeroSectionSettings = () => {
    const { actions: { setProp }, background } = useNode((node) => ({
        background: node.data.props.background,
    }));

    return (
        <div className="flex flex-col gap-4 p-4">
            <div>
                <label className="text-sm font-medium">Background Theme</label>
                <input
                    type="color"
                    value={background || "#f8fafc"}
                    onChange={(e) => setProp((props: any) => props.background = e.target.value)}
                    className="w-full mt-1 h-10 px-1 py-1 rounded border-none cursor-pointer"
                />
            </div>
        </div>
    );
};

(HeroSection as any).craft = {
    props: {
        background: "#f8fafc",
        x: 0, y: 0, width: "100%", height: "auto",
        mobileX: 0, mobileY: 0, mobileWidth: "100%", mobileHeight: "auto",
        zIndex: 1, opacity: 100, borderRadius: "0px", boxShadow: "none"
    },
    related: {
        settings: HeroSectionSettings,
    },
};
