"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Page = {
    id: string;
    title: string;
    slug: string;
    createdAt: string;
};

export default function DashboardPages() {
    const router = useRouter();
    const [pages, setPages] = useState<Page[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [error, setError] = useState("");

    const fetchPages = async () => {
        try {
            const res = await fetch("/api/pages");
            if (res.ok) {
                setPages(await res.json());
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPages();
    }, []);

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const res = await fetch("/api/pages", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, slug }),
            });

            if (res.ok) {
                const newPage = await res.json();
                setPages([newPage, ...pages]);
                setIsModalOpen(false);
                setTitle("");
                setSlug("");
            } else {
                const msg = await res.text();
                setError(msg || "Failed to create page");
            }
        } catch (err) {
            setError("An unexpected error occurred");
        }
    };

    const deletePage = async (id: string) => {
        if (!confirm("Are you sure you want to delete this page?")) return;
        try {
            const res = await fetch(`/api/pages/${id}`, { method: "DELETE" });
            if (res.ok) {
                setPages(pages.filter((p) => p.id !== id));
            }
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) {
        return <div className="p-8 text-center text-gray-500">Loading your pages...</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Pages</h2>
                    <p className="text-muted-foreground">
                        Manage the pages for your website here.
                    </p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-md font-medium shadow-sm transition-colors"
                >
                    Create Page
                </button>
            </div>

            <div className="rounded-md border bg-white shadow-sm overflow-hidden">
                {pages.length === 0 ? (
                    <div className="p-12 text-center text-gray-500">
                        No pages found. Create your first page to get started.
                    </div>
                ) : (
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="bg-gray-50 text-xs uppercase text-gray-700">
                            <tr>
                                <th scope="col" className="px-6 py-3">Title</th>
                                <th scope="col" className="px-6 py-3">Slug</th>
                                <th scope="col" className="px-6 py-3">Created At</th>
                                <th scope="col" className="px-6 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pages.map((page) => (
                                <tr key={page.id} className="border-b bg-white hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-900">{page.title}</td>
                                    <td className="px-6 py-4">/{page.slug}</td>
                                    <td className="px-6 py-4">{new Date(page.createdAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 text-right space-x-3">
                                        <Link
                                            href={`/app/dashboard/editor/${page.id}`}
                                            className="font-medium text-indigo-600 hover:text-indigo-800"
                                        >
                                            Edit Visuals
                                        </Link>
                                        <button
                                            onClick={() => deletePage(page.id)}
                                            className="font-medium text-red-600 hover:text-red-800"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-xl">
                        <h3 className="text-lg font-bold mb-4">Create New Page</h3>
                        <form onSubmit={handleCreate} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Page Title</label>
                                <input
                                    type="text"
                                    required
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full border-gray-300 rounded-md shadow-sm border p-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="e.g. About Us"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">URL Slug</label>
                                <input
                                    type="text"
                                    required
                                    value={slug}
                                    onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                                    className="w-full border-gray-300 rounded-md shadow-sm border p-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="e.g. about"
                                />
                            </div>
                            {error && <p className="text-sm text-red-500">{error}</p>}
                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-sm text-white bg-indigo-600 hover:bg-indigo-700 rounded-md font-medium"
                                >
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
