"use client";
import React, { useEffect, useState } from "react";
import { Rnd } from "react-rnd";
import { useNode } from "@craftjs/core";
import { useDevice } from "../DeviceContext";

export const ElementWrapper = ({
    children,
    x, y, width, height,
    mobileX, mobileY, mobileWidth, mobileHeight,
    zIndex, opacity = 100, borderRadius = "0px", boxShadow = "none"
}: any) => {
    const { isSelected, actions: { setProp }, connectors: { connect } } = useNode((node) => ({
        isSelected: node.events.selected,
    }));
    const { device } = useDevice();

    const activeX = device === 'mobile' && mobileX !== undefined ? mobileX : x;
    const activeY = device === 'mobile' && mobileY !== undefined ? mobileY : y;
    const activeWidth = device === 'mobile' && mobileWidth !== undefined ? mobileWidth : width;
    const activeHeight = device === 'mobile' && mobileHeight !== undefined ? mobileHeight : height;

    // Local state to ensure smooth dragging without waiting for Craft state updates
    const [position, setPosition] = useState({ x: activeX || 0, y: activeY || 0 });
    const [size, setSize] = useState({ width: activeWidth || "auto", height: activeHeight || "auto" });

    useEffect(() => {
        setPosition({ x: activeX || 0, y: activeY || 0 });
    }, [activeX, activeY]);

    useEffect(() => {
        setSize({ width: activeWidth || "auto", height: activeHeight || "auto" });
    }, [activeWidth, activeHeight, device]);

    return (
        <Rnd
            size={size}
            position={position}
            onDrag={(e, d) => {
                setPosition({ x: d.x, y: d.y });
            }}
            onDragStop={(e, d) => {
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
            onResize={(e, direction, ref, delta, position) => {
                setSize({ width: ref.style.width, height: ref.style.height });
                setPosition(position);
            }}
            onResizeStop={(e, direction, ref, delta, position) => {
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
            disableDragging={!isSelected} // Only allow drag when clicked/selected
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
            className={isSelected ? "border-2 border-indigo-500 border-dashed" : ""}
        >
            <div ref={connect as any} className="w-full h-full">
                {children}
            </div>
        </Rnd>
    );
};
