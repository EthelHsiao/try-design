import * as React from "react"
import {
    AudioWaveform,
    Command, Frame,
    House, Inbox,
    LayoutDashboard,
    Settings,
    Users,
} from "lucide-react"

import {NavMain} from "~/components/org/nav-main"
import {NavUser} from "~/components/org/nav-user"
import {TeamSwitcher} from "~/components/org/team-switcher"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "~/components/ui/sidebar"

import {useSidebarView} from "~/components/org/sidebar-context";

const data = {
    user: {
        name: "user",
        email: "username@example.com",
        avatar: "https://i.pravatar.cc/150?u=yukina",
    },
    orgs: [
        {
            name: "NYCU SDC",
            logo: AudioWaveform,
            plan: "School Club",
            path: "/org-home",
        },
        {
            name: "Home",
            logo: House,
            plan: "",
            path: "/",
        },
        {
            name: "COSCUP 2024",
            logo: Command,
            plan: "Conference",
            path: "/org-home",
        },
    ],
    navMain: [
        {
            title: "Inbox",
            url: "#",
            icon: Inbox,
            isActive: false,
            items: [
                {
                    title: "All",
                    url: "#",
                },
                {
                    title: "Announcement",
                    url: "#",
                },
                {
                    title: "Need your help",
                    url: "#",
                },
            ],
        },
        {
            title: "Dashboard",
            url: "#",
            icon: LayoutDashboard,
            isActive: false,
            items: []
        },
        {
            title: "Members",
            url: "/org-home/members",
            icon: Users,
            isActive: false,
            items: []
        },
        {
            title: "Settings",
            url: "#",
            icon: Settings,
            isActive: false,
            items: [
                {
                    title: "Introduction",
                    url: "#",
                },
                {
                    title: "Visibility",
                    url: "#",
                }
            ]
        },
    ],
    navUnit: [
        {
            title: "Administration DEPT.",
            url: "#",
            icon: Frame,
            isActive: false,
            items: [
                {
                    title: "Dashboard",
                    url: "#",
                },
                {
                    title: "Settings",
                    url: "#",
                },
                {
                    title: "Publish",
                    url: "/org-home/publish",
                }
            ],
        },
        {
            title: "Finance DEPT.",
            url: "#",
            icon: Frame,
            isActive: false,
            items: [
                {
                    title: "Dashboard",
                    url: "#",
                },
                {
                    title: "Settings",
                    url: "#",
                },
                {
                    title: "Publish",
                    url: "/org-home/publish",
                }
            ],
        },
    ],
}

export function AppSidebar({...props}: React.ComponentProps<typeof Sidebar>) {
    const {stack} = useSidebarView()

    const current = stack[stack.length - 1]

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TeamSwitcher teams={data.orgs}/>
            </SidebarHeader>
            <SidebarContent>
                <NavMain title="Organization" items={data.navMain}/>
                <NavMain title="Units" more={false} items={data.navUnit}/>
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user}/>
            </SidebarFooter>
            <SidebarRail/>
        </Sidebar>
    )
}
