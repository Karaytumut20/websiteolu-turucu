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
            icon: <BoxSelect size={16} className="text-foreground" />,
            name: "Container",
            element: <Element is={Container} padding="20px" canvas />
        },
        {
            icon: <Heading1 size={16} className="text-foreground" />,
            name: "Heading",
            element: <Heading text="New Heading" />
        },
        {
            icon: <Type size={16} className="text-foreground" />,
            name: "Text",
            element: <Text text="New Text Block" />
        },
        {
            icon: <SquareFunction size={16} className="text-foreground" />,
            name: "Button",
            element: <Button text="Click Me" />
        },
        {
            icon: <ImageIcon size={16} className="text-foreground" />,
            name: "Image",
            element: <Image />
        },
        {
            icon: <PanelTop size={16} className="text-primary" />,
            name: "Hero Section",
            element: <HeroSection />
        },
        {
            icon: <LayoutTemplate size={16} className="text-primary" />,
            name: "Info Card",
            element: <InfoCard />
        },
        {
            icon: <CreditCard size={16} className="text-primary" />,
            name: "Pricing",
            element: <PricingTable />
        },
        {
            icon: <Navigation size={16} className="text-primary" />,
            name: "Navbar",
            element: <NavigationBar />
        }
    ];

    return (
        <div className="w-[260px] border-r bg-sidebar text-sidebar-foreground flex flex-col h-full overflow-y-auto">
            <div className="p-4 border-b bg-sidebar">
                <h2 className="text-sm font-semibold tracking-tight">Components</h2>
                <p className="text-[11px] text-muted-foreground mt-0.5">Drag and drop to canvas</p>
            </div>

            <div className="p-4">
                <div className="grid grid-cols-2 gap-2">
                    {tools.map((tool, idx) => (
                        <button
                            key={idx}
                            ref={(ref) => {
                                if (ref) connectors.create(ref, tool.element);
                            }}
                            className="flex flex-col items-center justify-center p-3 border border-transparent rounded-md bg-transparent text-sidebar-foreground hover:bg-accent hover:text-accent-foreground transition-all cursor-grab active:cursor-grabbing group"
                        >
                            <div className="p-2 bg-background border shadow-sm rounded-md group-hover:border-primary/50 transition-colors mb-2">
                                {tool.icon}
                            </div>
                            <span className="text-[11px] font-medium text-muted-foreground group-hover:text-foreground">{tool.name}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};
