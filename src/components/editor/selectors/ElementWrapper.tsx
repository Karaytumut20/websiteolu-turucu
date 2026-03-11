"use client";
import React, { useEffect, useState } from "react";
import { Rnd } from "react-rnd";
import { useNode } from "@craftjs/core";
import { useDevice } from "../DeviceContext";

export interface CommonElementProps {
    x?: number;
    y?: number;
    width?: string | number;
    height?: string | number;
    mobileX?: number;
    mobileY?: number;
    mobileWidth?: string | number;
    mobileHeight?: string | number;
    zIndex?: number;
    opacity?: number;
    borderRadius?: string;
    boxShadow?: string;
}

export interface ElementWrapperProps extends CommonElementProps {
    children?: React.ReactNode;
}

export const ElementWrapper = ({
    children,
    x, y, width, height,
    mobileX, mobileY, mobileWidth, mobileHeight,
    zIndex, opacity = 100, borderRadius = "0px", boxShadow = "none"
}: ElementWrapperProps) => {
    const { isSelected, isHovered, name, actions: { setProp }, connectors: { connect } } = useNode((node) => ({
        isSelected: node.events.selected,
        isHovered: node.events.hovered,
        name: node.data.displayName || node.data.name,
    }));
    const { device } = useDevice();
    const [isManipulating, setIsManipulating] = useState(false);

    const activeX = (device === 'mobile' && mobileX !== undefined) ? mobileX : (x || 0);
    const activeY = (device === 'mobile' && mobileY !== undefined) ? mobileY : (y || 0);
    const activeWidth = (device === 'mobile' && mobileWidth !== undefined) ? mobileWidth : (width || "auto");
    const activeHeight = (device === 'mobile' && mobileHeight !== undefined) ? mobileHeight : (height || "auto");

    const [position, setPosition] = useState({ x: activeX, y: activeY });
    const [size, setSize] = useState({ width: activeWidth, height: activeHeight });

    useEffect(() => {
        if (!isManipulating) {
            setPosition({ x: activeX, y: activeY });
        }
    }, [activeX, activeY, isManipulating]);

    useEffect(() => {
        if (!isManipulating) {
            setSize({ width: activeWidth, height: activeHeight });
        }
    }, [activeWidth, activeHeight, device, isManipulating]);

    const showIndicator = isSelected || isHovered;

    return (
        <Rnd
            size={size}
            position={position}
            onDragStart={() => setIsManipulating(true)}
            onDrag={(e, d) => setPosition({ x: d.x, y: d.y })}
            onDragStop={(e, d) => {
                setIsManipulating(false);
                setProp((props: any) => {
                    if (device === 'mobile') {
                        props.mobileX = d.x;
                        props.mobileY = d.y;
                    } else {
                        props.x = d.x;
                        props.y = d.y;
                    }
                });
            }}
            onResizeStart={() => setIsManipulating(true)}
            onResize={(e, direction, ref, delta, position) => {
                setSize({ width: ref.style.width, height: ref.style.height });
                setPosition(position);
            }}
            onResizeStop={(e, direction, ref, delta, position) => {
                setIsManipulating(false);
                setProp((props: any) => {
                    if (device === 'mobile') {
                        props.mobileWidth = ref.style.width;
                        props.mobileHeight = ref.style.height;
                        props.mobileX = position.x;
                        props.mobileY = position.y;
                    } else {
                        props.width = ref.style.width;
                        props.height = ref.style.height;
                        props.x = position.x;
                        props.y = position.y;
                    }
                });
            }}
            bounds="parent"
            disableDragging={!isSelected}
            enableResizing={isSelected ? {
                top: true, right: true, bottom: true, left: true,
                topRight: true, bottomRight: true, bottomLeft: true, topLeft: true
            } : false}
            style={{
                zIndex: isSelected ? 100 : (zIndex || 1),
                position: "absolute",
                opacity: (opacity !== undefined ? opacity : 100) / 100,
                borderRadius: borderRadius || "0px",
                boxShadow: boxShadow || "none",
            }}
            className={`
                ${!isManipulating ? "transition-all duration-300 ease-in-out" : ""} 
                ${showIndicator ? "border-2 border-primary border-dashed !z-[100]" : "border-2 border-transparent"}
                relative group
            `}
        >
            {showIndicator && (
                <div className="absolute -top-[22px] -left-0.5 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-t-sm uppercase tracking-wider whitespace-nowrap z-[101]">
                    {name}
                </div>
            )}
            
            <div ref={connect as any} className="w-full h-full">
                {children}
            </div>
        </Rnd>
    );
};
