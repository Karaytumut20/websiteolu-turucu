import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Check, CreditCard, Sparkles } from "lucide-react";

export default async function BillingPage() {
    const session = await auth();

    if (!session?.user) {
        redirect("/login");
    }

    return (
        <div className="w-full">
            <div className="mb-8">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-2">Subscription & Billing</h1>
                <p className="text-gray-500">Manage your current plan, payment methods, and invoices.</p>
            </div>

            {/* Current Plan Card */}
            <div className="bg-white rounded-xl shadow-sm border p-6 flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <h2 className="text-lg font-semibold text-gray-900">Free Plan</h2>
                        <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-100">Current</span>
                    </div>
                    <p className="text-sm text-gray-500">You are currently on the free builder tier. This includes 3 free pages.</p>
                </div>
                <div className="mt-4 md:mt-0">
                    <button disabled className="px-4 py-2 bg-gray-100 text-gray-400 font-medium rounded-md cursor-not-allowed">
                        Manage Payment Method
                    </button>
                </div>
            </div>

            {/* Upgrade Plans */}
            <h3 className="text-xl font-bold tracking-tight text-gray-900 mb-6 flex items-center gap-2">
                <Sparkles size={24} className="text-indigo-500" />
                Upgrade Your Workspace
            </h3>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
                {/* Pro Tier */}
                <div className="bg-white rounded-2xl shadow-md border-2 border-indigo-500 p-8 flex flex-col relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">POPULAR</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Pro Builder</h3>
                    <div className="mb-6">
                        <span className="text-4xl font-extrabold text-gray-900">$29</span>
                        <span className="text-gray-500 font-medium">/month</span>
                    </div>
                    <ul className="space-y-4 mb-8 flex-1">
                        <li className="flex items-center gap-2 text-gray-600">
                            <Check size={18} className="text-indigo-500" />
                            <span>Unlimited Pages & Bandwidth</span>
                        </li>
                        <li className="flex items-center gap-2 text-gray-600">
                            <Check size={18} className="text-indigo-500" />
                            <span>Custom Domain (No Watermark)</span>
                        </li>
                        <li className="flex items-center gap-2 text-gray-600">
                            <Check size={18} className="text-indigo-500" />
                            <span>Priority Email Support</span>
                        </li>
                    </ul>
                    <button className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-sm transition-all focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        Upgrade to Pro
                    </button>
                </div>

                {/* Agency Tier */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 flex flex-col">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Agency</h3>
                    <div className="mb-6">
                        <span className="text-4xl font-extrabold text-gray-900">$99</span>
                        <span className="text-gray-500 font-medium">/month</span>
                    </div>
                    <ul className="space-y-4 mb-8 flex-1">
                        <li className="flex items-center gap-2 text-gray-600">
                            <Check size={18} className="text-green-500" />
                            <span>Everything in Pro</span>
                        </li>
                        <li className="flex items-center gap-2 text-gray-600">
                            <Check size={18} className="text-green-500" />
                            <span>Unlimited Workspaces (Tenants)</span>
                        </li>
                        <li className="flex items-center gap-2 text-gray-600">
                            <Check size={18} className="text-green-500" />
                            <span>White-labeled Admin Panel</span>
                        </li>
                    </ul>
                    <button className="w-full py-3 bg-gray-50 border border-gray-300 hover:bg-gray-100 text-gray-900 font-semibold rounded-lg transition-all focus:ring-2 focus:ring-gray-200 focus:ring-offset-2">
                        Upgrade to Agency
                    </button>
                </div>
            </div>

            <div className="mt-12 text-center text-sm text-gray-500 flex items-center justify-center gap-2">
                <CreditCard size={16} />
                Payments processed securely by Stripe. Cancel anytime.
            </div>
        </div>
    );
}
