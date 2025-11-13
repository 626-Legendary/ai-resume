"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  Sparkles,
  Atom,
} from "lucide-react"

import { NavMain } from "@/components/ui/nav-main"
import { NavProjects } from "@/components/ui/nav-projects"
import { NavUser } from "@/components/ui/nav-user"
import { TeamSwitcher } from "@/components/ui/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "Zexiang",
    email: "zhangzexiang626@gmail.com",
    avatar: "@/src/assets/team/zexiang.jpg",
  },
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
        {
          title: "Create Resume",
          url: "/dashboard/create",
        },
        {
          title: "Enhance Resume",
          url: "/dashboard/enhance",
        },

      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [

        {
          title: "Get Started",
          url: "/dashboard",
        },

        {
          title: "Changelog",
          url: "#",
        },
      ],
    },

  ],

}

export function AppSidebar({
  ...props
}) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />

      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
