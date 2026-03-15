"use client";
import React from 'react';
import { useEditor } from '@craftjs/core';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";

export const SettingsPanel = () => {
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

        return { selected: selectedNode };
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
                <Tabs defaultValue="layout" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 mb-4 bg-muted/50 text-muted-foreground h-8 p-1">
                        <TabsTrigger value="props" className="text-[11px] h-6 py-0 disabled:opacity-50" disabled={!selected.settings}>Props</TabsTrigger>
                        <TabsTrigger value="layout" className="text-[11px] h-6 py-0">Layout</TabsTrigger>
                        <TabsTrigger value="style" className="text-[11px] h-6 py-0">Style</TabsTrigger>
                    </TabsList>

                    <TabsContent value="props" className="space-y-4 outline-none">
                        {selected.settings && React.createElement(selected.settings)}
                        
                        {/* Interactions */}
                        <div className="pt-4 mt-4 border-t border-border/50 pb-2">
                            <Label className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold mb-3 block">Interactions</Label>
                            
                            {/* Link Settings */}
                            <div className="space-y-3 mb-4">
                                <div className="space-y-1.5">
                                    <Label className="text-[11px] font-medium text-muted-foreground">Action Link (URL)</Label>
                                    <Input
                                        type="text"
                                        value={selected.props.linkUrl || ""}
                                        onChange={(e) => actions.setProp(selected.id, (props: any) => props.linkUrl = e.target.value)}
                                        placeholder="/about or https://..."
                                        className="h-8 text-[12px] bg-background font-mono"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <Label className="text-[11px] font-medium text-muted-foreground">Open Link In</Label>
                                    <select
                                        value={selected.props.linkTarget || "_self"}
                                        onChange={(e) => actions.setProp(selected.id, (props: any) => props.linkTarget = e.target.value)}
                                        className="w-full h-8 text-[12px] bg-background border rounded px-2"
                                    >
                                        <option value="_self">Same Tab</option>
                                        <option value="_blank">New Tab</option>
                                    </select>
                                </div>
                            </div>

                            {/* Animation Settings */}
                            <div className="space-y-3 pt-4 border-t border-border/50">
                                <div className="space-y-1.5">
                                    <Label className="text-[11px] font-medium text-muted-foreground">Entry Animation</Label>
                                    <select
                                        value={selected.props.animationType || "none"}
                                        onChange={(e) => actions.setProp(selected.id, (props: any) => props.animationType = e.target.value)}
                                        className="w-full h-8 text-[12px] bg-background border rounded px-2"
                                    >
                                        <option value="none">None</option>
                                        <option value="fade">Fade In</option>
                                        <option value="slide-up">Slide Up</option>
                                        <option value="zoom-in">Zoom In</option>
                                    </select>
                                </div>
                                
                                <div className="space-y-3 mt-3">
                                    <div className="flex justify-between items-center">
                                        <Label className="text-[11px] font-medium text-muted-foreground">Delay ({(selected.props.animationDelay || 0).toFixed(1)}s)</Label>
                                    </div>
                                    <Slider 
                                        value={[selected.props.animationDelay || 0]} 
                                        max={2} step={0.1}
                                        onValueChange={(val) => actions.setProp(selected.id, (props: any) => props.animationDelay = val[0])}
                                        className="w-full"
                                    />
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="layout" className="outline-none">
                        <Accordion type="multiple" defaultValue={["size", "spacing", "flex", "position"]} className="w-full">
                            
                            <AccordionItem value="size">
                                <AccordionTrigger className="text-[12px] py-2 hover:no-underline">Size</AccordionTrigger>
                                <AccordionContent className="pt-1 pb-3">
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="space-y-1.5">
                                            <Label className="text-[11px] font-medium text-muted-foreground">Width</Label>
                                            <Input
                                                type="text"
                                                value={selected.props.width || "auto"}
                                                onChange={(e) => actions.setProp(selected.id, (props: any) => props.width = e.target.value)}
                                                className="h-8 text-[12px] bg-background font-mono"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label className="text-[11px] font-medium text-muted-foreground">Height</Label>
                                            <Input
                                                type="text"
                                                value={selected.props.height || "auto"}
                                                onChange={(e) => actions.setProp(selected.id, (props: any) => props.height = e.target.value)}
                                                className="h-8 text-[12px] bg-background font-mono"
                                            />
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="spacing">
                                <AccordionTrigger className="text-[12px] py-2 hover:no-underline">Spacing</AccordionTrigger>
                                <AccordionContent className="pt-1 pb-3">
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="space-y-1.5">
                                            <Label className="text-[11px] font-medium text-muted-foreground">Padding</Label>
                                            <Input
                                                type="text"
                                                value={selected.props.padding || "0px"}
                                                onChange={(e) => actions.setProp(selected.id, (props: any) => props.padding = e.target.value)}
                                                className="h-8 text-[12px] bg-background font-mono"
                                                placeholder="20px or 10px 20px"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label className="text-[11px] font-medium text-muted-foreground">Margin</Label>
                                            <Input
                                                type="text"
                                                value={selected.props.margin || "0px"}
                                                onChange={(e) => actions.setProp(selected.id, (props: any) => props.margin = e.target.value)}
                                                className="h-8 text-[12px] bg-background font-mono"
                                                placeholder="0px auto"
                                            />
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                            
                            {selected.name === "Container" && (
                                <AccordionItem value="flex">
                                    <AccordionTrigger className="text-[12px] py-2 hover:no-underline">Flex Layout</AccordionTrigger>
                                    <AccordionContent className="pt-1 pb-3 space-y-3">
                                        <div className="space-y-1.5">
                                            <Label className="text-[11px] font-medium text-muted-foreground">Direction</Label>
                                            <select 
                                                className="w-full h-8 px-2 text-[12px] bg-background border rounded"
                                                value={selected.props.flexDirection || "column"}
                                                onChange={(e) => actions.setProp(selected.id, (props: any) => props.flexDirection = e.target.value)}
                                            >
                                                <option value="row">Row (Horizontal)</option>
                                                <option value="column">Column (Vertical)</option>
                                            </select>
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label className="text-[11px] font-medium text-muted-foreground">Justify Content</Label>
                                            <select 
                                                className="w-full h-8 px-2 text-[12px] bg-background border rounded"
                                                value={selected.props.justifyContent || "flex-start"}
                                                onChange={(e) => actions.setProp(selected.id, (props: any) => props.justifyContent = e.target.value)}
                                            >
                                                <option value="flex-start">Start</option>
                                                <option value="center">Center</option>
                                                <option value="flex-end">End</option>
                                                <option value="space-between">Space Between</option>
                                                <option value="space-around">Space Around</option>
                                            </select>
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label className="text-[11px] font-medium text-muted-foreground">Align Items</Label>
                                            <select 
                                                className="w-full h-8 px-2 text-[12px] bg-background border rounded"
                                                value={selected.props.alignItems || "flex-start"}
                                                onChange={(e) => actions.setProp(selected.id, (props: any) => props.alignItems = e.target.value)}
                                            >
                                                <option value="flex-start">Start</option>
                                                <option value="center">Center</option>
                                                <option value="flex-end">End</option>
                                                <option value="stretch">Stretch</option>
                                            </select>
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label className="text-[11px] font-medium text-muted-foreground">Gap</Label>
                                            <Input
                                                type="text"
                                                value={selected.props.gap || "0px"}
                                                onChange={(e) => actions.setProp(selected.id, (props: any) => props.gap = e.target.value)}
                                                className="h-8 text-[12px] bg-background font-mono"
                                            />
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            )}

                            <AccordionItem value="position">
                                <AccordionTrigger className="text-[12px] py-2 hover:no-underline">Position (X/Y)</AccordionTrigger>
                                <AccordionContent className="pt-1 pb-3 space-y-3">
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="space-y-1.5">
                                            <Label className="text-[11px] font-medium text-muted-foreground">X</Label>
                                            <Input
                                                type="number"
                                                value={Math.round(selected.props.x || 0)}
                                                onChange={(e) => actions.setProp(selected.id, (props: any) => props.x = parseInt(e.target.value))}
                                                className="h-8 text-[12px] bg-background font-mono"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label className="text-[11px] font-medium text-muted-foreground">Y</Label>
                                            <Input
                                                type="number"
                                                value={Math.round(selected.props.y || 0)}
                                                onChange={(e) => actions.setProp(selected.id, (props: any) => props.y = parseInt(e.target.value))}
                                                className="h-8 text-[12px] bg-background font-mono"
                                            />
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </TabsContent>

                    <TabsContent value="style" className="outline-none">
                        <Accordion type="multiple" defaultValue={["appearance", "effects"]} className="w-full">
                            <AccordionItem value="appearance">
                                <AccordionTrigger className="text-[12px] py-2 hover:no-underline">Appearance</AccordionTrigger>
                                <AccordionContent className="pt-2 pb-3 space-y-4">
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <Label className="text-[11px] font-medium text-muted-foreground">Opacity ({selected.props.opacity !== undefined ? selected.props.opacity : 100}%)</Label>
                                        </div>
                                        <Slider 
                                            value={[selected.props.opacity !== undefined ? selected.props.opacity : 100]} 
                                            max={100} step={1}
                                            onValueChange={(val) => actions.setProp(selected.id, (props: any) => props.opacity = val[0])}
                                            className="w-full"
                                        />
                                    </div>
                                    
                                    <div className="space-y-3 mt-4">
                                        <div className="flex justify-between items-center">
                                            <Label className="text-[11px] font-medium text-muted-foreground">Layer Z-Index ({selected.props.zIndex || 1})</Label>
                                            <div className="flex gap-1">
                                                <button onClick={() => actions.setProp(selected.id, (p: any) => p.zIndex = Math.max(0, (p.zIndex || 1) - 1))} className="text-[10px] px-2 py-1 bg-muted rounded border hover:bg-muted/80">Back</button>
                                                <button onClick={() => actions.setProp(selected.id, (p: any) => p.zIndex = (p.zIndex || 1) + 1)} className="text-[10px] px-2 py-1 bg-muted rounded border hover:bg-muted/80">Front</button>
                                            </div>
                                        </div>
                                        <Slider 
                                            value={[selected.props.zIndex || 1]} 
                                            max={100} step={1}
                                            onValueChange={(val) => actions.setProp(selected.id, (props: any) => props.zIndex = val[0])}
                                            className="w-full"
                                        />
                                    </div>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="effects">
                                <AccordionTrigger className="text-[12px] py-2 hover:no-underline">Effects</AccordionTrigger>
                                <AccordionContent className="pt-2 pb-3 space-y-4">
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <Label className="text-[11px] font-medium text-muted-foreground">Border Radius ({parseInt(selected.props.borderRadius || "0")}px)</Label>
                                        </div>
                                        <Slider 
                                            value={[parseInt(selected.props.borderRadius || "0")]} 
                                            max={100} step={1}
                                            onValueChange={(val) => actions.setProp(selected.id, (props: any) => props.borderRadius = `${val[0]}px`)}
                                            className="w-full"
                                        />
                                    </div>
                                    <div className="space-y-1.5 mt-4">
                                        <Label className="text-[11px] font-medium text-muted-foreground">Elevation (Shadow)</Label>
                                        <select
                                            value={selected.props.boxShadow || "none"}
                                            onChange={(e) => actions.setProp(selected.id, (props: any) => props.boxShadow = e.target.value)}
                                            className="w-full h-8 text-[12px] bg-background border rounded px-2"
                                        >
                                            <option value="none">None</option>
                                            <option value="0 1px 2px 0 rgb(0 0 0 / 0.05)">Small</option>
                                            <option value="0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)">Medium</option>
                                            <option value="0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)">Large</option>
                                            <option value="0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)">Extra Large</option>
                                        </select>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};
