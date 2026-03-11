import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Settings, CreditCard, LogOut, Globe } from "lucide-react";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    if (!session?.user) {
        redirect("/login");
    }

    const tenantName = (session.user as any).tenantName;

    return (
        <div className="flex min-h-screen flex-col bg-gray-50">
            <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-white px-6 shadow-sm">
                <Link href="/app/dashboard" className="flex items-center gap-2 font-bold text-lg">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-indigo-600 font-bold text-white shadow-sm">
                        {tenantName?.[0]?.toUpperCase() || "B"}
                    </div>
                    <span className="hidden md:block tracking-tight text-gray-900">Builder SaaS</span>
                </Link>
                <div className="ml-auto flex items-center gap-4">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full">
                        <Globe size={14} className="text-gray-500" />
                        <span className="text-xs font-semibold text-gray-700">
                            {tenantName}
                        </span>
                    </div>
                    <Link href="/api/auth/signout" className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-red-600 transition-colors px-3 py-1.5 rounded-md hover:bg-red-50">
                        <LogOut size={16} />
                        <span className="hidden sm:inline">Logout</span>
                    </Link>
                </div>
            </header>
            <div className="flex flex-1">
                <aside className="hidden w-64 flex-col border-r bg-white md:flex">
                    <nav className="grid gap-1 p-4 text-sm font-medium">
                        <Link
                            href="/app/dashboard"
                            className="flex items-center gap-3 rounded-md px-3 py-2.5 text-gray-600 transition-all hover:bg-gray-100 hover:text-gray-900"
                        >
                            <LayoutDashboard size={18} />
                            Pages
                        </Link>
                        <Link
                            href="/app/dashboard/settings"
                            className="flex items-center gap-3 rounded-md px-3 py-2.5 text-gray-600 transition-all hover:bg-gray-100 hover:text-gray-900"
                        >
                            <Settings size={18} />
                            Settings
                        </Link>
                        <Link
                            href="/app/dashboard/billing"
                            className="flex items-center gap-3 rounded-md px-3 py-2.5 text-gray-600 transition-all hover:bg-gray-100 hover:text-gray-900"
                        >
                            <CreditCard size={18} />
                            Billing
                        </Link>
                    </nav>
                </aside>
                <main className="flex-1 p-6 lg:p-10 max-w-7xl mx-auto w-full">
                    {children}
                </main>
            </div>
        </div>
    );
}
