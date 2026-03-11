import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Globe, Shield, Database } from "lucide-react";

export default async function SettingsPage() {
    const session = await auth();

    if (!session?.user) {
        redirect("/login");
    }

    const user = session.user as any;

    return (
        <div className="w-full">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-6">Workspace Settings</h1>

            <div className="grid gap-6 md:grid-cols-2">
                {/* General Settings Card */}
                <div className="bg-white rounded-xl shadow-sm border p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                            <Shield size={20} />
                        </div>
                        <h2 className="text-lg font-semibold text-gray-800">General Information</h2>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Workspace Name</label>
                            <input
                                type="text"
                                disabled
                                defaultValue={user.tenantName}
                                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-500 cursor-not-allowed sm:text-sm"
                            />
                            <p className="mt-1 text-xs text-gray-500">Workspace names are immutable after creation.</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Account Email</label>
                            <input
                                type="email"
                                disabled
                                defaultValue={user.email || 'Email not provided'}
                                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-500 cursor-not-allowed sm:text-sm"
                            />
                        </div>
                    </div>
                </div>

                {/* Domain Management Card */}
                <div className="bg-white rounded-xl shadow-sm border p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                            <Globe size={20} />
                        </div>
                        <h2 className="text-lg font-semibold text-gray-800">Custom Domain</h2>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Connect your domain</label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="e.g. www.mywebsite.com"
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                                <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition font-medium text-sm">
                                    Add
                                </button>
                            </div>
                            <p className="mt-2 text-xs text-gray-500 leading-relaxed">
                                Enter the domain you want to connect. Then, map your domain's A Record or CNAME to our IP address. SSL certificates via Let's Encrypt are generated automatically upon verification.
                            </p>
                        </div>

                        <div className="mt-4 p-4 bg-gray-50 border border-dashed border-gray-300 rounded-lg flex items-center justify-between">
                            <div>
                                <h4 className="text-sm font-semibold text-gray-700">Subdomain Access</h4>
                                <p className="text-xs text-gray-500">{user.tenantName}.yoursaas.com</p>
                            </div>
                            <span className="px-2.5 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">Active</span>
                        </div>
                    </div>
                </div>

                {/* Advanced Danger Zone */}
                <div className="md:col-span-2 bg-white rounded-xl shadow-sm border border-red-100 p-6 mt-4">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-red-50 text-red-600 rounded-lg">
                            <Database size={20} />
                        </div>
                        <h2 className="text-lg font-semibold text-red-600">Danger Zone</h2>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="text-sm font-semibold text-gray-900">Delete Workspace</h4>
                            <p className="text-sm text-gray-500">Permanently delete your entire Workspace, all pages, and data.</p>
                        </div>
                        <button className="px-4 py-2 border border-red-200 text-red-600 hover:bg-red-50 rounded-md text-sm font-medium transition cursor-not-allowed disabled:opacity-50" disabled>
                            Request Deletion
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
