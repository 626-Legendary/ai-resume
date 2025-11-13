import React from 'react'
import { AppSidebar } from "../components/dashboard/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Routes, Route } from "react-router-dom";
import DashboardHome from '@/components/dashboard/DashboardHome'
import DashboardCreate from '@/components/dashboard/DashboardCreate'
import DashboardEnhance from '@/components/dashboard/DashboardEnhance'
const Dashboard = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>

        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  FairStart <span
                    className="font-bold"
                    
                  >
                    Beta
                  </span>
                </BreadcrumbItem>


              </BreadcrumbList>
            </Breadcrumb>


          </div>

        </header>
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="create" element={<DashboardCreate />} />
          <Route path="enhance" element={<DashboardEnhance />} />
        </Routes>
        {/* <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
          </div>
          <div className="bg-muted/50 min-h-screen flex-1 rounded-xl md:min-h-min" />
        </div> */}
      </SidebarInset>
    </SidebarProvider>
  )
}

export default Dashboard