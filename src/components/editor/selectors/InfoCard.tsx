"use client";
import React from "react";
import { useNode, Element } from "@craftjs/core";
import { ElementWrapper } from "./ElementWrapper";
import { Container } from "./Container";
import { Heading } from "./Heading";
import { Text } from "./Text";

export const InfoCard = React.forwardRef(({
    borderColor = "#e2e8f0", href,
    x = 0, y = 0, width = "350px", height = "auto",
    mobileX, mobileY, mobileWidth, mobileHeight,
    zIndex = 1, opacity = 100, borderRadius = "0px", boxShadow = "none"
}: any, ref) => {
    return (
        <ElementWrapper
            x={x} y={y} width={width} height={height}
            mobileX={mobileX} mobileY={mobileY} mobileWidth={mobileWidth} mobileHeight={mobileHeight}
            zIndex={zIndex} opacity={opacity} borderRadius={borderRadius} boxShadow={boxShadow}
        >
            <div ref={ref as any} className="w-full h-full bg-white rounded-xl shadow-lg border p-6 flex flex-col gap-3 transition-transform hover:-translate-y-1" style={{ borderColor }}>
                <Element id="card-content" is={Container} padding="0px" canvas>
                    <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-2">
                        <span className="text-2xl">✨</span>
                    </div>
                    <Element id="card-title" is={Heading} text="Premium Feature" level={3} textAlign="left" />
                    <Element id="card-desc" is={Text} text="Unlock unparalleled performance with our state-of-the-art infrastructure." fontSize={15} textAlign="left" />
                </Element>
            </div>
        </ElementWrapper>
    );
});

export const InfoCardSettings = () => {
    const { actions: { setProp }, borderColor } = useNode((node) => ({
        borderColor: node.data.props.borderColor,
    }));

    return (
        <div className="flex flex-col gap-4 p-4">
            <div>
                <label className="text-sm font-medium">Border Color</label>
                <input
                    type="color"
                    value={borderColor || "#e2e8f0"}
                    onChange={(e) => setProp((props: any) => props.borderColor = e.target.value)}
                    className="w-full mt-1 h-10 px-1 py-1 rounded cursor-pointer"
                />
            </div>
        </div>
    );
};

(InfoCard as any).craft = {
    props: {
        borderColor: "#e2e8f0",
        x: 0, y: 0, width: "350px", height: "auto",
        mobileX: 0, mobileY: 0, mobileWidth: "350px", mobileHeight: "auto",
        zIndex: 1, opacity: 100, borderRadius: "0px", boxShadow: "none"
    },
    related: {
        settings: InfoCardSettings,
    },
};
