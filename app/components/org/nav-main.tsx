"use client"

import {ChevronRight, type LucideIcon, MoreHorizontal} from "lucide-react"

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "~/components/ui/collapsible"
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "~/components/ui/sidebar"
import {Link} from "react-router";

export function NavMain({title, more, items,}: {
    title: string
    more?: boolean
    items: {
        title: string
        url?: string
        icon?: LucideIcon
        isActive?: boolean
        items?: {
            title: string
            url: string
            icon?: LucideIcon
        }[]
    }[]
}) {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>{title}</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => {
                    const hasChildren = item.items && item.items.length > 0

                    if (hasChildren) {
                        return (
                            <Collapsible
                                key={item.title}
                                asChild
                                defaultOpen={item.isActive}
                                className="group/collapsible"
                            >
                                <SidebarMenuItem>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton tooltip={item.title}>
                                            {item.icon && <item.icon/>}
                                            <span>{item.title}</span>
                                            <ChevronRight
                                                className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"/>
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            {item.items?.map((subItem) => (
                                                <SidebarMenuSubItem key={subItem.title}>
                                                    <SidebarMenuSubButton asChild>
                                                        <Link to={subItem.url} key={subItem.title}>
                                                            {subItem.icon && <subItem.icon/>}
                                                            <span>{subItem.title}</span>
                                                        </Link>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                            ))}
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </SidebarMenuItem>
                            </Collapsible>
                        )
                    }

                    return (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton tooltip={item.title} asChild>
                                <a href={item.url!} className="flex items-center gap-2 w-full">
                                    {item.icon && <item.icon/>}
                                    <span>{item.title}</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    )
                })}
                {more && (
                    <SidebarMenuItem>
                        <SidebarMenuButton className="text-sidebar-foreground/70">
                            <MoreHorizontal className="text-sidebar-foreground/70" />
                            <span>More</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                )}
            </SidebarMenu>
        </SidebarGroup>
    )
}
