"use client";
import React, { useState } from 'react';
import { useEditor } from '@craftjs/core';
import LZUTF8 from 'lzutf8';
import { Undo2, Redo2, Trash2, Save, Monitor, Smartphone } from 'lucide-react';
import { useDevice } from './DeviceContext';

export const Topbar = ({ pageId }: { pageId?: string }) => {
    const { actions, query, canUndo, canRedo } = useEditor((state, query) => ({
        canUndo: query.history.canUndo(),
        canRedo: query.history.canRedo(),
    }));
    const [isSaving, setIsSaving] = useState(false);
    const { device, setDevice } = useDevice();

    const saveState = async () => {
        try {
            setIsSaving(true);
            const json = query.serialize();
            // Compress the JSON string
            const compressed = LZUTF8.compress(json, { outputEncoding: 'Base64' });

            console.log("Saving compressed state to server...");

            if (!pageId) {
                alert("Cannot save: No page ID provided.");
                return;
            }

            const response = await fetch(`/api/pages/${pageId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: compressed })
            });

            if (response.ok) {
                alert("Design saved successfully!");
            } else {
                alert("Failed to save design.");
            }
        } catch (error) {
            console.error("Failed to save state:", error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="flex items-center justify-between px-4 h-14 border-b bg-background">
            <div className="font-semibold text-lg flex items-center gap-2">
                <span>Site Builder</span>
                <span className="text-xs font-normal border rounded px-2 bg-muted text-muted-foreground mr-4">Editor Mode</span>

                {/* Device Toggle */}
                <div className="flex items-center bg-muted rounded-md border text-muted-foreground ml-4">
                    <button
                        className={`p-1.5 transition ${device === 'desktop' ? 'bg-white shadow-sm text-indigo-600 rounded' : 'hover:bg-gray-200'}`}
                        onClick={() => setDevice('desktop')}
                        title="Desktop View"
                    >
                        <Monitor size={16} />
                    </button>
                    <button
                        className={`p-1.5 transition ${device === 'mobile' ? 'bg-white shadow-sm text-indigo-600 rounded' : 'hover:bg-gray-200'}`}
                        onClick={() => setDevice('mobile')}
                        title="Mobile View"
                    >
                        <Smartphone size={16} />
                    </button>
                </div>
            </div>
            <div className="flex items-center gap-2">
                {/* Undo / Redo */}
                <div className="flex items-center bg-muted rounded-md border text-muted-foreground mr-4">
                    <button
                        className="p-2 hover:bg-gray-200 disabled:opacity-30 transition cursor-pointer"
                        disabled={!canUndo}
                        onClick={() => actions.history.undo()}
                        title="Undo"
                    >
                        <Undo2 size={16} />
                    </button>
                    <div className="w-[1px] h-4 bg-gray-300"></div>
                    <button
                        className="p-2 hover:bg-gray-200 disabled:opacity-30 transition cursor-pointer"
                        disabled={!canRedo}
                        onClick={() => actions.history.redo()}
                        title="Redo"
                    >
                        <Redo2 size={16} />
                    </button>
                </div>

                {/* Clear Canvas */}
                <button
                    onClick={() => {
                        if (confirm("Are you sure you want to clear the canvas? This cannot be undone.")) {
                            actions.selectNode();
                            actions.deserialize({
                                ROOT: {
                                    type: { resolvedName: "Container" },
                                    isCanvas: true,
                                    props: { padding: "20px", background: "#ffffff", margin: "0px" },
                                    displayName: "Container",
                                    custom: {},
                                    hidden: false,
                                    nodes: [],
                                    linkedNodes: {},
                                    parent: null
                                } as any
                            });
                        }
                    }}
                    className="flex items-center gap-2 text-destructive border border-destructive hover:bg-destructive/10 px-3 py-1.5 rounded-md text-sm font-medium transition"
                >
                    <Trash2 size={16} />
                    Clear
                </button>

                {/* Save */}
                <button
                    onClick={saveState}
                    disabled={isSaving}
                    className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-1.5 rounded-md text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 transition"
                >
                    <Save size={16} />
                    {isSaving ? "Saving..." : "Save"}
                </button>
            </div>
        </div>
    );
};
