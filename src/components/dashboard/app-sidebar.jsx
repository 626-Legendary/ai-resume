

import React, { useMemo } from "react";
import { Bot, BookOpen, Sparkles, Atom } from "lucide-react";

import { NavMain } from "@/components/ui/nav-main";
import { NavProjects } from "@/components/ui/nav-projects";
import { NavUser } from "@/components/ui/nav-user";
import { TeamSwitcher } from "@/components/ui/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

import { useAuth } from "../../context/AuthContext"; // 按你的路径调

// 静态导航数据（跟用户无关）
const navConfig = {
  teams: [
    {
      name: "Core AI",
      logo: Sparkles,
      plan: "Basic",
    },
    {
      name: "HiveMind AI",
      logo: Atom,
      plan: "Pro",
    },
  ],
  navMain: [
    {
      title: "AI Resume",
      url: "#",
      icon: Bot,
      items: [
        { title: "Create Resume", url: "/dashboard/create" },
        { title: "Enhance Resume", url: "/dashboard/enhance" },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        { title: "Get Started", url: "/dashboard" },
        { title: "Changelog", url: "#" },
      ],
    },
  ],
};

export function AppSidebar({ ...props }) {
  const { user, loading, isAuthenticated } = useAuth();


  const sidebarUser = useMemo(() => {
    if (loading) {
      return {
        name: "Authorized User",
        email: "Loading...",
        avatar: undefined,
      };
    }

    if (!isAuthenticated || !user) {
      return {
        name: "Unauthenticated User",
        email: "guest@example.com",
        avatar: undefined,
      };
    }

    return {
      name: "Authorized User", // 固定
      email: user.email,   
      avatar: undefined,
    };
  }, [loading, isAuthenticated, user]);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={navConfig.teams} />
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={navConfig.navMain} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={sidebarUser} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
