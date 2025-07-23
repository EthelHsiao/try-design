"use client"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "~/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Plus } from "lucide-react"
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableCell,
    TableHead,
} from "~/components/ui/table"
import { Popover, PopoverTrigger, PopoverContent } from "~/components/ui/popover"
import { Command, CommandItem, CommandInput, CommandList } from "~/components/ui/command"
import { ScrollArea } from "~/components/ui/scroll-area"
import { Dialog, DialogContent, DialogTitle } from "~/components/ui/dialog"
import { Label } from "~/components/ui/label"
import { useState } from "react"

const availableGroups = ["Marketing", "Engineering", "Design", "Sales", "Support"]

type Member = {
    id: string
    name: string
    email: string
    avatar?: string
    groups: string[]
}

export function MemberTable() {
    const [members, setMembers] = useState<Member[]>([
        {
            id: "1",
            name: "Yukina Mochizuki",
            email: "yukina@example.com",
            avatar: "https://i.pravatar.cc/150?u=yukina",
            groups: ["Engineering", "Design"],
        },
        {
            id: "2",
            name: "Kaede Takagaki",
            email: "kaede@example.com",
            avatar: "https://i.pravatar.cc/150?u=kaede",
            groups: ["Marketing"],
        },
        {
            id: "3",
            name: "Mika Jougasaki",
            email: "mika@example.com",
            avatar: "https://i.pravatar.cc/150?u=mika",
            groups: ["Sales", "Support"],
        },
    ])

    const [form, setForm] = useState({ name: "", email: "", groups: [] as string[] })
    const [openDialog, setOpenDialog] = useState(false)
    const [editMode, setEditMode] = useState<null | string>(null)

    const openCreateDialog = () => {
        setEditMode(null)
        setForm({ name: "", email: "", groups: [] })
        setOpenDialog(true)
    }

    const openEditDialog = (member: Member) => {
        setEditMode(member.id)
        setForm({ name: member.name, email: member.email, groups: member.groups })
        setOpenDialog(true)
    }

    const toggleGroup = (memberId: string, group: string) => {
        setMembers((prev) =>
            prev.map((m) =>
                m.id === memberId
                    ? {
                        ...m,
                        groups: m.groups.includes(group)
                            ? m.groups.filter((g) => g !== group)
                            : [...m.groups, group],
                    }
                    : m
            )
        )
    }

    const saveMember = () => {
        if (editMode) {
            setMembers((prev) =>
                prev.map((m) =>
                    m.id === editMode
                        ? { ...m, name: form.name, email: form.email, groups: form.groups }
                        : m
                )
            )
        } else {
            setMembers((prev) => [
                ...prev,
                {
                    id: crypto.randomUUID(),
                    name: form.name,
                    email: form.email,
                    groups: form.groups,
                },
            ])
        }
        setForm({ name: "", email: "", groups: [] })
        setEditMode(null)
        setOpenDialog(false)
    }

    return (
        <Card>
            <CardHeader className="flex justify-between items-center">
                <CardTitle>Organization Members</CardTitle>
                <Button size="sm" onClick={openCreateDialog}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Member
                </Button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Units</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {members.map((member) => (
                            <TableRow
                                key={member.id}
                                className="cursor-pointer hover:bg-muted"
                                onClick={() => openEditDialog(member)}
                            >
                                <TableCell className="flex items-center gap-3">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={member.avatar} />
                                        <AvatarFallback>{member.name[0]}</AvatarFallback>
                                    </Avatar>
                                    {member.name}
                                </TableCell>
                                <TableCell>{member.email}</TableCell>
                                <TableCell>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant="outline" size="sm" className="min-w-[100px]">
                                                {member.groups.length > 0 ? member.groups.join(", ") : "Set Groups"}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-48 p-0">
                                            <Command>
                                                <CommandInput placeholder="Search groups..." />
                                                <CommandList>
                                                    {availableGroups.map((group) => (
                                                        <CommandItem
                                                            key={group}
                                                            onSelect={() => toggleGroup(member.id, group)}
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                checked={member.groups.includes(group)}
                                                                readOnly
                                                                className="mr-2"
                                                            />
                                                            {group}
                                                        </CommandItem>
                                                    ))}
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="max-w-sm">
                    <DialogTitle>{editMode ? "Edit Member" : "Add Member"}</DialogTitle>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label>Email</Label>
                            <Input
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Units</Label>
                            <ScrollArea className="border rounded-md p-2 ">
                                {availableGroups.map((group) => (
                                    <div key={group} className="flex items-center gap-2 py-1">
                                        <input
                                            type="checkbox"
                                            checked={form.groups.includes(group)}
                                            onChange={() =>
                                                setForm((prev) => ({
                                                    ...prev,
                                                    groups: prev.groups.includes(group)
                                                        ? prev.groups.filter((g) => g !== group)
                                                        : [...prev.groups, group],
                                                }))
                                            }
                                        />
                                        {group}
                                    </div>
                                ))}
                            </ScrollArea>
                        </div>
                        <Button
                            onClick={saveMember}
                            disabled={!form.name || !form.email}
                            className="w-full"
                        >
                            Save
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </Card>
    )
}
