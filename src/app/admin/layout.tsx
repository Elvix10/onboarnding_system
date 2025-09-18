"use client";

import Sidebar from "@/components/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen bg-background text-foreground">
      <Sidebar />
      <div className="flex-1">
        {children}
      </div>
    </main>
  );
}