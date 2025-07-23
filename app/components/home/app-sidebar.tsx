import * as React from "react"
import {
    AudioWaveform,
    Command,
    Inbox,
    History, Telescope, Volleyball, House,
} from "lucide-react"
import { cn } from "~/lib/utils"

import {NavMain} from "~/components/home/nav-main"
import {NavExplore} from "~/components/home/nav-explore"
import {NavUser} from "~/components/home/nav-user"
import {TeamSwitcher} from "~/components/home/team-switcher"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter, SidebarGroup, SidebarGroupContent,
    SidebarHeader, SidebarInput,
    SidebarRail,
} from "~/components/ui/sidebar"
import {Label} from "~/components/ui/label";
import {Switch} from "~/components/ui/switch";

const data = {
    user: {
        name: "user",
        email: "username@example.com",
        avatar: "https://i.pravatar.cc/150?u=yukina",
    },
    orgs: [
        {
            name: "Home",
            logo: House,
            plan: "",
            path: "/",
        },
        {
            name: "NYCU SDC",
            logo: AudioWaveform,
            plan: "School Club",
            path: "/org-home",
        },
        {
            name: "COSCUP 2024",
            logo: Command,
            plan: "Conference",
            path: "/",
        },
    ],
    navMain: [
        {
            title: "Inbox",
            url: "#",
            icon: Inbox,
            isActive: true,
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
        }
    ],
    projects: [
        {
            name: "Organization",
            url: "#",
            icon: Telescope,
        },
        {
            name: "Events",
            url: "#",
            icon: Volleyball,
        }
    ],
    requests: [
        {
            name: "HITCON 工人聯絡組",
            id: "1",
            subject: "HITCON CMT 2024 工人行前通知",
            date: "09:34 AM",
            teaser:
                "各位工人好，以下是活動當天的住宿、接駁、報到與用餐等相關資訊，活動日期為 8/22-8/24，請務必確認您的行前信內容。",
        },
        {
            name: "SDC 行政組",
            id: "2",
            subject: "請填寫 SDC 志工制服尺寸與飲食需求",
            date: "Yesterday",
            teaser:
                "為了統一製作制服與安排餐點，請填寫您的衣服尺寸（如 M, L）以及飲食需求（葷／素／其他過敏資訊）。",
        },
        {
            name: "台大開源社",
            id: "3",
            subject: "工作坊協助意願調查",
            date: "2 days ago",
            teaser:
                "我們正在徵詢您是否願意擔任 4 月開源新手村的工作坊協助，請簡單填寫意願、時間可配合時段與技能背景。",
        },
        {
            name: "g0v 社群",
            id: "4",
            subject: "邀請填寫 2024 夏季松志工調查表",
            date: "2 days ago",
            teaser:
                "請協助填寫志工登記表，包含您可協助的日期、時段、想參與的任務類型與通訊方式，我們將據此分派組別。",
        },
        {
            name: "iThome 鐵人賽團隊",
            id: "5",
            subject: "【公告】全體參賽者線上說明會時間通知",
            date: "1 week ago",
            teaser:
                "本屆 iThome 鐵人賽的線上說明會將於下週三 19:00 舉行，屆時會解釋賽制、注意事項與平台使用方式，敬請準時參與。",
        },
        {
            name: "SITCON 活動組",
            id: "6",
            subject: "【行前通知】SITCON 志工訓練營集合地點與時間",
            date: "09:34 AM",
            teaser:
                "您好，感謝報名 SITCON 志工訓練營。請於明日上午 9:45 抵達中研院大門口集合，記得攜帶學生證以利報到。",
        },
        {
            name: "COSCUP 註冊組",
            id: "7",
            subject: "請填寫 COSCUP 交通補助與住宿申請",
            date: "1 week ago",
            teaser:
                "若您需申請交通補助或住宿安排，請填寫城市出發地、抵達方式、是否需要住宿等相關資訊。",
        },
        {
            name: "SITCON 程式挑戰賽",
            id: "8",
            subject: "請填寫比賽現場需求（電源／設備）",
            date: "1 week ago",
            teaser:
                "我們希望了解您是否有筆電使用需求、是否攜帶延長線或其他特殊設備，請協助填寫場地使用需求表單。",
        },
        {
            name: "g0v Summit 志工組",
            id: "9",
            subject: "請提供個人介紹供大會名牌使用",
            date: "1 week ago",
            teaser:
                "請輸入您希望印在名牌上的名字（暱稱或真名）與一句簡介（限 30 字內），此資料將用於會場識別。",
        },
        {
            name: "FOSSASIA 小組",
            id: "10",
            subject: "請完成報名資訊補充（講者資料）",
            date: "1 week ago",
            teaser:
                "您報名為講者的講題尚缺講者簡介與照片，請盡快補齊相關欄位，以便進入審稿與排程流程。",
        },
        {
            name: "北科大程設營",
            id: "11",
            subject: "【行前通知】程設營報到流程與分組名單",
            date: "1 week ago",
            teaser:
                "請於週五 13:00 至北科大中正樓前報到，並參閱您的分組名單與分組助教，請提前加入分組 Line 群組。",
        },
    ]
}

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
    onSelectId: (id: string) => void
    selectedId: string | null
}

export function AppSidebar({ onSelectId, selectedId, ...props }: AppSidebarProps) {
    const [activeItem, setActiveItem] = React.useState(data.navMain[0])
    const [mails, setMails] = React.useState(data.requests)

    return (
        <Sidebar
            collapsible="icon"
            className="overflow-hidden *:data-[sidebar=sidebar]:flex-row"
            {...props}
        >
            <Sidebar
                collapsible="none"
                className="w-64 border-r"
            >
                <SidebarHeader>
                    <TeamSwitcher org={data.orgs}/>
                </SidebarHeader>
                <SidebarContent>
                    <NavMain items={data.navMain}/>
                    <NavExplore projects={data.projects}/>
                </SidebarContent>
                <SidebarFooter>
                    <NavUser user={data.user}/>
                </SidebarFooter>
                <SidebarRail/>
            </Sidebar>

            <Sidebar collapsible="none" className="hidden flex-1 md:flex">
                <SidebarHeader className="gap-3.5 border-b p-4">
                    <div className="flex w-full items-center justify-between">
                        <div className="text-foreground text-base font-medium">
                            {activeItem?.title}
                        </div>
                        <Label className="flex items-center gap-2 text-sm">
                            <span>Unreads</span>
                            <Switch className="shadow-none"/>
                        </Label>
                    </div>
                    <SidebarInput placeholder="Type to search..."/>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup className="px-0">
                        <SidebarGroupContent>
                            {mails.map((mail) => (
                                <div
                                    key={mail.id}
                                    onClick={() => onSelectId(mail.id)}
                                    className={cn(
                                        "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex flex-col items-start gap-2 border-b p-4 text-sm leading-tight whitespace-nowrap last:border-b-0 cursor-pointer",
                                        selectedId === mail.id && "bg-sidebar-accent text-sidebar-accent-foreground"
                                    )}
                                >
                                    <div className="flex w-full items-center gap-2">
                                        <span>{mail.name}</span>
                                        <span className="ml-auto text-xs">{mail.date}</span>
                                    </div>
                                    <span className="font-medium">{mail.subject}</span>
                                    <span className="line-clamp-2 w-[260px] text-xs whitespace-break-spaces">
                                      {mail.teaser}
                                    </span>
                                </div>
                            ))}

                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>
        </Sidebar>
    )
}
