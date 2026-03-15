import React from "react";
import { useNode, useEditor } from "@craftjs/core";

export interface CommonElementProps {
    // Relative Flexbox/Grid properties
    padding?: string;
    margin?: string;
    width?: string | number;
    height?: string | number;
    // Absolute layout properties (Hybrid layout)
    isAbsolute?: boolean; 
    x?: number;
    y?: number;
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
    width = "auto", height = "auto",
    padding, margin,
    isAbsolute = false,
    x = 0, y = 0,
    zIndex, opacity = 100, borderRadius = "0px", boxShadow = "none"
}: ElementWrapperProps) => {
    const { id } = useNode();
    const { connectors: { connect, drag } } = useNode();
    const { isDragging, actions, query } = useEditor((state) => ({
        isDragging: state.events.dragged !== null,
    }));

    const domRef = React.useRef<HTMLDivElement | null>(null);

    // Initial Drop Sizing & Positioning Logic for newly spawned Absolute Items from the Toolbox
    React.useEffect(() => {
        // Only run once on mount if it's explicitly spawned as absolute at 0,0 
        if (isAbsolute && x === 0 && y === 0) {
            const el = domRef.current;
            if (el && el.parentElement) {
                // Ensure the parent container has relative or absolute positioning
                if (window.getComputedStyle(el.parentElement).position === 'static') {
                    el.parentElement.style.position = 'relative';
                }
                
                const parentRect = el.parentElement.getBoundingClientRect();
                const mX = (window as any).lastCraftMouseX;
                const mY = (window as any).lastCraftMouseY;
                
                if (mX !== undefined && mY !== undefined) {
                    // Calculate drop position relative to parent
                    // We offset by 20px so the top-left corner is slightly above the mouse for better visual grounding
                    let dropX = mX - parentRect.left - 20;
                    let dropY = mY - parentRect.top - 20;
                    
                    // Snap to grid
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

    // Freeform XY Dragging Logic
    const handlePointerDown = (e: React.PointerEvent) => {
        if (!isAbsolute) return;
        // Don't drag if clicking inside a button, input, or text explicitly (unless holding a modifier, but simple for now)
        if (["BUTTON", "INPUT", "TEXTAREA", "SELECT", "OPTION"].includes((e.target as HTMLElement).tagName)) {
            return;
        }
        
        // Prevent default interactions that might interrupt pointer capture
        e.stopPropagation();
        e.currentTarget.setPointerCapture(e.pointerId);

        const startMouseX = e.clientX;
        const startMouseY = e.clientY;
        const startNodeX = x;
        const startNodeY = y;

        const onPointerMove = (moveEv: PointerEvent) => {
            let newX = startNodeX + (moveEv.clientX - startMouseX);
            let newY = startNodeY + (moveEv.clientY - startMouseY);

            // Snapping to grid (Grid size: 10px)
            const gridSize = 10;
            if (!moveEv.shiftKey) { // Hold shift to disable snapping
                newX = Math.round(newX / gridSize) * gridSize;
                newY = Math.round(newY / gridSize) * gridSize;
            }

            // Immediately update the Craft node properties
            actions.setProp(id, (props: any) => {
                props.x = newX;
                props.y = newY;
            });
        };

        const onPointerUp = (upEv: PointerEvent) => {
            const target = upEv.currentTarget as HTMLElement;
            if (target && target.releasePointerCapture) {
                target.releasePointerCapture(upEv.pointerId);
            }
            window.removeEventListener("pointermove", onPointerMove);
            window.removeEventListener("pointerup", onPointerUp);
        };

        window.addEventListener("pointermove", onPointerMove);
        window.addEventListener("pointerup", onPointerUp);
    };

    // In a smart layout engine, elements are inline/block elements managed by flexbox.
    // However, if the user explicitly turns on "absolute positioning", we respect x/y bounds.
    const style: React.CSSProperties = {
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
        padding,
        margin,
        opacity: (opacity !== undefined ? opacity : 100) / 100,
        borderRadius: borderRadius || "0px",
        boxShadow: boxShadow || "none",
        zIndex: zIndex || 1,
        transition: isDragging ? "none" : "all 0.1s ease-out",
    };

    if (isAbsolute) {
        style.position = "absolute";
        style.left = `${x}px`;
        style.top = `${y}px`;
        style.cursor = "move";
    } else {
        style.position = "relative";
    }

    return (
        <div 
            ref={(ref) => {
                domRef.current = ref;
                if (ref) {
                    if (isAbsolute) {
                        // When Absolute, Craft must NOT interpret it as a sortable drag, 
                        // so we only connect it as a droppable target (for dropping nested children).
                        connect(ref as HTMLElement);
                    } else {
                        // When Relative, use Craft's standard flow drag-and-drop
                        connect(drag(ref as HTMLElement));
                    }
                }
            }} 
            style={style} 
            className={`craft-element max-w-full ${isAbsolute ? 'hover:outline-dashed hover:outline-1 hover:outline-blue-400' : ''}`}
            onPointerDown={handlePointerDown}
        >
            {children}
        </div>
    );
};
