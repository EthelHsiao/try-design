"use client"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "~/components/ui/card"
import {Button} from "~/components/ui/button"
import {Plus, Edit2, Trash2, ArrowUp, GripVertical} from "lucide-react"
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableCell,
    TableHead,
} from "~/components/ui/table"
import {Dialog, DialogContent, DialogTitle} from "~/components/ui/dialog"
import {Input} from "~/components/ui/input"
import {Label} from "~/components/ui/label"
import {cn} from "~/lib/utils"
import {useState} from "react"

type Status = "draft" | "published"

type FormMeta = {
    id: string
    title: string
    status: Status
    updatedAt: string
}

type QuestionType = "short_text" | "long_text" | "single_choice" | "multiple_choice" | "date"

type Question = {
    id: string
    type: QuestionType
    title: string
    options?: string[]
}

const statusLabel: Record<Status, string> = {
    draft: "Draft",
    published: "Published",
}

const statusColor: Record<Status, string> = {
    draft: "bg-muted text-muted-foreground",
    published: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
}

const questionTypeLabel: Record<QuestionType, string> = {
    short_text: "Short Text",
    long_text: "Long Text",
    single_choice: "Single Choice",
    multiple_choice: "Multiple Choice",
    date: "Date",
}

const questionTypes: { value: QuestionType, label: string }[] = [
    { value: "short_text", label: "Short Text" },
    { value: "long_text", label: "Long Text" },
    { value: "single_choice", label: "Single Choice" },
    { value: "multiple_choice", label: "Multiple Choice" },
    { value: "date", label: "Date" },
]

export default function PublishFormView() {
    const [forms, setForms] = useState<FormMeta[]>([
        {id: "1", title: "請填寫 SDC 志工制服尺寸與飲食需求", status: "published", updatedAt: "2025-07-22"},
        {id: "2", title: "工作坊協助意願調查", status: "draft", updatedAt: "2025-07-20"},
    ])
    const [openEditor, setOpenEditor] = useState<null | string>(null)
    const [showDialog, setShowDialog] = useState(false)
    const [newFormTitle, setNewFormTitle] = useState("")

    const [editForm, setEditForm] = useState({
        id: "",
        title: "",
        description: "",
        questions: [] as Question[],
    })

    const handleEdit = (form: FormMeta) => {
        setEditForm({
            id: form.id,
            title: form.title,
            description: "為了統一製作制服與安排餐點，請填寫以下資訊。若有特殊需求請於下方備註欄說明。",
            questions: [
                {
                    id: "q1",
                    type: "short_text",
                    title: "姓名",
                },
                {
                    id: "q2",
                    type: "single_choice",
                    title: "制服尺寸",
                    options: ["XS", "S", "M", "L", "XL", "2XL", "其他"],
                },
                {
                    id: "q3",
                    type: "single_choice",
                    title: "飲食需求",
                    options: ["葷食", "素食", "特殊過敏需求"],
                },
                {
                    id: "q4",
                    type: "long_text",
                    title: "備註（選填）",
                },
            ],
        })
        setOpenEditor(form.id)
    }


    const handleDelete = (id: string) => {
        setForms((prev) => prev.filter((f) => f.id !== id))
    }

    const handleAdd = () => {
        if (!newFormTitle.trim()) return
        const id = crypto.randomUUID()
        setForms((prev) => [
            ...prev,
            {id, title: newFormTitle, status: "draft", updatedAt: new Date().toISOString().slice(0, 10)}
        ])
        setNewFormTitle("")
        setShowDialog(false)
    }

    return (
        <div className="flex flex-col gap-8">
            {!openEditor && (
                <Card>
                    <CardHeader className="flex flex-row justify-between items-center">
                        <div>
                            <CardTitle>Form Management</CardTitle>
                        </div>
                        <Button size="sm" onClick={() => setShowDialog(true)}>
                            <Plus className="mr-2 h-4 w-4"/>
                            New Form
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Last Updated</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {forms.map((f) => (
                                    <TableRow key={f.id}>
                                        <TableCell className="font-medium">{f.title}</TableCell>
                                        <TableCell>
                                            <span className={cn("rounded-xl px-2 py-0.5 text-xs font-semibold", statusColor[f.status])}>
                                                {statusLabel[f.status]}
                                            </span>
                                        </TableCell>
                                        <TableCell>{f.updatedAt}</TableCell>
                                        <TableCell className="flex gap-2 justify-end">
                                            <Button variant="ghost" size="icon" onClick={() => handleEdit(f)}
                                                    title="Edit">
                                                <Edit2 className="w-4 h-4"/>
                                            </Button>
                                            <Button variant="ghost" size="icon" onClick={() => handleDelete(f.id)}
                                                    title="Delete">
                                                <Trash2 className="w-4 h-4"/>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            )}

            <Dialog open={showDialog} onOpenChange={setShowDialog}>
                <DialogContent className="max-w-sm">
                    <DialogTitle>New Form</DialogTitle>
                    <div className="space-y-4">
                        <Label>Form Name</Label>
                        <Input value={newFormTitle} onChange={e => setNewFormTitle(e.target.value)}/>
                        <Button className="w-full" onClick={handleAdd} disabled={!newFormTitle.trim()}>Create</Button>
                    </div>
                </DialogContent>
            </Dialog>

            {openEditor && (
                <FormBuilder
                    form={editForm}
                    onBack={() => setOpenEditor(null)}
                    onUpdate={setEditForm}
                />
            )}
        </div>
    )
}

function FormBuilder({
                         form,
                         onBack,
                         onUpdate,
                     }: {
    form: {
        id: string
        title: string
        description: string
        questions: Question[]
    }
    onBack: () => void
    onUpdate: (f: any) => void
}) {
    const [editingQuestion, setEditingQuestion] = useState<null | (Question & { index?: number })>(null)

    const isEditing = editingQuestion && editingQuestion.index !== undefined

    const handleDelete = (index: number) => {
        const arr = [...form.questions]
        arr.splice(index, 1)
        onUpdate({ ...form, questions: arr })
    }

    const handleEdit = (q: Question, idx: number) => {
        setEditingQuestion({ ...q, index: idx })
    }

    const handleAdd = () => {
        setEditingQuestion({
            id: crypto.randomUUID(),
            type: "short_text",
            title: "",
            options: [],
        })
    }

    const handleSave = () => {
        if (!editingQuestion) return
        let arr = [...form.questions]
        const q = { ...editingQuestion }
        delete (q as any).index

        if (isEditing) {
            arr[(editingQuestion as any).index!] = q
        } else {
            arr.push(q)
        }
        onUpdate({ ...form, questions: arr })
        setEditingQuestion(null)
    }

    return (
        <Card>
            <CardHeader className="flex flex-row items-center gap-4">
                <Button variant="ghost" size="icon" onClick={onBack}>
                    <ArrowUp className="rotate-270 w-5 h-5" /> {/* ← Back */}
                </Button>
                <div>
                    <span className="font-semibold text-xl">{form.title}</span>
                    <div className="text-muted-foreground">{form.description}</div>
                </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                    {form.questions.map((q, idx) => (
                        <div
                            key={q.id}
                            className={cn(
                                "group relative rounded-2xl border bg-card shadow-sm px-6 py-5 transition-all",
                                "hover:border-primary hover:ring-2 hover:ring-primary/20 flex items-center gap-3"
                            )}
                        >
                            <div>
                                <div className="flex items-center gap-2">
                                    <GripVertical className="w-4 h-4 opacity-40 cursor-pointer" />
                                    <span className="font-semibold">{q.title}</span>
                                    <span className="rounded bg-muted px-2 py-0.5 ml-2 text-xs text-muted-foreground">
                    {questionTypeLabel[q.type]}
                  </span>
                                </div>
                                {(q.type === "single_choice" || q.type === "multiple_choice") && (
                                    <div className="flex flex-wrap gap-2 mt-1">
                                        {(q.options ?? []).map((opt, i) => (
                                            <span key={i}
                                                  className="rounded-full border px-3 py-0.5 text-xs text-muted-foreground bg-muted">
                        {opt}
                      </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div
                                className="absolute right-4 top-5 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                                <Button variant="outline" size="icon"
                                        className="border-destructive/60"
                                        title="Delete"
                                        onClick={() => handleDelete(idx)}>
                                    <Trash2 className="w-4 h-4 text-destructive" />
                                </Button>
                                <Button variant="outline" size="icon" title="Edit"
                                        onClick={() => handleEdit(q, idx)}>
                                    <Edit2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center">
                    <Button onClick={handleAdd}>
                        <Plus className="mr-2 w-5 h-5" />
                        Add Question
                    </Button>
                </div>
            </CardContent>

            <Dialog open={!!editingQuestion} onOpenChange={(v) => !v && setEditingQuestion(null)}>
                <DialogContent>
                    <DialogTitle>{isEditing ? "Edit Question" : "Add Question"}</DialogTitle>
                    {editingQuestion && (
                        <form className="space-y-4"
                              onSubmit={e => { e.preventDefault(); handleSave() }}>
                            <div>
                                <Label>Type</Label>
                                <select
                                    className="w-full border rounded h-9 px-2 mt-1"
                                    value={editingQuestion.type}
                                    onChange={e => setEditingQuestion({ ...editingQuestion, type: e.target.value as QuestionType, options: [] })}
                                >
                                    {questionTypes.map(t => (
                                        <option key={t.value} value={t.value}>{t.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <Label>Title</Label>
                                <Input
                                    value={editingQuestion.title}
                                    onChange={e => setEditingQuestion({ ...editingQuestion, title: e.target.value })}
                                    required
                                />
                            </div>
                            {(editingQuestion.type === "single_choice" || editingQuestion.type === "multiple_choice") && (
                                <div>
                                    <Label>Options (comma separated)</Label>
                                    <Input
                                        value={(editingQuestion.options ?? []).join(", ")}
                                        onChange={e => setEditingQuestion({
                                            ...editingQuestion,
                                            options: e.target.value.split(",").map(s => s.trim()).filter(Boolean)
                                        })}
                                    />
                                </div>
                            )}
                            <div className="flex gap-2">
                                <Button type="submit" className="flex-1" disabled={!editingQuestion.title.trim()}>
                                    {isEditing ? "Save" : "Add"}
                                </Button>
                                <Button type="button" variant="secondary" onClick={() => setEditingQuestion(null)}>
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    )}
                </DialogContent>
            </Dialog>
        </Card>
    )
}
