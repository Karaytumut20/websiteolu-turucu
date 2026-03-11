"use client";
import React from 'react';
import { useEditor, Element } from '@craftjs/core';
import { Container } from './selectors/Container';
import { Text } from './selectors/Text';
import { Button } from './selectors/Button';
import { Image } from './selectors/Image';
import { Heading } from './selectors/Heading';
import { HeroSection } from './selectors/HeroSection';
import { InfoCard } from './selectors/InfoCard';
import { PricingTable } from './selectors/PricingTable';
import { NavigationBar } from './selectors/NavigationBar';
import { Type, BoxSelect, SquareFunction, Image as ImageIcon, Heading1, LayoutTemplate, PanelTop, CreditCard, Navigation } from 'lucide-react';

export const Toolbox = () => {
    const { connectors } = useEditor();

    const tools = [
        {
            icon: <BoxSelect size={20} className="text-gray-600 mb-1" />,
            name: "Container",
            element: <Element is={Container} padding="20px" canvas />
        },
        {
            icon: <Heading1 size={20} className="text-gray-600 mb-1" />,
            name: "Heading",
            element: <Heading text="New Heading" />
        },
        {
            icon: <Type size={20} className="text-gray-600 mb-1" />,
            name: "Text",
            element: <Text text="New Text Block" />
        },
        {
            icon: <SquareFunction size={20} className="text-gray-600 mb-1" />,
            name: "Button",
            element: <Button text="Click Me" />
        },
        {
            icon: <ImageIcon size={20} className="text-gray-600 mb-1" />,
            name: "Image",
            element: <Image />
        },
        {
            icon: <PanelTop size={20} className="text-indigo-600 mb-1" />,
            name: "Hero Section",
            element: <HeroSection />
        },
        {
            icon: <LayoutTemplate size={20} className="text-indigo-600 mb-1" />,
            name: "Info Card",
            element: <InfoCard />
        },
        {
            icon: <CreditCard size={20} className="text-indigo-600 mb-1" />,
            name: "Pricing",
            element: <PricingTable />
        },
        {
            icon: <Navigation size={20} className="text-indigo-600 mb-1" />,
            name: "Navbar",
            element: <NavigationBar />
        }
    ];

    return (
        <div className="w-64 border-r bg-background flex flex-col h-full overflow-y-auto">
            <div className="p-4 border-b">
                <h2 className="text-lg font-semibold tracking-tight">Add Elements</h2>
                <p className="text-xs text-muted-foreground mt-1">Drag and drop into the canvas</p>
            </div>

            <div className="p-4">
                <div className="grid grid-cols-2 gap-3">
                    {tools.map((tool, idx) => (
                        <button
                            key={idx}
                            ref={(ref) => {
                                if (ref) connectors.create(ref, tool.element);
                            }}
                            className="flex flex-col items-center justify-center p-3 border rounded-lg bg-card text-card-foreground shadow-sm hover:border-indigo-500 hover:shadow-md transition-all cursor-grab"
                        >
                            {tool.icon}
                            <span className="text-xs font-medium">{tool.name}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};
