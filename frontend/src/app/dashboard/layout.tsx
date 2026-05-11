"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAuthenticated, isInitialized } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isInitialized) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
          <p className="text-muted-foreground font-medium">Loading application...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    redirect("/login");
  }

  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 lg:px-6">
          <SidebarTrigger className="-ml-1" />
          <div className="w-full flex justify-between items-center">
            <h1 className="text-lg font-semibold tracking-tight hidden sm:block">RUTAF SUPER APP</h1>
            <div className="flex items-center gap-4">
               {/* Header Actions like Notifications will go here */}
               <div className="text-sm font-medium text-muted-foreground bg-muted px-3 py-1 rounded-full">
                 {user?.institution?.name || "Global Access"}
               </div>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-auto bg-muted/20">
          <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
