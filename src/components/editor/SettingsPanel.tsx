"use client";
import React from 'react';
import { useEditor } from '@craftjs/core';
import { useDevice } from './DeviceContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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
            <div className="w-[300px] border-l bg-sidebar text-sidebar-foreground p-0 flex flex-col h-full overflow-y-auto">
                <div className="p-4 border-b bg-sidebar">
                    <h2 className="text-sm font-semibold tracking-tight">Settings</h2>
                </div>
                <div className="text-[13px] text-muted-foreground flex items-center justify-center h-full p-6 text-center">
                    Select an element to edit properties
                </div>
            </div>
        );
    }

    return (
        <div className="w-[300px] border-l bg-sidebar text-sidebar-foreground p-0 flex flex-col h-full overflow-y-auto overflow-x-hidden">
            <div className="p-4 border-b bg-sidebar">
                <h2 className="text-sm font-semibold tracking-tight">
                    {selected.name}
                </h2>
                <p className="text-[11px] text-muted-foreground mt-0.5">Configure styling and properties</p>
            </div>
            
            <div className="flex-1 p-4">
                <Tabs defaultValue="props" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 mb-4 bg-muted/50 text-muted-foreground h-8 p-1">
                        <TabsTrigger value="props" className="text-[11px] h-6 py-0 disabled:opacity-50" disabled={!selected.settings}>Props</TabsTrigger>
                        <TabsTrigger value="layout" className="text-[11px] h-6 py-0">Layout</TabsTrigger>
                        <TabsTrigger value="style" className="text-[11px] h-6 py-0">Style</TabsTrigger>
                    </TabsList>

                    <TabsContent value="props" className="space-y-4 outline-none">
                        {selected.settings && React.createElement(selected.settings)}
                        
                        {/* Interactions */}
                        <div className="pt-4 mt-4 border-t border-border/50">
                            <Label className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold mb-3 block">Interactions</Label>
                            <div className="space-y-1">
                                <Label className="text-[12px] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Action Link (URL)</Label>
                                <Input
                                    type="text"
                                    value={selected.props.href || ""}
                                    onChange={(e) => actions.setProp(selected.id, (props: any) => props.href = e.target.value)}
                                    placeholder="https://example.com"
                                    className="h-8 text-[13px] bg-background"
                                />
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="layout" className="space-y-4 outline-none">
                        <Label className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold mb-1 block">Dimensions & Position</Label>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1.5">
                                <Label className="text-[11px] font-medium text-muted-foreground">X (px)</Label>
                                <Input
                                    type="number"
                                    value={device === 'mobile' ? (selected.props.mobileX !== undefined ? selected.props.mobileX : selected.props.x || 0) : (selected.props.x || 0)}
                                    onChange={(e) => {
                                        actions.setProp(selected.id, (props: any) => {
                                            if (device === 'mobile') props.mobileX = parseInt(e.target.value);
                                            else props.x = parseInt(e.target.value);
                                        });
                                    }}
                                    className="h-8 text-[12px] bg-background font-mono"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <Label className="text-[11px] font-medium text-muted-foreground">Y (px)</Label>
                                <Input
                                    type="number"
                                    value={device === 'mobile' ? (selected.props.mobileY !== undefined ? selected.props.mobileY : selected.props.y || 0) : (selected.props.y || 0)}
                                    onChange={(e) => {
                                        actions.setProp(selected.id, (props: any) => {
                                            if (device === 'mobile') props.mobileY = parseInt(e.target.value);
                                            else props.y = parseInt(e.target.value);
                                        });
                                    }}
                                    className="h-8 text-[12px] bg-background font-mono"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <Label className="text-[11px] font-medium text-muted-foreground">Width</Label>
                                <Input
                                    type="text"
                                    value={device === 'mobile' ? (selected.props.mobileWidth !== undefined ? selected.props.mobileWidth : selected.props.width || "auto") : (selected.props.width || "auto")}
                                    onChange={(e) => {
                                        actions.setProp(selected.id, (props: any) => {
                                            if (device === 'mobile') props.mobileWidth = e.target.value;
                                            else props.width = e.target.value;
                                        });
                                    }}
                                    className="h-8 text-[12px] bg-background font-mono"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <Label className="text-[11px] font-medium text-muted-foreground">Height</Label>
                                <Input
                                    type="text"
                                    value={device === 'mobile' ? (selected.props.mobileHeight !== undefined ? selected.props.mobileHeight : selected.props.height || "auto") : (selected.props.height || "auto")}
                                    onChange={(e) => {
                                        actions.setProp(selected.id, (props: any) => {
                                            if (device === 'mobile') props.mobileHeight = e.target.value;
                                            else props.height = e.target.value;
                                        });
                                    }}
                                    className="h-8 text-[12px] bg-background font-mono"
                                />
                            </div>
                        </div>

                        {/* Layering Z-Index */}
                        <div className="pt-4 mt-4 border-t border-border/50">
                            <div className="flex justify-between mb-2">
                                <Label className="text-[11px] font-medium text-foreground">Z-Index Layer</Label>
                                <span className="text-[11px] font-mono text-muted-foreground">{selected.props.zIndex || 1}</span>
                            </div>
                            <input
                                type="range"
                                min="1"
                                max="100"
                                value={selected.props.zIndex || 1}
                                onChange={(e) => {
                                    actions.setProp(selected.id, (props: any) => props.zIndex = parseInt(e.target.value))
                                }}
                                className="w-full accent-primary h-1.5 bg-muted rounded-lg appearance-none cursor-pointer"
                            />
                        </div>
                    </TabsContent>

                    <TabsContent value="style" className="space-y-5 outline-none">
                        <Label className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold mb-1 block">Advanced Styling</Label>
                        
                        <div className="space-y-2">
                            <div className="flex justify-between mb-1">
                                <Label className="text-[12px] font-medium">Opacity</Label>
                                <span className="text-[11px] font-mono text-muted-foreground">{selected.props.opacity !== undefined ? selected.props.opacity : 100}%</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={selected.props.opacity !== undefined ? selected.props.opacity : 100}
                                onChange={(e) => {
                                    actions.setProp(selected.id, (props: any) => props.opacity = parseInt(e.target.value))
                                }}
                                className="w-full accent-primary h-1.5 bg-muted rounded-lg appearance-none cursor-pointer"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Label className="text-[12px] font-medium">Border Radius</Label>
                            <Input
                                type="text"
                                value={selected.props.borderRadius || "0px"}
                                onChange={(e) => {
                                    actions.setProp(selected.id, (props: any) => props.borderRadius = e.target.value)
                                }}
                                className="h-8 text-[12px] bg-background font-mono"
                                placeholder="0px, 8px, 50%, etc."
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Label className="text-[12px] font-medium">Box Shadow</Label>
                            <Input
                                type="text"
                                value={selected.props.boxShadow || "none"}
                                onChange={(e) => {
                                    actions.setProp(selected.id, (props: any) => props.boxShadow = e.target.value)
                                }}
                                className="h-8 text-[12px] bg-background font-mono"
                                placeholder="0 4px 6px rgba(0,0,0,0.1)"
                            />
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};
