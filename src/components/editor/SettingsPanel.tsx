"use client";
import React from 'react';
import { useEditor } from '@craftjs/core';
import { useDevice } from './DeviceContext';

export const SettingsPanel = () => {
    const { device } = useDevice();
    const { selected } = useEditor((state) => {
        const [currentNodeId] = state.events.selected;
        let selectedNode;

        if (currentNodeId) {
            selectedNode = {
                id: currentNodeId,
                name: state.nodes[currentNodeId].data.name,
                settings: state.nodes[currentNodeId].related && state.nodes[currentNodeId].related.settings,
                props: state.nodes[currentNodeId].data.props,
            };
        }

        return {
            selected: selectedNode,
        };
    });

    const { actions } = useEditor();

    if (!selected) {
        return (
            <div className="w-80 border-l bg-background p-4 flex flex-col h-full overflow-y-auto">
                <h2 className="text-lg font-semibold mb-4 border-b pb-2">Settings</h2>
                <div className="text-sm text-muted-foreground flex items-center justify-center h-full">
                    Select an element to edit its properties
                </div>
            </div>
        );
    }

    return (
        <div className="w-80 border-l bg-background p-4 flex flex-col h-full overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4 border-b pb-2">
                {selected.name} Settings
            </h2>
            <div className="flex-1">
                {selected.settings && React.createElement(selected.settings)}

                {selected.name !== "Container" && (
                    <div className="mt-6 border-t pt-4">
                        <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider">Dimensions & Position</h3>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="text-xs font-medium text-gray-500">X (px)</label>
                                <input
                                    type="number"
                                    value={device === 'mobile' ? (selected.props.mobileX !== undefined ? selected.props.mobileX : selected.props.x || 0) : (selected.props.x || 0)}
                                    onChange={(e) => {
                                        actions.setProp(selected.id, (props: any) => {
                                            if (device === 'mobile') props.mobileX = parseInt(e.target.value);
                                            else props.x = parseInt(e.target.value);
                                        });
                                    }}
                                    className="w-full mt-1 border rounded px-2 py-1 text-sm bg-muted/50"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-medium text-gray-500">Y (px)</label>
                                <input
                                    type="number"
                                    value={device === 'mobile' ? (selected.props.mobileY !== undefined ? selected.props.mobileY : selected.props.y || 0) : (selected.props.y || 0)}
                                    onChange={(e) => {
                                        actions.setProp(selected.id, (props: any) => {
                                            if (device === 'mobile') props.mobileY = parseInt(e.target.value);
                                            else props.y = parseInt(e.target.value);
                                        });
                                    }}
                                    className="w-full mt-1 border rounded px-2 py-1 text-sm bg-muted/50"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-medium text-gray-500">Width</label>
                                <input
                                    type="text"
                                    value={device === 'mobile' ? (selected.props.mobileWidth !== undefined ? selected.props.mobileWidth : selected.props.width || "auto") : (selected.props.width || "auto")}
                                    onChange={(e) => {
                                        actions.setProp(selected.id, (props: any) => {
                                            if (device === 'mobile') props.mobileWidth = e.target.value;
                                            else props.width = e.target.value;
                                        });
                                    }}
                                    className="w-full mt-1 border rounded px-2 py-1 text-sm bg-muted/50"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-medium text-gray-500">Height</label>
                                <input
                                    type="text"
                                    value={device === 'mobile' ? (selected.props.mobileHeight !== undefined ? selected.props.mobileHeight : selected.props.height || "auto") : (selected.props.height || "auto")}
                                    onChange={(e) => {
                                        actions.setProp(selected.id, (props: any) => {
                                            if (device === 'mobile') props.mobileHeight = e.target.value;
                                            else props.height = e.target.value;
                                        });
                                    }}
                                    className="w-full mt-1 border rounded px-2 py-1 text-sm bg-muted/50"
                                />
                            </div>
                        </div>

                        {/* Layering Z-Index */}
                        <div className="mt-4 pt-3 border-t">
                            <label className="text-xs font-medium text-gray-500 flex justify-between">
                                <span>Layer (Z-Index)</span>
                                <span>{selected.props.zIndex || 1}</span>
                            </label>
                            <input
                                type="range"
                                min="1"
                                max="100"
                                value={selected.props.zIndex || 1}
                                onChange={(e) => {
                                    actions.setProp(selected.id, (props: any) => props.zIndex = parseInt(e.target.value))
                                }}
                                className="w-full mt-2"
                            />
                        </div>

                        {/* Advanced Styling */}
                        <div className="mt-4 pt-3 border-t">
                            <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider">Advanced Styling</h3>

                            {/* Opacity */}
                            <div className="mb-3">
                                <label className="text-xs font-medium text-gray-500 flex justify-between">
                                    <span>Opacity (%)</span>
                                    <span>{selected.props.opacity !== undefined ? selected.props.opacity : 100}</span>
                                </label>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={selected.props.opacity !== undefined ? selected.props.opacity : 100}
                                    onChange={(e) => {
                                        actions.setProp(selected.id, (props: any) => props.opacity = parseInt(e.target.value))
                                    }}
                                    className="w-full mt-2"
                                />
                            </div>

                            {/* Border Radius */}
                            <div className="mb-3">
                                <label className="text-xs font-medium text-gray-500">Border Radius</label>
                                <input
                                    type="text"
                                    value={selected.props.borderRadius || "0px"}
                                    onChange={(e) => {
                                        actions.setProp(selected.id, (props: any) => props.borderRadius = e.target.value)
                                    }}
                                    className="w-full mt-1 border rounded px-2 py-1 text-sm bg-muted/50"
                                    placeholder="e.g. 8px, 50%"
                                />
                            </div>

                            {/* Box Shadow */}
                            <div className="mb-3">
                                <label className="text-xs font-medium text-gray-500">Box Shadow (CSS)</label>
                                <input
                                    type="text"
                                    value={selected.props.boxShadow || "none"}
                                    onChange={(e) => {
                                        actions.setProp(selected.id, (props: any) => props.boxShadow = e.target.value)
                                    }}
                                    className="w-full mt-1 border rounded px-2 py-1 text-sm bg-muted/50"
                                    placeholder="e.g. 0 4px 6px rgba(0,0,0,0.1)"
                                />
                            </div>
                        </div>
                        {/* Active Links / Actions */}
                        <div className="mt-4 pt-3 border-t">
                            <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider">Interactions</h3>

                            <div className="mb-3">
                                <label className="text-xs font-medium text-gray-500">Action Link (URL)</label>
                                <input
                                    type="text"
                                    value={selected.props.href || ""}
                                    onChange={(e) => {
                                        actions.setProp(selected.id, (props: any) => props.href = e.target.value)
                                    }}
                                    className="w-full mt-1 border rounded px-2 py-1 text-sm bg-muted/50"
                                    placeholder="https://example.com or /about"
                                />
                                <p className="text-[10px] text-gray-400 mt-1">If set, this element will become clickable in the live site.</p>
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
};
