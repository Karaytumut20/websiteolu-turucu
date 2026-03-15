"use client";
import React from 'react';
import { useEditor, Element } from '@craftjs/core';
import { Type, BoxSelect, SquareFunction, Image as ImageIcon, Heading1, LayoutTemplate, PanelTop, CreditCard, Navigation, Youtube, Star, Minus, PanelBottom, MessageSquareQuote, LayoutGrid, Code, LayoutList } from 'lucide-react';

export const Toolbox = () => {
    const { connectors } = useEditor();

    const tools = [
        {
            icon: <BoxSelect size={16} className="text-foreground" />,
            name: "Container",
            element: <Element is="Container" padding="20px" canvas isAbsolute={true} />
        },
        {
            icon: <Heading1 size={16} className="text-foreground" />,
            name: "Heading",
            element: <Element is="Heading" text="New Heading" isAbsolute={true} />
        },
        {
            icon: <Type size={16} className="text-foreground" />,
            name: "Text",
            element: <Element is="Text" text="New Text Block" isAbsolute={true} />
        },
        {
            icon: <SquareFunction size={16} className="text-foreground" />,
            name: "Button",
            element: <Element is="Button" text="Click Me" isAbsolute={true} />
        },
        {
            icon: <ImageIcon size={16} className="text-foreground" />,
            name: "Image",
            element: <Element is="Image" isAbsolute={true} />
        },
        {
            icon: <PanelTop size={16} className="text-primary" />,
            name: "Hero Section",
            element: <Element is="HeroSection" isAbsolute={true} />
        },
        {
            icon: <LayoutTemplate size={16} className="text-primary" />,
            name: "Info Card",
            element: <Element is="InfoCard" isAbsolute={true} />
        },
        {
            icon: <CreditCard size={16} className="text-primary" />,
            name: "Pricing",
            element: <Element is="PricingTable" isAbsolute={true} />
        },
        {
            icon: <Navigation size={16} className="text-primary" />,
            name: "Navbar",
            element: <Element is="NavigationBar" isAbsolute={true} />
        },
        {
            icon: <Youtube size={16} className="text-red-500" />,
            name: "Video",
            element: <Element is="Video" isAbsolute={true} />
        },
        {
            icon: <Star size={16} className="text-amber-500" />,
            name: "Icon",
            element: <Element is="Icon" isAbsolute={true} />
        },
        {
            icon: <Minus size={16} className="text-gray-500" />,
            name: "Divider",
            element: <Element is="Divider" isAbsolute={true} />
        },
        {
            icon: <MessageSquareQuote size={16} className="text-purple-500" />,
            name: "Reviews",
            element: <Element is="Testimonials" isAbsolute={true} />
        },
        {
            icon: <LayoutGrid size={16} className="text-blue-400" />,
            name: "Gallery",
            element: <Element is="Gallery" isAbsolute={true} />
        },
        {
            icon: <Code size={16} className="text-pink-500" />,
            name: "Custom HTML",
            element: <Element is="CustomHTML" isAbsolute={true} />
        },
        {
            icon: <LayoutList size={16} className="text-emerald-500" />,
            name: "Collection",
            element: <Element is="CollectionList" isAbsolute={true} />
        },
        {
            icon: <PanelBottom size={16} className="text-slate-800 dark:text-gray-300" />,
            name: "Footer",
            element: <Element is="Footer" isAbsolute={true} />
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
