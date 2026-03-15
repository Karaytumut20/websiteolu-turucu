"use client";
import React, { useEffect, useRef, useCallback } from "react";
import { useNode, useEditor } from "@craftjs/core";
import { ArrowUp, Trash2, Copy, Move } from "lucide-react";
import ReactDOM from "react-dom";

export const RenderNode = ({ render }: { render: React.ReactNode }) => {
    const { id } = useNode();
    const { actions, query, isActive } = useEditor((_, query) => ({
        isActive: query.getEvent("selected").contains(id),
    }));

    const {
        isHover,
        dom,
        name,
        moveable,
        deletable,
        connectors: { drag },
        parent,
    } = useNode((node) => ({
        isHover: node.events.hovered,
        dom: node.dom,
        name: node.data.custom.displayName || node.data.displayName,
        moveable: query.node(node.id).isDraggable(),
        deletable: query.node(node.id).isDeletable(),
        parent: node.data.parent,
        props: node.data.props,
    }));

    const currentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (dom) {
            if (isActive || isHover) {
                dom.classList.add("ring-2", "ring-primary/50", "ring-inset");
            } else {
                dom.classList.remove("ring-2", "ring-primary/50", "ring-inset");
            }
        }
    }, [dom, isActive, isHover]);

    const getPos = useCallback((dom: HTMLElement) => {
        const { top, left, bottom } = dom ? dom.getBoundingClientRect() : { top: 0, left: 0, bottom: 0 };
        return {
            top: `${top > 0 ? top : bottom}px`,
            left: `${left}px`,
        };
    }, []);

    const duplicateNode = () => {
        if (!parent) return;
        const node = query.node(id).get();
        // Extract type cleanly from node
        const nodeType = (node.data.type as any);
        
        const newNode = query.parseReactElement(
            React.createElement(
                nodeType,
                node.data.props
            )
        ).toNodeTree();
        actions.addNodeTree(newNode, typeof parent === 'string' ? parent : (parent as any).id || "ROOT");
    };

    return (
        <>
            {isHover || isActive
                ? ReactDOM.createPortal(
                      <div
                          className="fixed flex items-center bg-primary text-primary-foreground text-xs p-1 gap-2 shadow-sm z-[9999]"
                          style={{
                              left: getPos(dom as HTMLElement).left,
                              top: getPos(dom as HTMLElement).top,
                              transform: `translateY(-100%)`, // position above
                          }}
                      >
                          <h2 className="flex-1 mr-2 px-1 font-semibold">{name}</h2>
                          {id !== "ROOT" && typeof parent === "string" && (
                              <button
                                  className="p-1 cursor-pointer hover:bg-black/20 rounded"
                                  onClick={() => actions.selectNode(parent)}
                                  title="Select Parent"
                              >
                                  <ArrowUp size={14} />
                              </button>
                          )}
                          {deletable && (
                              <button
                                  className="p-1 cursor-pointer hover:bg-destructive text-destructive-foreground rounded"
                                  onMouseDown={(e) => {
                                      e.stopPropagation();
                                      actions.delete(id);
                                  }}
                                  title="Delete"
                              >
                                  <Trash2 size={14} />
                              </button>
                          )}
                      </div>,
                      document.body
                  )
                : null}
            {render}
        </>
    );
};
