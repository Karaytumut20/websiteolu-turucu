"use client";
import React, { useRef, useEffect, useState } from "react";
import { useNode, useEditor } from "@craftjs/core";
import { Rnd } from "react-rnd";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePreview } from "../PreviewContext";

export interface CommonElementProps {
    x?: number;
    y?: number;
    width?: string | number;
    height?: string | number;
    zIndex?: number;
    padding?: string;
    margin?: string;
    opacity?: number;
    borderRadius?: string;
    boxShadow?: string;
    isAbsolute?: boolean; // Kept for backwards compatibility but everything is absolute now
    linkUrl?: string;
    linkTarget?: string;
    animationType?: string;
    animationDelay?: number;
}

export interface FreeformProps extends CommonElementProps {
    children?: React.ReactNode;
}

export const FreeformWrapper = ({
    children,
    x = 0,
    y = 0,
    width = "auto",
    height = "auto",
    zIndex = 1,
    padding,
    margin,
    opacity = 100,
    borderRadius = "0px",
    boxShadow = "none",
    linkUrl = "",
    linkTarget = "_self",
    animationType = "none",
    animationDelay = 0,
}: FreeformProps) => {
    const { id } = useNode();
    const { actions, selected, isDragging, query } = useEditor((state) => ({
        selected: state.events.selected.has(id),
        isDragging: state.events.dragged !== null,
    }));
    const { isPreview } = usePreview();

    const rndRef = useRef<any>(null);

    const [localPos, setLocalPos] = useState({ x, y });
    const [localSize, setLocalSize] = useState({ width, height });

    useEffect(() => {
        if (!isDragging) setLocalPos({ x, y });
    }, [x, y, isDragging]);

    useEffect(() => {
        if (!isDragging) setLocalSize({ width, height });
    }, [width, height, isDragging]);



    // Initial Drop Sizing & Positioning Logic for newly spawned Items from the Toolbox
    React.useEffect(() => {
        // Only run once on mount if it's explicitly spawned at 0,0 
        if (x === 0 && y === 0) {
            const el = rndRef.current?.resizableElement?.current;
            if (el && el.parentElement) {
                // Ensure the parent container has relative or absolute positioning
                if (window.getComputedStyle(el.parentElement).position === 'static') {
                    el.parentElement.style.position = 'relative';
                }
                
                const parentRect = el.parentElement.getBoundingClientRect();
                const mX = (window as any).lastCraftMouseX;
                const mY = (window as any).lastCraftMouseY;
                
                if (mX !== undefined && mY !== undefined) {
                    let dropX = mX - parentRect.left - 20;
                    let dropY = mY - parentRect.top - 20;
                    
                    dropX = Math.max(0, Math.round(dropX / 10) * 10);
                    dropY = Math.max(0, Math.round(dropY / 10) * 10);
                    
                    // Allow Craft's DOM tree to settle before updating props
                    setTimeout(() => {
                        actions.setProp(id, (p: any) => {
                            p.x = dropX;
                            p.y = dropY;
                        });
                    }, 10);
                }
            }
        }
    }, []); // Run ONCE on mount

    // Update Craft state on drag stop
    const onDragStop = (e: any, d: any) => {
        actions.setProp(id, (props: any) => {
            props.x = d.x;
            props.y = d.y;
        });
    };

    const onDragStart = (e: any, d: any) => {
        // Defer selection so it doesn't interrupt the react-rnd drag lock
        setTimeout(() => {
            actions.selectNode(id);
        }, 0);
    };

    const onDrag = (e: any, d: any) => {
        setLocalPos({ x: d.x, y: d.y });
    };

    const onResize = (e: any, direction: any, ref: any, delta: any, position: any) => {
        setLocalSize({ width: ref.style.width, height: ref.style.height });
        setLocalPos(position);
    };

    // Update Craft state on resize stop
    const onResizeStop = (e: any, direction: any, ref: any, delta: any, position: any) => {
        actions.setProp(id, (props: any) => {
            props.width = ref.style.width;
            props.height = ref.style.height;
            props.x = position.x;
            props.y = position.y;
        });
    };
    
    // Nudge with arrow keys when selected
    useEffect(() => {
        if (!selected) return;
        
        const handleKeyDown = (e: KeyboardEvent) => {
            if (["INPUT", "TEXTAREA", "SELECT"].includes((e.target as HTMLElement).tagName)) return;
            
            let dx = 0;
            let dy = 0;
            const step = e.shiftKey ? 10 : 1;
            
            switch(e.key) {
                case "ArrowUp": dy = -step; break;
                case "ArrowDown": dy = step; break;
                case "ArrowLeft": dx = -step; break;
                case "ArrowRight": dx = step; break;
                default: return;
            }
            
            e.preventDefault();
            actions.setProp(id, (props: any) => {
                props.x = (props.x || 0) + dx;
                props.y = (props.y || 0) + dy;
            });
        };
        
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selected, actions, id]);

    const innerContent = (
        <div 
            className="w-full h-full relative flex z-0"
            style={{ 
                cursor: selected && !isPreview ? "move" : (linkUrl && isPreview ? "pointer" : "inherit"),
                pointerEvents: isDragging && !selected ? "none" : "auto" 
            }}
        >
            {children}
            {linkUrl && isPreview && (
                <Link href={linkUrl} target={linkTarget} className="absolute inset-0 z-10" />
            )}
        </div>
    );

    let animatedContent = innerContent;
    if (animationType !== "none" && isPreview) {
        let initial = {};
        let whileInView = { opacity: 1, y: 0, x: 0, scale: 1 };
        
        switch (animationType) {
            case "fade":
                initial = { opacity: 0 };
                break;
            case "slide-up":
                initial = { opacity: 0, y: 50 };
                break;
            case "zoom-in":
                initial = { opacity: 0, scale: 0.8 };
                break;
        }

        animatedContent = (
            <motion.div
                initial={initial}
                whileInView={whileInView}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: animationDelay }}
                className="w-full h-full"
            >
                {innerContent}
            </motion.div>
        );
    }

    return (
        <Rnd
            ref={rndRef}
            position={localPos}
            size={localSize}
            onDragStart={onDragStart}
            onDrag={onDrag}
            onDragStop={onDragStop}
            onResize={onResize}
            onResizeStop={onResizeStop}
            cancel=".content-editable-block, input, textarea, select"
            enableResizing={!isPreview ? {
                top: true, right: true, bottom: true, left: true,
                topRight: true, bottomRight: true, bottomLeft: true, topLeft: true
            } : false}
            disableDragging={isPreview}
            style={{
                zIndex,
                position: "absolute",
                padding,
                margin,
                opacity: (opacity !== undefined ? opacity : 100) / 100,
                borderRadius: borderRadius || "0px",
                boxShadow: boxShadow || "none",
            }}
            className={`craft-freeform-element ${selected && !isPreview ? 'ring-1 ring-blue-500 shadow-lg z-50' : 'hover:ring-1 hover:ring-blue-300'} transition-all`}
        >
            {animatedContent}
        </Rnd>
    );
};
