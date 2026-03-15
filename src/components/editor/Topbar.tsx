"use client";
import React, { useState, useEffect } from 'react';
import { useEditor } from '@craftjs/core';
import LZUTF8 from 'lzutf8';
import { Undo2, Redo2, Trash2, Save, Monitor, Smartphone, Play, EyeOff, Settings, Palette } from 'lucide-react';
import { useDevice } from './DeviceContext';
import { usePreview } from './PreviewContext';
import { useTheme } from './ThemeContext';

export const Topbar = ({ pageId }: { pageId?: string }) => {
    const { actions, query, canUndo, canRedo, rootSeo } = useEditor((state, query) => {
        const rootNode = state.nodes['ROOT'];
        return {
            canUndo: query.history.canUndo(),
            canRedo: query.history.canRedo(),
            rootSeo: rootNode?.data?.custom?.seo || { title: "Untitled Page", description: "" }
        };
    });
    
    const [isSaving, setIsSaving] = useState(false);
    const [isSeoModalOpen, setIsSeoModalOpen] = useState(false);
    const [pageTitle, setPageTitle] = useState(rootSeo.title);
    const [pageDesc, setPageDesc] = useState(rootSeo.description);

    const { theme, setTheme } = useTheme();
    const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);

    useEffect(() => {
        if (rootSeo) {
            setPageTitle(rootSeo.title || "Untitled Page");
            setPageDesc(rootSeo.description || "");
        }
    }, [rootSeo]);

    useEffect(() => {
        document.title = pageTitle || "Untitled Page";
        let metaTag = document.querySelector('meta[name="description"]');
        if (!metaTag) {
            metaTag = document.createElement('meta');
            metaTag.setAttribute("name", "description");
            document.head.appendChild(metaTag);
        }
        metaTag.setAttribute("content", pageDesc);
    }, [pageTitle, pageDesc]);

    const saveSeoSettings = () => {
        actions.setCustom('ROOT', (custom) => {
            custom.seo = { title: pageTitle, description: pageDesc };
        });
        setIsSeoModalOpen(false);
    };
    const { device, setDevice } = useDevice();
    const { isPreview, setIsPreview } = usePreview();

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
                body: JSON.stringify({ content: { format: 'lzutf8', data: compressed } })
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
        <>
        <div className="flex items-center justify-between px-4 h-14 border-b bg-background">
            <div className="font-semibold text-lg flex items-center gap-2">
                <span>Site Builder</span>
                <span className="text-xs font-normal border rounded px-2 bg-muted text-muted-foreground mr-4">Editor Mode</span>

                {/* Device Toggle */}
                <div className="flex items-center bg-muted rounded-md border text-muted-foreground ml-4">
                    <button
                        className={`p-1.5 transition ${device === 'desktop' ? 'bg-background shadow-sm text-primary rounded' : 'hover:bg-accent'}`}
                        onClick={() => setDevice('desktop')}
                        title="Desktop View"
                    >
                        <Monitor size={16} />
                    </button>
                    <button
                        className={`p-1.5 transition ${device === 'mobile' ? 'bg-background shadow-sm text-primary rounded' : 'hover:bg-accent'}`}
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
                                    custom: { seo: rootSeo },
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

                {/* Theme Settings Modal */}
                <button
                    onClick={() => setIsThemeModalOpen(true)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition bg-secondary text-secondary-foreground hover:bg-secondary/80 mr-2"
                    title="Global Brand & Theme"
                >
                    <Palette size={16} />
                    Theme
                </button>

                {/* Page Settings (SEO) */}
                <button
                    onClick={() => setIsSeoModalOpen(true)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    title="Page Settings & SEO"
                >
                    <Settings size={16} />
                    SEO
                </button>

                {/* Preview Toggle */}
                <button
                    onClick={() => setIsPreview(!isPreview)}
                    className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition ${isPreview ? 'bg-amber-100 text-amber-700 border border-amber-300 hover:bg-amber-200' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`}
                >
                    {isPreview ? (
                        <>
                            <EyeOff size={16} />
                            Exit Preview
                        </>
                    ) : (
                        <>
                            <Play size={16} />
                            Preview
                        </>
                    )}
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

            {/* SEO Modal */}
            {isSeoModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] backdrop-blur-sm">
                    <div className="bg-background border rounded-xl shadow-xl p-6 w-full max-w-md animate-in fade-in zoom-in duration-200">
                        <h3 className="text-lg font-semibold mb-4 text-foreground">Page Settings</h3>
                        
                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-foreground">Page Title (SEO)</label>
                                <input
                                    type="text"
                                    value={pageTitle}
                                    onChange={(e) => setPageTitle(e.target.value)}
                                    placeholder="e.g. Home - Startup Inc"
                                    className="w-full px-3 py-2 border rounded-md text-sm bg-background text-foreground focus:ring-2 focus:ring-indigo-500 outline-none"
                                />
                                <p className="text-xs text-muted-foreground">This dictates the text that appears on Browser tabs and Search Engines.</p>
                            </div>
                            
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-foreground">Meta Description</label>
                                <textarea
                                    value={pageDesc}
                                    onChange={(e) => setPageDesc(e.target.value)}
                                    placeholder="A brief summary of your page."
                                    className="w-full px-3 py-2 border rounded-md text-sm bg-background text-foreground h-24 resize-none focus:ring-2 focus:ring-indigo-500 outline-none"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 mt-8">
                            <button
                                onClick={() => {
                                    setPageTitle(rootSeo?.title || "");
                                    setPageDesc(rootSeo?.description || "");
                                    setIsSeoModalOpen(false);
                                }}
                                className="px-4 py-2 rounded-md font-medium text-sm hover:bg-accent text-accent-foreground transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={saveSeoSettings}
                                className="px-4 py-2 rounded-md font-medium text-sm bg-indigo-600 hover:bg-indigo-700 text-white transition shadow-sm"
                            >
                                Apply Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* Global Theme Settings Modal */}
            {isThemeModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] backdrop-blur-sm">
                    <div className="bg-background border rounded-xl shadow-xl p-6 w-full max-w-md animate-in fade-in zoom-in duration-200">
                        <div className="flex items-center gap-2 mb-4">
                            <Palette className="text-indigo-500" />
                            <h3 className="text-lg font-semibold text-foreground">Brand & Theme</h3>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-foreground">Primary Color</label>
                                    <div className="flex gap-2 items-center">
                                        <input
                                            type="color"
                                            value={theme.primaryColor}
                                            onChange={(e) => setTheme({ primaryColor: e.target.value })}
                                            className="w-8 h-8 rounded border-0 cursor-pointer p-0"
                                        />
                                        <span className="text-xs font-mono bg-muted px-2 py-1 rounded">{theme.primaryColor}</span>
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-foreground">Secondary Color</label>
                                    <div className="flex gap-2 items-center">
                                        <input
                                            type="color"
                                            value={theme.secondaryColor}
                                            onChange={(e) => setTheme({ secondaryColor: e.target.value })}
                                            className="w-8 h-8 rounded border-0 cursor-pointer p-0"
                                        />
                                        <span className="text-xs font-mono bg-muted px-2 py-1 rounded">{theme.secondaryColor}</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-foreground">Font Family</label>
                                <select 
                                    className="w-full px-3 py-2 border rounded-md text-sm bg-background"
                                    value={theme.fontFamily}
                                    onChange={(e) => setTheme({ fontFamily: e.target.value })}
                                >
                                    <option value="Inter, sans-serif">Inter</option>
                                    <option value="Roboto, sans-serif">Roboto</option>
                                    <option value="Outfit, sans-serif">Outfit</option>
                                    <option value="Merriweather, serif">Merriweather</option>
                                </select>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-foreground">Global Border Radius ({theme.borderRadius})</label>
                                <input
                                    type="range"
                                    min="0" max="32"
                                    value={parseInt(theme.borderRadius)}
                                    onChange={(e) => setTheme({ borderRadius: `${e.target.value}px` })}
                                    className="w-full cursor-pointer accent-indigo-600"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 mt-8">
                            <button
                                onClick={() => setIsThemeModalOpen(false)}
                                className="px-4 py-2 rounded-md font-medium text-sm bg-indigo-600 hover:bg-indigo-700 text-white transition shadow-sm"
                            >
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
