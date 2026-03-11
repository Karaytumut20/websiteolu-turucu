import React from "react";

export interface SerializedNode {
    type: string | { resolvedName: string };
    isCanvas: boolean;
    props: Record<string, any>;
    displayName: string;
    custom: Record<string, any>;
    hidden: boolean;
    nodes: string[];
    linkedNodes: Record<string, string>;
    parent: string | null;
}

export type SerializedNodes = Record<string, SerializedNode>;

// Mapping Craft.js resolvedNames to standard HTML tags or internal Server Components
const componentMap: Record<string, any> = {
    Container: "div",
    Text: "div",
    Button: "button",
    Heading: "div", // We'll map to specific h1-h6 based on props.level below
    Image: "img",
    HeroSection: "div",
    InfoCard: "div",
    PricingTable: "div",
    NavigationBar: "header",
};

export function DynamicRenderer({ nodes, rootNodeId = "ROOT" }: { nodes: SerializedNodes; rootNodeId?: string }) {
    if (!nodes || !nodes[rootNodeId]) {
        return null;
    }

    const node = nodes[rootNodeId];
    const { type, props, nodes: childrenIds } = node;

    // Resolve component type
    let ComponentType = typeof type === "string" ? type : type.resolvedName;

    if (componentMap[ComponentType]) {
        ComponentType = componentMap[ComponentType];
    } else if (!ComponentType) {
        ComponentType = "div";
    }

    // Handle specific prop mapping for standard HTML tags to avoid React hydration/DOM errors
    const processedProps: any = { ...props };

    // Universal absolute positioning for elements managed by Wix-style ElementWrapper
    if (props.x !== undefined || props.y !== undefined) {
        // Map positional props to CSS variables for responsive design
        const mWidth = props.mobileWidth !== undefined
            ? (typeof props.mobileWidth === 'number' ? `${props.mobileWidth}px` : props.mobileWidth)
            : (typeof props.width === 'number' ? `${props.width}px` : props.width || "auto");

        const mHeight = props.mobileHeight !== undefined
            ? (typeof props.mobileHeight === 'number' ? `${props.mobileHeight}px` : props.mobileHeight)
            : (typeof props.height === 'number' ? `${props.height}px` : props.height || "auto");

        processedProps.style = {
            ...processedProps.style,
            position: "absolute",
            '--x': `${props.x || 0}px`,
            '--y': `${props.y || 0}px`,
            '--width': typeof props.width === 'number' ? `${props.width}px` : props.width || "auto",
            '--height': typeof props.height === 'number' ? `${props.height}px` : props.height || "auto",

            // Mobile variables (fallback to desktop if mobile not defined)
            '--m-x': props.mobileX !== undefined ? `${props.mobileX}px` : `${props.x || 0}px`,
            '--m-y': props.mobileY !== undefined ? `${props.mobileY}px` : `${props.y || 0}px`,
            '--m-width': mWidth,
            '--m-height': mHeight,

            zIndex: props.zIndex || 1,
            opacity: (props.opacity !== undefined ? props.opacity : 100) / 100,
            borderRadius: props.borderRadius || "0px",
            boxShadow: props.boxShadow || "none",
        } as React.CSSProperties;

        // Add the responsive CSS class
        processedProps.className = `${processedProps.className || ""} craft-node-renderer`.trim();

        // Clean up custom positioning props so they don't get passed to DOM elements
        delete processedProps.x;
        delete processedProps.y;
        delete processedProps.width;
        delete processedProps.height;
        delete processedProps.mobileX;
        delete processedProps.mobileY;
        delete processedProps.mobileWidth;
        delete processedProps.mobileHeight;
        delete processedProps.zIndex;
        delete processedProps.opacity;
        delete processedProps.borderRadius;
        delete processedProps.boxShadow;
        delete processedProps.href; // Added href cleanup
    }

    // Clean up undefined/null values or non-standard DOM props
    if (ComponentType === "div" && (typeof type !== "string" && type?.resolvedName === "Container")) {
        processedProps.style = {
            background: props.background,
            padding: props.padding,
            margin: props.margin,
        };
        processedProps.className = "flex flex-col w-full";
        // remove non-standard DOM props
        delete processedProps.background;
        delete processedProps.padding;
        delete processedProps.margin;
    }

    const resolvedName = typeof type === "string" ? type : type?.resolvedName;

    if (resolvedName === "Text") {
        processedProps.style = {
            fontSize: `${props.fontSize}px`,
            textAlign: props.textAlign,
        };
        processedProps.dangerouslySetInnerHTML = { __html: props.text || "" };
        delete processedProps.text;
        delete processedProps.fontSize;
        delete processedProps.textAlign;
    }

    if (resolvedName === "Heading") {
        ComponentType = `h${props.level || 2}`;
        processedProps.style = { textAlign: props.textAlign, color: props.color };
        processedProps.dangerouslySetInnerHTML = { __html: props.text || "" };
        // Simplified Tailwind classes for mapping
        const sizes = {
            1: "text-4xl font-extrabold tracking-tight lg:text-5xl",
            2: "text-3xl font-semibold tracking-tight first:mt-0",
            3: "text-2xl font-semibold tracking-tight",
            4: "text-xl font-semibold tracking-tight",
            5: "text-lg font-semibold tracking-tight",
            6: "text-base font-semibold tracking-tight",
        };
        processedProps.className = sizes[(props.level as 1 | 2 | 3 | 4 | 5 | 6) || 2];
        delete processedProps.text;
        delete processedProps.level;
        delete processedProps.textAlign;
        delete processedProps.color;
    }

    if (resolvedName === "Button") {
        processedProps.style = { backgroundColor: props.variant === "default" ? props.color : undefined };
        processedProps.className = "inline-flex items-center justify-center rounded-md font-medium h-10 px-4 py-2 text-white"; // Simplified
        processedProps.children = props.text;
        delete processedProps.text;
        delete processedProps.size;
        delete processedProps.variant;
        delete processedProps.color;
    }

    if (resolvedName === "Image") {
        processedProps.style = { objectFit: props.objectFit, width: "100%", height: "100%" };
        // Wrap inside a div to maintain width/height
        const wrapperStyle = { width: props.width, height: props.height };
        delete processedProps.width;
        delete processedProps.height;
        delete processedProps.objectFit;

        return React.createElement(
            "div",
            { style: wrapperStyle, className: "inline-block" },
            React.createElement("img", processedProps)
        );
    }

    // Render children recursively
    let renderedChildren = null;
    if (childrenIds && childrenIds.length > 0) {
        renderedChildren = childrenIds.map((childId: string) => (
            <DynamicRenderer key={childId} nodes={nodes} rootNodeId={childId} />
        ));
    } else if (processedProps.children) {
        renderedChildren = processedProps.children;
        delete processedProps.children;
    }

    if (processedProps.dangerouslySetInnerHTML) {
        renderedChildren = null;
    }

    if (resolvedName === "HeroSection") {
        processedProps.className = "w-full relative py-24 px-6 md:px-12 lg:px-24 rounded-2xl overflow-hidden shadow-sm";
        processedProps.style = { ...processedProps.style, background: props.background };
        delete processedProps.background;
    }

    if (resolvedName === "InfoCard") {
        processedProps.className = "w-full h-full bg-white rounded-xl shadow-lg border p-6 flex flex-col gap-3 transition-transform hover:-translate-y-1";
        processedProps.style = { ...processedProps.style, borderColor: props.borderColor };
        delete processedProps.borderColor;
    }

    if (resolvedName === "PricingTable") {
        processedProps.className = "w-full py-16 px-4 bg-gray-50 rounded-2xl";
        // inner content is hydrated by DynamicRenderer recursing into nodes
    }

    if (resolvedName === "NavigationBar") {
        processedProps.className = "w-full h-full flex items-center justify-between px-6 md:px-10";
        processedProps.style = { ...processedProps.style, backgroundColor: props.backgroundColor };
        delete processedProps.backgroundColor;
    }

    const renderedElement = React.createElement(ComponentType, processedProps, renderedChildren);

    // If there's an href, wrap the entire element in an anchor tag so it becomes clickable
    if (props.href) {
        return (
            <a href={props.href} style={{ position: "absolute", zIndex: props.zIndex || 1, left: `${props.x || 0}px`, top: `${props.y || 0}px` }}>
                {React.cloneElement(renderedElement as React.ReactElement<any>, {
                    style: { ...processedProps.style, position: "relative", left: 0, top: 0, zIndex: 'auto' }
                })}
            </a>
        );
    }

    return renderedElement;
}
