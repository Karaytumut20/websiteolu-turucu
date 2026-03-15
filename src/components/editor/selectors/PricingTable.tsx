"use client";
import React from "react";
import { useNode, Element } from "@craftjs/core";
import { FreeformWrapper } from "./FreeformWrapper";
import { Container } from "./Container";
import { Heading } from "./Heading";
import { Text } from "./Text";
import { Button } from "./Button";

export const PricingTable = ({
    href,
    width = "100%", height = "auto", padding, margin,
    isAbsolute = true, x = 0, y = 0,
    zIndex = 1, opacity = 100, borderRadius = "0px", boxShadow = "none"
}: any) => {
    return (
        <FreeformWrapper
            width={width} height={height} padding={padding} margin={margin}
            isAbsolute={isAbsolute} x={x} y={y}
            zIndex={zIndex} opacity={opacity} borderRadius={borderRadius} boxShadow={boxShadow}
        >
            <div className="w-full py-16 px-4 bg-gray-50 rounded-2xl">
                <Element id="pricing-wrapper" is={Container} padding="0px" background="transparent" canvas>
                    <Element id="pricing-header" is={Heading} text="Simple, transparent pricing" level={2} textAlign="center" />
                    <Element id="pricing-sub" is={Text} text="No hidden fees. No surprise charges." fontSize={16} textAlign="center" />

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-12 px-4">
                        {/* Basic Plan */}
                        <div className="bg-white rounded-2xl shadow-sm border p-8 flex flex-col items-center">
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Basic</h3>
                            <div className="text-4xl font-bold mb-4">$9<span className="text-lg font-normal text-gray-500">/mo</span></div>
                            <ul className="text-sm text-gray-600 space-y-3 mb-8 w-full">
                                <li className="flex gap-2">✓ 1 Project</li>
                                <li className="flex gap-2">✓ Basic Analytics</li>
                                <li className="flex gap-2 text-gray-400">✗ Priority Support</li>
                            </ul>
                            <div className="mt-auto w-full">
                                <Element id="btn-basic" is={Button} text="Start Basic" variant="outline" color="#4f46e5" width="100%" />
                            </div>
                        </div>

                        {/* Pro Plan */}
                        <div className="bg-white rounded-2xl shadow-xl border-2 border-indigo-500 p-8 flex flex-col items-center relative transform md:-translate-y-4">
                            <div className="absolute top-0 transform -translate-y-1/2 bg-indigo-500 text-white px-3 py-1 rounded-full text-xs font-semibold">Most Popular</div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Pro</h3>
                            <div className="text-4xl font-bold mb-4">$29<span className="text-lg font-normal text-gray-500">/mo</span></div>
                            <ul className="text-sm text-gray-600 space-y-3 mb-8 w-full">
                                <li className="flex gap-2">✓ 10 Projects</li>
                                <li className="flex gap-2">✓ Advanced Analytics</li>
                                <li className="flex gap-2">✓ Priority Support</li>
                            </ul>
                            <div className="mt-auto w-full">
                                <Element id="btn-pro" is={Button} text="Start Pro" variant="default" color="#4f46e5" width="100%" />
                            </div>
                        </div>

                        {/* Enterprise Plan */}
                        <div className="bg-white rounded-2xl shadow-sm border p-8 flex flex-col items-center">
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Enterprise</h3>
                            <div className="text-4xl font-bold mb-4">$99<span className="text-lg font-normal text-gray-500">/mo</span></div>
                            <ul className="text-sm text-gray-600 space-y-3 mb-8 w-full">
                                <li className="flex gap-2">✓ Unlimited Projects</li>
                                <li className="flex gap-2">✓ Custom Analytics</li>
                                <li className="flex gap-2">✓ 24/7 Dedicated Support</li>
                            </ul>
                            <div className="mt-auto w-full">
                                <Element id="btn-ent" is={Button} text="Contact Sales" variant="outline" color="#4f46e5" width="100%" />
                            </div>
                        </div>
                    </div>
                </Element>
            </div>
        </FreeformWrapper>
    );
};

export const PricingTableSettings = () => {
    return (
        <div className="flex flex-col gap-4 p-4 text-sm text-gray-500">
            <p>Pricing table content is currently fixed in this block. To edit text, select the inner texts directly.</p>
        </div>
    );
};

PricingTable.craft = {
    displayName: "PricingTable",
    props: {
        width: "100%", height: "auto", padding: "0px", margin: "0px",
        isAbsolute: false, x: 0, y: 0,
        zIndex: 1, opacity: 100, borderRadius: "0px", boxShadow: "none"
    },
    related: {
        settings: PricingTableSettings,
    },
};
