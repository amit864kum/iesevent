'use client';

import { useState } from 'react';
import { Sidebar } from './Sidebar';
import AdminTopbar from './AdminTopbar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-bg-primary text-text-primary flex">

            {/* Sidebar */}
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            {/* Main Area */}
            <div className="flex-1 flex flex-col">
                <AdminTopbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

                <main className="flex-1 px-4 sm:px-6 lg:px-8 xl:px-10 py-8 max-w-[1800px] mx-auto w-full">
                    {children}
                </main>
            </div>
        </div>
    );
}
