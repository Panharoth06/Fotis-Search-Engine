import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { AreaChartComponent } from "@/components/charts/AreaChartComponent"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="bg-white w-full max-w-full px-4 md:px-8">
        <SidebarTrigger />
        <AreaChartComponent/>
        {children}
      </main>
    </SidebarProvider>
  )
}