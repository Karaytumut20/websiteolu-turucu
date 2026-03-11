import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-white text-gray-900">
      <main className="flex flex-col items-center justify-center flex-1 px-4 text-center sm:px-6 lg:px-8">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl mb-6">
          <span className="block text-indigo-600">Zero-Code SaaS</span>
          <span className="block">Website Builder</span>
        </h1>
        <p className="max-w-xl mt-5 text-xl text-gray-500 sm:text-2xl mb-10">
          Build stunning websites in minutes without writing a single line of code. Dedicated environments for every project.
        </p>

        <div className="flex gap-4">
          <Link
            href="/register"
            className="rounded-md bg-indigo-600 px-8 py-3 text-lg font-medium text-white hover:bg-indigo-700 shadow-lg hover:shadow-xl transition-all"
          >
            Get Started for Free
          </Link>
          <Link
            href="/login"
            className="rounded-md bg-white border border-gray-300 px-8 py-3 text-lg font-medium text-gray-700 hover:bg-gray-50 shadow-sm transition-all"
          >
            Sign In
          </Link>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-left">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" /></svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Visual Editor</h3>
            <p className="text-gray-600">Drag and drop components to create your dream website instantly.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-left">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" /></svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Multi-Tenant</h3>
            <p className="text-gray-600">Strictly isolated environments and custom domains for every client.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-left">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <h3 className="text-xl font-bold mb-2">High Performance</h3>
            <p className="text-gray-600">Static generation and smart caching for lightning-fast page loads.</p>
          </div>
        </div>
      </main>

      <footer className="w-full text-center border-t border-gray-200 py-6 text-gray-500 text-sm mt-auto">
        &copy; {new Date().getFullYear()} Zero-Code SaaS Builder. All rights reserved.
      </footer>
    </div>
  );
}
