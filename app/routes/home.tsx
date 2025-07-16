import { AppSidebar } from "~/components/home/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "~/components/ui/breadcrumb"
import { Separator } from "~/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "~/components/ui/sidebar"
import VolunteerFormMockup from "~/components/home/inbox-form";
import PreEventLetter from "~/components/home/inbox-letter";
import {type JSX, useState} from "react";
import InboxEmpty from "~/components/home/inbox-empty";

export default function Page() {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const components: Record<string, JSX.Element> = {
    "1": <PreEventLetter />,
    "2": <VolunteerFormMockup />,
  }

  return (
      <SidebarProvider style={
        {
          "--sidebar-width": "600px",
        } as React.CSSProperties
      }>
        <AppSidebar onSelectId={setSelectedId} selectedId={selectedId} />

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
                  <BreadcrumbItem>
                    <BreadcrumbPage>Inbox</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4">

            {selectedId
                ? components[selectedId] ?? <InboxEmpty />
                : <InboxEmpty />
            }          </div>
        </SidebarInset>
      </SidebarProvider>
  )
}
