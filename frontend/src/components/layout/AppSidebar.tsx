"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthStore } from "@/store/useAuthStore";
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  CalendarCheck, 
  CreditCard,
  LogOut,
  Settings,
  Bell
} from "lucide-react";

export function AppSidebar({ user }: { user: any }) {
  const pathname = usePathname();
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  };

  const getMenuItems = () => {
    const roles = user?.roles || [];
    
    const items = [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
        roles: ["Super Admin", "Admin", "Teacher", "Student", "Parent", "Musyrif", "Finance"],
      },
      {
        title: "Attendance",
        url: "/dashboard/attendance",
        icon: CalendarCheck,
        roles: ["Super Admin", "Admin", "Teacher", "Student", "Parent"],
      },
      {
        title: "Academics",
        url: "/dashboard/academics",
        icon: BookOpen,
        roles: ["Super Admin", "Admin", "Teacher", "Student", "Parent"],
      },
      {
        title: "Tahfiz",
        url: "/dashboard/tahfiz",
        icon: BookOpen,
        roles: ["Super Admin", "Admin", "Musyrif", "Student", "Parent"],
      },
      {
        title: "Payments",
        url: "/dashboard/payments",
        icon: CreditCard,
        roles: ["Super Admin", "Admin", "Finance", "Parent", "Student"],
      },
      {
        title: "Users Management",
        url: "/dashboard/users",
        icon: Users,
        roles: ["Super Admin", "Admin"],
      },
    ];

    return items.filter(item => 
      roles.some((role: string) => item.roles.includes(role)) || roles.includes("Super Admin")
    );
  };

  const menuItems = getMenuItems();

  return (
    <Sidebar variant="inset">
      <SidebarHeader className="h-16 flex items-center px-6 justify-center border-b">
        <div className="flex items-center gap-2 w-full font-bold text-xl tracking-tight text-primary">
          <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold">
            R
          </div>
          <span className="truncate">RUTAF APP</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Utama</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url || pathname.startsWith(item.url + '/')}>
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <div className="flex items-center gap-3 mb-4">
          <Avatar>
            <AvatarFallback className="bg-primary/10 text-primary font-bold">
              {user?.name?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-semibold truncate">{user?.name}</span>
            <span className="text-xs text-muted-foreground truncate">{user?.roles?.[0] || "User"}</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <SidebarMenuButton asChild variant="outline" size="sm" className="justify-center">
            <Link href="/dashboard/settings">
              <Settings className="h-4 w-4 mr-2" />
              <span>Settings</span>
            </Link>
          </SidebarMenuButton>
          <SidebarMenuButton 
            onClick={handleLogout}
            variant="outline" 
            size="sm" 
            className="justify-center text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <LogOut className="h-4 w-4 mr-2" />
            <span>Logout</span>
          </SidebarMenuButton>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
